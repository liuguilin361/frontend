import {customElement, property} from "lit/decorators.js";
import {css, html, LitElement} from "lit";

@customElement("loading-screen")
export class LoadingScreen extends LitElement {
    static override styles = css``;
    @property({type: Boolean}) disabled = false;

    @property({type: Boolean}) public rootNav = false;

    protected override render() {
        return html`
            <slot></slot>
        `;
    }


}

declare global {
    interface HTMLElementTagNameMap {
        "loading-screen": LoadingScreen; // 全局声明中也保持一致
    }
}
