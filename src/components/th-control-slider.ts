import {customElement, property, query, state} from "lit/decorators.js";
import {css, html, LitElement} from "lit";
import {classMap} from "lit/directives/class-map.js";
import {styleMap} from "lit/directives/style-map.js";
import {ifDefined} from "lit/directives/if-defined.js";


type SliderMode = "start" | "end" | "cursor";

const A11Y_KEY_CODES = new Set([
    "ArrowRight",
    "ArrowUp",
    "ArrowLeft",
    "ArrowDown",
    "Home",
    "End",
]);

@customElement("th-control-slider")
export class ThControlSlider extends LitElement {

    static override styles = css`
        /* ==================== */
        /* 1. HOST ELEMENT STYLES */
        /* ==================== */

        :host {
            display: block;
            --control-slider-color: var(--primary-color);
            --control-slider-background: var(--disabled-color);
            --control-slider-thickness: 40px;
            --control-slider-border-radius: 10px;
            --control-slider-background-opacity: 0.2;
            outline: none;
            transition: box-shadow 180ms ease-in-out;
            border-radius: var(--control-slider-border-radius);
            touch-action: none;
            height: var(--control-slider-thickness);
            width: 100%;
        }

        /* 如果是坚向风格时宽高设置 */

        :host([vertical]) {
            height: 100%;
            width: var(--control-slider-thickness);
        }

        /* ======================== */
        /* 2. CONTAINER & TRACK STYLES */
        /* ======================== */

        .container {
            position: relative;
            height: 100%;
            width: 100%;
        }

        .slider {
            position: relative;
            height: 100%;
            width: 100%;
            border-radius: var(--control-slider-border-radius);
            transition: box-shadow 180ms ease-in-out;
            transform: translateZ(0);
            outline: none;
            overflow: hidden;
            cursor: pointer;
        }

        .slider:focus-visible {
            box-shadow: 0 0 0 2px var(--control-slider-color);
        }

        .slider .slider-track-background {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            background: var(--control-slider-background);
            opacity: var(--control-slider-background-opacity);
        }

        /* Background slot for custom backgrounds */

        ::slotted([slot="background"]) {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
        }

        /* ==================== */
        /* 3. SLIDER BAR STYLES */
        /* ==================== */


        .slider .slider-track-bar {
            --border-radius: var(--control-slider-border-radius);
            --slider-size: 100%;
            height: 100%;
            width: 100%;
            position: absolute;
            background: var(--control-slider-color);
            transition: transform 180ms ease-in-out,
            background-color 180ms ease-in-out;

        }

        .slider .slider-track-bar {
            top: 0;
            left: 0;
            transform: translate3d(
                    calc((var(--value, 0) - 1) * var(--slider-size)),
                    0,
                    0
            );
            border-radius: 0 8px 8px 0;
        }


        :host([vertical]) .slider .slider-track-bar {
            bottom: 0;
            left: 0;
            transform: translate3d(
                    0,
                    calc((1 - var(--value, 0)) * var(--slider-size)),
                    0
            );
            border-radius: 8px 8px 0 0;
        }
    `;
    @property({type: Boolean, reflect: true})
    public disabled = false;
    @property()
    public mode?: SliderMode = "start";
    @property({type: Boolean, reflect: true})
    public vertical = false;
    @property({type: Boolean, attribute: "inverted"})
    public inverted = false;
    @property({type: Boolean, attribute: "show-handle"})
    public showHandle = true;
    @property({type: Number, reflect: true})
    public value: number = 50;
    @property({type: Number, reflect: true})
    public step = 1;
    @property({type: Number, reflect: true})
    public min = 0;
    @property({type: Number, reflect: true})
    public max = 100;
    // Private state variables
    @state()
    public pressed = false;
    @property({type: String, reflect: true})
    private label?: string;
    @query("#slider")
    private slider!: HTMLElement;
    private _isDragging = false;
    private _sliderRect!: DOMRect;
    private _pointerId: number | null = null;


    valueToPercentage(value: number) {
        const percentage =
            (this.boundedValue(value) - this.min) / (this.max - this.min);
        return this.inverted ? 1 - percentage : percentage;
    }

    percentageToValue(percentage: number) {
        return (
            (this.max - this.min) * (this.inverted ? 1 - percentage : percentage) +
            this.min
        );
    }

    steppedValue(value: number) {
        return Math.round(value / this.step) * this.step;
    }

    boundedValue(value: number) {
        return Math.min(Math.max(value, this.min), this.max);
    }

    /**
     * Render the slider component
     */
    override render() {
        const valuenow = this.steppedValue(this.value ?? 0);

        return html`
            <div
                    style=${styleMap({
                        "--value": `${this.valueToPercentage(this.value ?? 0)}`,
                    })}
                    aria-label=${ifDefined(this.label)}
                    aria-valuenow=${valuenow.toString()}
                    class="container ${classMap({pressed: this.pressed,})}"
                    aria-orientation=${this.vertical ? "vertical" : "horizontal"}

            >
                <p>${this.value}</p>
                <div id="slider" class="slider"
                     tabindex="0"
                     role="slider"
                     @keyup=${this._onKeyUp}
                     @keydown=${this._onKeyDown}>
                    <div class="slider-track-background"></div>
                    <slot name="background"></slot>
                    ${this.mode === 'cursor' ?
                            this.value != null ? html`
                                <div
                                        class=${classMap({
                                            "slider-track-cursor": true,
                                        })}
                                ></div>
                            ` : null : html`
                                <div
                                        class=${classMap({
                                            "slider-track-bar": true,
                                            [this.mode ?? "start"]: true,
                                            "show-handle": this.showHandle,
                                        })}
                                ></div>
                            `
                    }
                </div>
            </div>
        `;
    }

    /**
     * Lifecycle callback - when component is connected to DOM
     */
    override connectedCallback() {
        super.connectedCallback();
        this.addEventListener('pointerup', this._onPointerUp);
    }

    /**
     * Lifecycle callback - when component is disconnected from DOM
     */
    override disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('pointerup', this._onPointerUp);
        this.removeEventListener('pointerleave', this._onPointerUp);
    }

    /**
     * Lifecycle callback - after first update/render
     */
    protected override firstUpdated() {
        this._sliderRect = this.slider!.getBoundingClientRect();
    }

    /**
     * Handle pointer down event to start dragging
     * @param e Pointer event
     */
    private _onPointerDown(e: PointerEvent) {
        console.log("_onPointerDown", e)
        if (this.disabled || e.button !== 0) return;
        e.preventDefault();
        this._isDragging = true;
        this._pointerId = e.pointerId;
        this.setPointerCapture(this._pointerId);
        this._updateValueFromPointer(e);
        this.addEventListener('pointermove', this._onPointerMove);
    }

    /**
     * Handle pointer move event during dragging
     * @param e Pointer event
     */
    private _onPointerMove(e: PointerEvent) {
        if (!this._isDragging || e.pointerId !== this._pointerId) return;
        e.preventDefault();
        requestAnimationFrame(() => this._updateValueFromPointer(e));
    }

    /**
     * Handle pointer up event to stop dragging
     * @param e Pointer event
     */
    private _onPointerUp(e: PointerEvent) {
        console.log("_onPointerUp:", e)
        if (this._isDragging && e.pointerId === this._pointerId) {
            this._isDragging = false;
            if (this._pointerId !== null) {
                this.releasePointerCapture(this._pointerId);
                this._pointerId = null;
            }
            this.removeEventListener('pointermove', this._onPointerMove);
            this._emitChangeEvent();
        }
    }

    /**
     * Update slider value based on pointer position
     * @param e Pointer event
     */
    private _updateValueFromPointer(e: PointerEvent) {
        let percentage: number;
        console.log("_updateValueFromPointer:", e)
        if (this.vertical) {
            // Vertical mode - calculate from bottom
            const clientY = e.clientY;
            const trackHeight = this._sliderRect.height;
            const offset = trackHeight - (clientY - this._sliderRect.top);
            percentage = Math.max(0, Math.min(1, offset / trackHeight));
        } else {
            // Horizontal mode - calculate from left
            const clientX = e.clientX;
            const trackWidth = this._sliderRect.width;
            const offset = clientX - this._sliderRect.left;
            percentage = Math.max(0, Math.min(1, offset / trackWidth));
        }

        // Calculate new value with step and range constraints
        let newValue = this.min + percentage * (this.max - this.min);
        newValue = Math.round(newValue / this.step) * this.step;
        newValue = Math.max(this.min, Math.min(this.max, newValue));

        if (newValue !== this.value) {
            this.value = newValue;
            this.dispatchEvent(new CustomEvent('input', {
                detail: {value: this.value},
                bubbles: true,
                composed: true,
            }));
        }
    }

    /**
     * Handle keyboard events for accessibility
     * @param e Keyboard event
     */
    private _onKeyDown(e: KeyboardEvent) {
        if (!A11Y_KEY_CODES.has(e.code) || this.disabled) return;
        e.preventDefault();
        console.log("key down", e.key);
        switch (e.key) {
            case 'ArrowRight':
            case 'ArrowUp':
                this.value = this.boundedValue((this.value ?? 0) + this.step);
                break;
            case 'ArrowLeft':
            case 'ArrowDown':
                this.value = this.boundedValue((this.value ?? 0) - this.step);
                break;
            case "Home":
                this.value = this.min;
                break;
            case "End":
                this.value = this.max;
                break;
            default:
                return;
        }

    }

    /**
     * Handle keyboard events for accessibility
     * @param e Keyboard event
     */
    private _onKeyUp(e: KeyboardEvent) {
        if (!A11Y_KEY_CODES.has(e.code) || this.disabled) return;
        e.preventDefault();
        console.log("key up", e.key);
        this._emitChangeEvent();

    }

    /**
     * Emit change event when value is finalized
     */
    private _emitChangeEvent() {
        this.dispatchEvent(new CustomEvent('change', {
            detail: {value: this.value},
            bubbles: true,
            composed: true,
        }));
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "th-control-slider": ThControlSlider;
    }
}
