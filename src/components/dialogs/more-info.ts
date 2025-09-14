import {customElement, property} from "lit/decorators.js";
import {css, html, LitElement} from "lit";
import type Thing from "@models/thing.ts";

@customElement("more-info-info")
export class MoreInfo extends LitElement {
    @property({attribute: false}) thing!: Thing;

    @property({attribute: false}) public editMode?: boolean;

    static get style() {
        return css``
    }

    override render() {
        const capability = this.thing.selectedCapability;
        return html`
            <div class="container" data-capability=${capability}>
                <div class="content"></div>
            </div>`
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "more-info-info": MoreInfo;
    }
}
