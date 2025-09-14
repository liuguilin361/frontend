import {customElement, property, state} from "lit/decorators.js";
import {css, html, LitElement, nothing} from "lit";
import type Thing from "@models/thing.ts";
import {Events, PropertyTypes} from "@models/constants.ts";
import {mdiBrightness6, mdiLightbulb, mdiPower} from "@mdi/js";
import type {PropertyDescription} from "@models/types.ts";
import '@components/th-card.ts';
import '@components/th-dialog.ts';
import '@components/th-svg-icon.ts';
import '@components/tile/th-tile-icon.ts';
import '@components/tile/th-tile-info.ts';
import '@components/dialogs/more-info.ts';
import '@components/dialogs/more-info-dialog.ts';
import '@components/dialogs/more-info-contont.ts';
import '@components/controls/webthing-brightness';

type MainControl = "brightness" | "color_temp" | "color";

@customElement("webthing-light")
export class WebthingLight extends LitElement {

    static override styles =
        css`
            :host {

            }

            #card {
                min-width: 200px;
            }

            .card-content {
                display: flex;
                gap: 8px;
                align-items: center;
                padding: 10px;
                flex-grow: 1;
                overflow: auto;
            }
        `;
    @property() thing?: Thing;
    @property({type: Boolean}) disabled = false;
    @state() open = false;
    @state() status = "off";
    @state() on: boolean = false;
    @state() brightness?: number;
    @state() color?: string;
    @state() colorMode?: string;
    @state() colorTemp?: number;
    @state() iconData = mdiLightbulb;
    @state() private _mainControl: MainControl = "brightness";
    private onProperty?: PropertyDescription;
    private brightnessProperty?: PropertyDescription;
    private colorProperty?: PropertyDescription;
    private colorModeProperty?: PropertyDescription;
    private colorTempProperty?: PropertyDescription;


    _handlePropertyStatus(data: Record<string, any>) {
        for (const name in data) {
            if (name === this.onProperty?.name) {
                this.on = Boolean(data[name]);
            }
            if (name === this.brightnessProperty?.name) {
                this.brightness = parseFloat(data[name]);
                if (this.on) {
                    this.status = `${this.brightness}%`
                }
            }
            if (name === this.colorProperty?.name) {
                this.color = String(data[name]);
            }
            if (name === this.colorTempProperty?.name) {
                this.colorTemp = parseFloat(data[name]);
            }

            if (name === this.colorModeProperty?.name) {
                this.colorTemp = parseFloat(data[name]);
            }
        }
    }


    public override connectedCallback() {
        super.connectedCallback();
        this.onProperty = this.thing?.findProperty(PropertyTypes.ON_OFF);
        this.brightnessProperty = this.thing?.findProperty(PropertyTypes.BRIGHTNESS);
        this.colorProperty = this.thing?.findProperty(PropertyTypes.COLOR);
        this.colorModeProperty = this.thing?.findProperty(PropertyTypes.COLOR_MODE);
        this.colorTempProperty = this.thing?.findProperty(PropertyTypes.COLOR_TEMPERATURE);
        this.thing?.subscribe(Events.PROPERTY_STATUS, this._handlePropertyStatus.bind(this));
    }

    public override disconnectedCallback() {
        super.disconnectedCallback();
        this.thing?.unsubscribe(Events.PROPERTY_STATUS, this._handlePropertyStatus.bind(this))
    }

    _onClick(e: Event) {
        const target = e.target as HTMLElement;
        const dialogData = target.closest('[data-dialog]') as HTMLElement | null;
        if (dialogData) {
            e.stopPropagation();
            const action = dialogData.dataset.dialog;
            if (action === "open") {
                this.open = true;
            }
            if (action === "close") {
                this.open = false;
            }
        }
    }


    protected override render() {
        if (!this.thing) {
            return nothing;
        }
        return html`
            <th-card id="card" data-dialog="open" @click=${this._onClick}>
                <div class="card-content">
                    <th-tile-icon webthing="">
                        <th-svg-icon path=${this.iconData} slot="icon"/>
                    </th-tile-icon>
                    <th-tile-info primary=${this.thing.title} secondary=${this.status}></th-tile-info>
                </div>
            </th-card>
            <more-info-dialog label=${this.thing.title} ?open=${this.open} @close=${() => this.open = false}>
                <div class="controls">
                    ${this.brightness || this.color || this.colorTemp ? html`
                        ${this.brightness && this._mainControl === "brightness" ? html`
                            <webthing-brightness></webthing-brightness>
                        ` : nothing}
                        ${this.color && this._mainControl === 'color' ? html`
                            <color-rgb-picker value=${this.color}></color-rgb-picker>
                        ` : nothing}
                        ${this.colorTemp && this._mainControl === 'color_temp' ? html`
                            <color-rgb-picker></color-rgb-picker>
                        ` : nothing}
                    ` : nothing}
                    <th-icon-button-group>
                        ${this.brightness ? html`
                            <th-icon-button>
                                <th-svg-icon path=${mdiPower}></th-svg-icon>
                            </th-icon-button>` : nothing}

                        ${this.color || this.colorTemp ? html`
                            <th-icon-button-toggle path=${mdiBrightness6} @click=${this._setMainControl}
                                                   .control=${"brightness"}
                                                   .selected=${this._mainControl === 'brightness'}>
                            </th-icon-button-toggle>` : nothing}
                        ${this.color ? html`
                            <th-icon-button-toggle @click=${this._setMainControl} .control=${"color"}
                                                   .selected=${this._mainControl === 'color'}>
                                <span class="wheel color"></span>
                            </th-icon-button-toggle>` : nothing}
                        ${this.colorTemp ? html`
                            <th-icon-button-toggle @click=${this._setMainControl} .control=${"color_temp"}
                                                   .selected=${this._mainControl === 'color_temp'}>
                                <span class="wheel color-temp"></span>
                            </th-icon-button-toggle>` : nothing}
                    </th-icon-button-group>
                </div>
            </more-info-dialog>
        `;

    }

    private _setMainControl(ev: any) {
        ev.stopPropagation();
        this._mainControl = ev.currentTarget.control;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "webthing-light": WebthingLight; // 全局声明中也保持一致
    }
}
