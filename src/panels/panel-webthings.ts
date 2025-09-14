import {customElement, property} from "lit/decorators.js";
import {css, html, LitElement} from "lit";
import '@spectrum-web-components/bundle/elements.js';
import "@/layout/components/wt-navbar.ts";

@customElement("wt-panel-webthings")
export class PanelWebthings extends LitElement {
    static override styles = css`
        :host {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
        }
    `;
    @property({type: Boolean}) disabled = false;

    renderNavbar() {
        return html`webthings`
    }

    protected override render() {
        return html`
            ${this.renderNavbar()}
        `;
    }

}

declare global {
    interface HTMLElementTagNameMap {
        "wt-panel-webthings": PanelWebthings; // 全局声明中也保持一致
    }
}
