import {customElement} from "lit/decorators.js";
import {css, LitElement} from "lit";

@customElement("th-list")
export class ThList extends LitElement {
    static get style() {
        return css``
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "th-list": ThList;
    }
}
