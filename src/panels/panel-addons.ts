import {customElement, property} from "lit/decorators.js";
import {css, html, LitElement, unsafeCSS} from "lit";
import {Task} from "@lit/task";
import Api from "@/models/api.ts";
import type {AddonManifest} from "@/models/types.ts";
import '@/components/addon-item.ts';
import '@/layout/components/wt-navbar.ts';
import globalStyles from "@/index.css?inline";
import {mdiShoppingOutline} from "@mdi/js";

@customElement("wt-panel-addons")
export class PanelAddons extends LitElement {
    static override styles = [unsafeCSS(globalStyles), css`
        :host {
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

    _addonsTask = new Task(this, {
        task: async () => {
            return await Api.getInstalledAddons<AddonManifest>();
        },
        args: () => []
    });

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
        // return html`
        //     ${this.renderNavbar()}
        //     <div class="container">
        //         ${this._addonsTask.render({
        //             initial: () => html`
        //                 <progress class="progress w-56"></progress>`,
        //             complete: (addons) => map(Object.values(addons), (addon) => html`
        //                 <addon-item .addon=${addon}></addon-item>`),
        //             error: (error) => html`<p>Oops, something went wrong: ${error}</p>`,
        //         })}
        //     </div>
        // `;

        return html`
            <h1>Addons</h1>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "wt-panel-addons": PanelAddons; // 全局声明中也保持一致
    }
}
