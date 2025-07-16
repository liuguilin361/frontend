import {customElement, property} from "lit/decorators.js";
import {css, LitElement} from "lit";

@customElement("th-list")
export class ThTmp extends LitElement {
    @property() disabled = false;
    static get style() {
        return css``
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "th-tmp": ThTmp;
    }
}
