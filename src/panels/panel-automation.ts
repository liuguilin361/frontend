import {customElement, property} from "lit/decorators.js";
import {css, html, LitElement, unsafeCSS} from "lit";
import '@/components/addon-item.ts';
import '@/layout/components/wt-navbar.ts';
import globalStyles from "@/index.css?inline";
import {mdiShoppingOutline} from "@mdi/js";

@customElement("wt-panel-automation")
export class PanelAutomation extends LitElement {
    static override styles = [unsafeCSS(globalStyles), css`
        :host {
            width: 100%;
            display: flex;
            flex-direction: column;
        }

        .container {
            width: 100%;
            padding: 12px 24px;
            height: 100%;
            display: flex;
            flex-wrap: wrap;
            overflow: scroll;
            gap: 5px;
            background: var(--th-loayout-background, white);
        }
    `];
    @property({type: Boolean}) disabled = false;

    renderNavbar() {
        return html`
            <th-navbar title="Addons">
                <div slot="navbar-end" class="dropdown dropdown-end">
                    <a class="btn btn-ghost btn-circle" href="/store">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24"
                             stroke="none">
                            <path fill="white" d=${mdiShoppingOutline}></path>
                        </svg>
                    </a>
                </div>
            </th-navbar>`
    }

    protected override render() {
        return html`
            ${this.renderNavbar()}
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "wt-panel-automation": PanelAutomation; // 全局声明中也保持一致
    }
}
