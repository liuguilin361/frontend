import {customElement, property, state} from "lit/decorators.js";
import {css, html, LitElement, nothing} from "lit";
import "$lib/components/th-card.ts"
import "$lib/components/tile/th-tile-icon.ts"
import Thing from "models/thing.svelte.ts";
import Property from "models/property.svelte.ts";

@customElement("th-thing")
export class ThThing extends LitElement {

    @property() thing?: Thing;
    @property({type: Boolean}) disabled = false;

    @state() state = this.thing?.state;
    @state() iconData = this.thing?.iconData;


    _handleThingUpdate(_name: string, _prop: Property, thing: Thing) {
        this.state = thing.state;
        this.iconData = thing.iconData;
    }

    unsubscribe: any | null = null;

    public override connectedCallback() {
        super.connectedCallback();
        this.unsubscribe = this.thing?.subscribeToAllProperties(this._handleThingUpdate.bind(this));
    }

    public override disconnectedCallback() {
        super.disconnectedCallback();
        this.unsubscribe?.();
    }


    protected override render() {
        if (!this.thing) {
            return nothing;
        }
        return html`
            <th-card id="card">
                <div class="card-content">
                    <th-tile-icon @click=${this._handleTileIconClick}>
                        <th-svg-icon path=${this.iconData} slot="icon"/>
                    </th-tile-icon>
                    <th-tile-info primary=${this.thing.name} secondary=${this.state}></th-tile-info>
                </div>
            </th-card>
            <th-more-info-dialog open>
                <more-info-light thing=${this.thing}></more-info-light>
            </th-more-info-dialog>
        `;
    }

    static override styles =
        css`
            :host {
               
            }
            #card {
                width: 200px;
            }

            .card-content {
                gap: 10px;
                padding: 10px;
                flex-grow: 1;
                overflow: auto;
            }
        `;


    _handleTileIconClick() {
        console.log("_handleTileIconClick")
        this.thing?.toggle();
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "th-thing": ThThing; // 全局声明中也保持一致
    }
}
