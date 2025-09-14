import {customElement, property} from "lit/decorators.js";
import {css, html, LitElement} from "lit";

@customElement("error-screen")
export class ErrorScreen extends LitElement {
    static override styles = css``;
    @property({type: String, reflect: true}) error?: string;


    protected override render() {
        return html`
            <h1>${this.error}</h1>
        `;
    }

}

declare global {
    interface HTMLElementTagNameMap {
        "error-screen": ErrorScreen; // 全局声明中也保持一致
    }
}
