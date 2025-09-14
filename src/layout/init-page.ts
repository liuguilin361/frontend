import {customElement, property} from "lit/decorators.js";
import {css, html, LitElement} from "lit";

@customElement("init-page")
export class InitPage extends LitElement {
    static override styles = css``;
    @property({type: Boolean}) disabled = false;
    @property({type: Boolean}) error = false;

    protected override render() {
        return html`
            <slot></slot>
        `;
    }


}

declare global {
    interface HTMLElementTagNameMap {
        "init-page": InitPage; // 全局声明中也保持一致
    }
}
