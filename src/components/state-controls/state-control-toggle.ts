import {customElement, property} from "lit/decorators.js";
import {css, html, LitElement} from "lit";

@customElement("state-control-toggle")
export class StateControlToggle extends LitElement {
    @property({type: Boolean}) disabled = false;
    static override styles = css`
        /* 在这里添加你的组件样式 */
    `;

    protected override render() {
        return html`
            /* 在这里添加模板 */
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "state-control-toggle": StateControlToggle; // 全局声明中也保持一致
    }
}
