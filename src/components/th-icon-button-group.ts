import {customElement, property} from "lit/decorators.js";
import {css, html, LitElement} from "lit";

@customElement("th-icon-button-group")
export class ThIconButtonGroup extends LitElement {
    @property({type: Boolean}) disabled = false;


    protected override render() {
        return html`
            <slot></slot>
        `;
    }

    static override styles = css`
        :host {
            position: relative;
            display: flex;
            flex-direction: row;
            align-items: center;
            height: 48px;
            width: auto;
            border-radius: 28px;
            background-color: rgba(139, 145, 151, 0.1);
        }
        ::slotted(.separator) {
            background-color: rgba(var(--rgb-primary-text-color), 0.15);
            width: 1px;
            margin: 0 1px;
            height: 40px;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "th-icon-button-group": ThIconButtonGroup; // 全局声明中也保持一致
    }
}
