import {customElement, property, state} from "lit/decorators.js";
import {css, html, LitElement} from "lit";
import '@components/th-control-slider.ts';


@customElement("webthing-brightness")
export class WebthingBrightness extends LitElement {
    static override styles = css`
        th-control-slider {
            position: relative;
            height: 45vh;
            max-height: 320px;
            min-height: 200px;
            --control-slider-thickness: 130px;
            --control-slider-border-radius: 36px;
            --control-slider-color: var(--primary-color);
            --control-slider-background: var(--disabled-color);
            --control-slider-background-opacity: 0.2;
        }
    `;

    @state() disabled: boolean = false;
    @property({type: Number, reflect: true}) min: number = 0;
    @property({type: Number, reflect: true}) max: number = 100;

    @state() on: string = "";
    @property({type: Number, reflect: true}) value: number = 0;


    onChange = (e: CustomEvent): void => {
        e.stopPropagation();
        let value = e.detail.value as number;
        this.dispatchEvent(new CustomEvent("brightness-change", {
            detail: {value}, bubbles: true,
            composed: true,
        }))
    }


    override render() {
        return html`
            <h1>Brightness</h1>
            <th-control-slider value=60 @change=${(e: CustomEvent) => this.onChange(e)} vertical min=${this.min}
                               max=${this.max}
            >
            </th-control-slider>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "webthing-brightness": WebthingBrightness;
    }
}
