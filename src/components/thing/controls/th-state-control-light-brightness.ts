import {customElement, property, state} from "lit/decorators.js";
import {css, html, LitElement} from "lit";
import "$lib/components/th-control-slider.ts"
import Thing from "models/thing.svelte.ts";
import {PropertyEnum} from "models/constants.ts";
import Property from "models/property.svelte.ts";

@customElement("th-state-control-light-brightness")
export class ThStateControlLightBrightness extends LitElement {
    @property() thing!: Thing;
    @state() disabled: boolean = false;
    @state() min: number = 0;
    @state() max: number = 100;
    @state() brightness: string = "";
    @state() on: string = "";

    @property() value: number = 0;


    onPropertyChanged = (name: string, property: Property, thing: Thing): void => {
        if (name === this.brightness) {
            this.min = property.minimum || 0;
            this.max = property.maximum || 100;
            this.value = property.value ?? 0;
        }
        this.disabled = thing.state === "off";
    };

    onChange = (e: CustomEvent): void => {
        let value = e.detail.value as number;
        this.thing?.setProperty(this.brightness, value);
    }

    private unsubscribe: Array<() => void> = [];

    override connectedCallback() {
        super.connectedCallback();
        let brightness = this.thing.findProperty(PropertyEnum.BrightnessProperty);
        if (brightness) {
            this.brightness = brightness.name;
            this.unsubscribe.push(this.thing.subscribeToProperty(brightness.name, this.onPropertyChanged));
        }
        let on = this.thing.findProperty(PropertyEnum.OnOffProperty);
        if (on) {
            this.brightness = on.name;
            this.unsubscribe.push(this.thing.subscribeToProperty(on.name, this.onPropertyChanged));
        }
    }

    override disconnectedCallback() {
        super.disconnectedCallback();
        for (const f of this.unsubscribe) {
            f();
        }
    }

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

    override render() {
        return html`
            <th-control-slider @change=${(e: CustomEvent) => this.onChange(e)} vertical min=${this.min} max=${this.max}
                               value=${this.value}>
            </th-control-slider>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "th-state-control-light-brightness": ThStateControlLightBrightness;
    }
}
