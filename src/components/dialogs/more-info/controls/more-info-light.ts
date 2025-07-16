import {customElement, property, state} from "lit/decorators.js";
import {css, type CSSResultGroup, html, LitElement, nothing} from "lit";
import type Thing from "models/thing.svelte.ts";
import "../../../thing/controls/th-more-info-state-header.ts"
import "../../../thing/controls/th-state-control-light-brightness.ts"
import {PropertyEnum} from "models/constants.ts";
import "$lib/components/thing/light/color-rgb-picker.ts"
import '$lib/components/th-icon-button-group.ts'
import '$lib/components/th-icon-button-toggle.ts'
import '$lib/components/th-icon-button.ts'
import '$lib/components/th-svg-icon.ts'
import {mdiBrightness6, mdiPower} from "@mdi/js";

type MainControl = "brightness" | "color_temp" | "color";

@customElement("more-info-light")
export class MoreInfoLight extends LitElement {
    @property({attribute: false}) public thing!: Thing;

    @state() private _mainControl: MainControl = "brightness";


    static override get styles(): CSSResultGroup {
        return [
            css`
                .wheel.color {
                    background-image: url("/images/color_wheel.png");
                    background-size: cover;
                }

                .wheel {
                    width: 30px;
                    height: 30px;
                    flex: none;
                    border-radius: 15px;
                }

                .wheel.color-temp {
                    background: linear-gradient(
                            0,
                            rgb(166, 209, 255) 0%,
                            white 50%,
                            rgb(255, 160, 0) 100%
                    );
                }

                *[disabled] .wheel {
                    filter: grayscale(1) opacity(0.5);
                }`
        ]
    }


    override render() {
        if (!this.thing) {
            return nothing;
        }
        const brightness = this.thing.findProperty(PropertyEnum.BrightnessProperty);
        const color = this.thing.findProperty(PropertyEnum.ColorProperty);
        const colorTemp = this.thing.findProperty(PropertyEnum.ColorTemperatureProperty);

        return html`
            <th-more-info-state-header .thing=${this.thing}>
            </th-more-info-state-header>
            <div class="controls">
                ${brightness || color || colorTemp ? html`
                    ${brightness && this._mainControl === "brightness" ? html`
                        <th-state-control-light-brightness .thing=${this.thing}>
                        </th-state-control-light-brightness>
                    ` : nothing}
                    ${color && this._mainControl === 'color' ? html`
                        <color-rgb-picker></color-rgb-picker>
                    ` : nothing}
                    ${colorTemp && this._mainControl === 'color_temp' ? html`
                        <color-rgb-picker></color-rgb-picker>
                    ` : nothing}
                ` : nothing}
                <th-icon-button-group>
                    ${brightness ? html`
                        <th-icon-button>
                            <th-svg-icon path=${mdiPower}></th-svg-icon>
                        </th-icon-button>` : nothing}

                    ${color || colorTemp ? html`
                        <th-icon-button-toggle path=${mdiBrightness6} @click=${this._setMainControl}
                                               .control=${"brightness"}
                                               .selected=${this._mainControl === 'brightness'}>
                        </th-icon-button-toggle>` : nothing}
                    ${color ? html`
                        <th-icon-button-toggle @click=${this._setMainControl} .control=${"color"}
                                               .selected=${this._mainControl === 'color'}>
                            <span class="wheel color"></span>
                        </th-icon-button-toggle>` : nothing}
                    ${colorTemp ? html`
                        <th-icon-button-toggle @click=${this._setMainControl} .control=${"color_temp"}
                                               .selected=${this._mainControl === 'color_temp'}>
                            <span class="wheel color-temp"></span>
                        </th-icon-button-toggle>` : nothing}
                </th-icon-button-group>
            </div>
        `
    }

    private _setMainControl(ev: any) {
        ev.stopPropagation();
        this._mainControl = ev.currentTarget.control;
    }

}

declare global {
    interface HTMLElementTagNameMap {
        "more-info-light": MoreInfoLight;
    }
}
