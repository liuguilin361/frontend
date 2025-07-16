import {customElement, property} from "lit/decorators.js";
import {css, html, LitElement} from "lit";

@customElement("th-main")
export class ThMain extends LitElement {
    static override styles = css`
        :host {
            background: aqua;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            height: 100vh;
            width: 100vw;
            gap: 10px;
        }
    `
    @property({type: Boolean}) disabled = false;

    protected override render() {
        return html`
            <slot></slot>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "th-main": ThMain; // 全局声明中也保持一致
    }
}
