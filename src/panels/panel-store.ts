import {customElement, property} from "lit/decorators.js";
import {css, html, LitElement, unsafeCSS} from "lit";
import {Task} from "@lit/task";
import Api from "@/models/api.ts";
import type {AddonDescription} from "@/models/types.ts";
import globalStyles from "@/index.css?inline";
import {map} from "lit/directives/map.js";
import {choose} from 'lit/directives/choose.js';
import {mdiClose, mdiPowerPlug, mdiPuzzle} from "@mdi/js";

@customElement("wt-panel-store")
export class PanelStore extends LitElement {
    static override styles = [unsafeCSS(globalStyles), css`
        :host {
            width: 100%;
        }
    `];
    @property({type: Boolean}) disabled = false;

    _addonsTask = new Task(this, {
        task: async () => {
            return await Api.getJson<Record<string, AddonDescription>>("/addons/store");
        },
        args: () => []
    });

    _renderAddonIcon(addon: AddonDescription) {
        return choose(addon.primary_type, [
                ["adapter", () => html`
                    <svg class="w-16 h-16" viewBox="0 0 24 24">
                        <path d=${mdiPowerPlug}>
                    </svg>`],
                ["extension", () => html`
                    <svg class="w-16 h-16" viewBox="0 0 24 24">
                        <path d=${mdiPuzzle}>
                    </svg>`],
            ],
            () => html`
                <svg class="w-16 h-16" viewBox="0 0 24 24">
                    <path d=${mdiPowerPlug}>
                </svg>`)
    }

    renderAddon(addon: AddonDescription) {
        return html`
            <li class="list-row">
                ${this._renderAddonIcon(addon)}
                <div>
                    <div>${addon.name}</div>
                    <div class="text-xs font-semibold opacity-60">ID: ${addon.id}</div>
                    <div class="text-xs font-semibold opacity-60">AUTHOR: <a href=${addon.author}>${addon.author}</a>
                    </div>
                </div>
                <p class="list-col-wrap text-xs">
                    ${addon.description}
                </p>
                <button class="btn btn-square btn-ghost">
                    <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none"
                           stroke="currentColor">
                            <path d="M6 3L20 12 6 21 6 3z"></path>
                        </g>
                    </svg>
                </button>
                <button class="btn btn-square btn-ghost">
                    <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none"
                           stroke="currentColor">
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                        </g>
                    </svg>
                </button>
            </li>`;

    }

    renderNavbar() {
        return html`
            <th-navbar title="Addons">
                <div slot="navbar-end" class="dropdown dropdown-end">
                    <a class="btn btn-ghost btn-circle" href="/addons">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24"
                             stroke="none">
                            <path fill="white" d=${mdiClose}></path>
                        </svg>
                    </a>
                </div>
            </th-navbar>`
    }

    protected override render() {
        return html`
            ${this.renderNavbar()}
            <div class="container">
                ${this._addonsTask.render({
                    initial: () => html`
                        <progress class="progress w-56"></progress>`,
                    complete: (addons) => {
                        console.log(addons);
                        if (Object.keys(addons).length === 0) {
                            return html`<h1>Empty</h1>`;
                        } else {
                            return html`
                                <ul class="list bg-base-100 rounded-box shadow-md">
                                    <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">Most played songs this week
                                    </li>
                                    ${map(Object.values(addons), (addon) => {
                                        return this.renderAddon(addon);
                                    })}
                                </ul>
                            `;
                        }
                    },
                    error: (error) => html`<p>Oops, something went wrong: ${error}</p>`,
                })}
            </div>
        `;
    }


}

declare global {
    interface HTMLElementTagNameMap {
        "wt-panel-store": PanelStore; // 全局声明中也保持一致
    }
}
