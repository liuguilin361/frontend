import {customElement, property} from "lit/decorators.js";
import {css, type PropertyValues, ReactiveElement} from "lit";
import type {ThingCardConfig} from "@/data/thing-card-config.ts";
import type {Webthing} from "@/types.ts";
import type {ThingCard} from "@/webthings/types.ts";
import {createCardElement} from "@/create-element/create-card-element.ts";

@customElement("webthing-card")
export class TuiCard extends ReactiveElement {
    static override styles = css``;

    @property({type: Boolean}) public preview = false;
    @property({attribute: false}) thing?: Webthing;
    @property({attribute: false}) config?: ThingCardConfig;

    private _element?: ThingCard;
    private _elementConfig?: ThingCardConfig;

    public connectedCallback() {
        super.connectedCallback();
        this._updateVisibility();
    }

    _updateVisibility() {
        if (!this._element || !this.thing) {
            return;
        }
        if (this._element.hidden) {
            this._setElementVisibility(false);
            return;
        }
        this._setElementVisibility(true);
    }

    _setElementVisibility(visible: boolean) {
        if (!this._element) return;
        if (this.hidden !== !visible) {
            this.style.setProperty("display", visible ? '' : 'none');
            this.toggleAttribute('hidden', !visible);
        }
        if (this._element.connectedWhileHidden === true) {
            if (!this._element.parentElement) {
                this.appendChild(this._element);
            }
        } else if (!visible && this._element.parentElement) {
            this.removeChild(this._element)
        } else if (visible && !this._element.parentElement) {
            this.appendChild(this._element)
        }
    }

    _updateElement(config: ThingCardConfig) {
        if (!this._element) return;
        this._element.setConfig(config);
        this._elementConfig = config;

    }

    _loadElement(config: ThingCardConfig) {
        this._element = createCardElement(config);
        this._elementConfig = config;
        if (this.thing) {
            this._element.thing = this.thing;
        }
        this._updateVisibility();
    }


    protected updated(changedProperties: PropertyValues) {
        super.updated(changedProperties);
        if (this._element) {
            if (changedProperties.has('config')) {
                const elementConfig = this._elementConfig;
                if (this.config !== elementConfig && this.config) {
                    const typeChanged = this.config?.type != elementConfig?.type || this.preview;
                    if (typeChanged) {

                    }
                }
            }
        }
    }

}

declare global {
    interface HTMLElementTagNameMap {
        "webthing-card": TuiCard; // 全局声明中也保持一致
    }
}
