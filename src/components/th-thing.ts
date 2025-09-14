import {customElement, property} from "lit/decorators.js";
import {html, LitElement, nothing} from "lit";
import "@components/th-card.ts"
import "@components/tile/th-tile-icon.ts"
import Thing from "@models/thing.ts";
import '@components/capability/webthing-light.ts';

@customElement("th-thing")
export class ThThing extends LitElement {


    @property() thing?: Thing;
    @property({type: Boolean}) disabled = false;


    protected override render() {
        if (!this.thing) {
            return nothing;
        }
        return html`
            <webthing-light .thing=${this.thing}></webthing-light>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "th-thing": ThThing; // 全局声明中也保持一致
    }
}
