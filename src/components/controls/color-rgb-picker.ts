import {customElement, property} from "lit/decorators.js";
import {css, html, LitElement} from "lit";

@customElement("color-rgb-picker")
export class ColorRgbPicker extends LitElement {
    static override styles = css`
        /* 在这里添加你的组件样式 */
    `;
    @property({type: Boolean}) disabled = false;
    @property({type: String, reflect: true}) value?: string;

    protected override render() {
        return html`
            <h1>Color Picker </h1>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "color-rgb-picker": ColorRgbPicker; // 全局声明中也保持一致
    }
}
