import {customElement, property} from "lit/decorators.js";
import {css, html, LitElement} from "lit";
import '@awesome.me/webawesome/dist/components/divider/divider.js'

@customElement("th-divider")
export class ThDivider extends LitElement {
    static override styles = css``;
    @property({type: Boolean}) disabled = false;

    protected override render() {
        return html`
            <wa-divider></wa-divider>
        `;
    }


}

declare global {
    interface HTMLElementTagNameMap {
        "th-divider": ThDivider; // 全局声明中也保持一致
    }
}
