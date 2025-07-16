import {customElement, property} from "lit/decorators.js";
import {css, html, LitElement} from "lit";

@customElement("addon-layout")
export class AddonLayout extends LitElement {
    @property({type: Boolean}) disabled = false;

    protected override render() {
        return html`
            <slot></slot>
        `;
    }

    static override styles = css`
        :host {
            margin-top: 80px;
            position: absolute;
            background: var(--th-loayout-background, white);
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
        }
    `
}

declare global {
    interface HTMLElementTagNameMap {
        "addon-layout": AddonLayout; // 全局声明中也保持一致
    }
}
