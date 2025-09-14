import {customElement, property} from "lit/decorators.js";
import {css, html, LitElement, nothing} from "lit";
import type {Gateway, PanelInfo, Route} from "@/types.ts";
import "@/common/event.ts"
import "@/components/wt-svg-icon.ts";
import "@/components/wt-icon-button.ts";
import "@/components/wt-list.ts";
import "@/components/wt-list-item.ts";

import {
    mdiCalendar,
    mdiChartBox,
    mdiClipboardList,
    mdiFormatListBulletedType,
    mdiHammer,
    mdiHub,
    mdiLightningBolt,
    mdiMenu,
    mdiMenuOpen,
    mdiPuzzle,
    mdiTooltipAccount
} from "@mdi/js";
import {fireEvent} from "@/common/dom.ts";
import {classMap} from "lit/directives/class-map.js";

// 面板图标映射
export const PANEL_ICONS: Record<string, string> = {
    webthings: mdiHub,
    addons: mdiPuzzle,
    store: mdiChartBox,
    calendar: mdiCalendar,
    "developer-tools": mdiHammer,
    energy: mdiLightningBolt,
    history: mdiChartBox,
    logbook: mdiFormatListBulletedType,
    map: mdiTooltipAccount,
    todo: mdiClipboardList
};

/**
 * A sidebar component for navigation with normal and narrow modes.
 * @element wt-sidebar
 */
@customElement("wt-sidebar")
export class WtSidebar extends LitElement {
    static override styles = css`
        :host {
            height: 100vh;
            display: block;
            width: 100%; /* Normal mode width */
            user-select: none;
            box-sizing: border-box;
            background-color: var(--sidebar-bg, #ffffff);
            --header-height: 56px;
            --divider-color: #e0e0e0;
            --safe-area-inset-left: 0px;
            transition: width 0.3s ease;
        }

        .menu {
            height: var(--header-height);
            display: flex;
            box-sizing: border-box;
            align-items: center;
            border-bottom: 1px solid transparent;
            border-bottom: 1px solid var(--divider-color);
            white-space: nowrap;
            font-size: var(--header-font-size, 20px);
            padding-left: 4px;
            padding-inline-start: 4px;
            padding-inline-end: initial;
        }

        :host([expanded]) .menu {
            width: 256px;
        }

        .title {
            display: none;
            margin-left: 3px;
            margin-inline-start: 3px;
            margin-inline-end: initial;
            width: 100%;
        }

        :host([expanded]) .title {
            display: block;
        }


        :host([narrow][expanded]) .menu {
            width: 100%;
        }


        .title {
            margin-left: 3px;
            margin-inline-start: 3px;
            margin-inline-end: initial;
            width: 100%;
            display: none;
        }

        :host([expanded]) .title {
            display: inherit;
        }

        wt-list-item .headline {
            display: none;
        }

        wt-list-item {
            flex-shrink: 0;
            box-sizing: border-box;
            position: relative;
            --md-list-item-one-line-container-height: 40px;
            --md-list-item-top-space: 0;
            --md-list-item-bottom-space: 0;
        }

        wt-list-item.selected {
            --md-list-item-label-text-color: var(--sidebar-selected-icon-color);
            --md-ripple-hover-color: var(--primary-color);
        }

        wt-list-item.selected::before {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            transition: opacity 15ms linear;
            content: "";
            pointer-events: none;
            will-change: opacity;
            background-color: var(--primary-color);
            opacity: 0.12;
        }

        :host([expanded]) wt-list-item .headline {
            display: block;
        }

        wt-list-item {
            flex-shrink: 0;
            //box-sizing: border-box;
            //margin: 4px;
            //border-radius: 4px;
            //width: 48px;
            //position: relative;
        }

        :host([expanded]) wt-list-item {
            width: 248px;
        }

        @media (max-width: 600px) {
            :host([narrow]) {
                width: 48px;
            }
        }

    `;

    @property({attribute: false}) public gateway!: Gateway;
    @property({attribute: false}) public route!: Route;
    @property({type: Boolean, reflect: true}) public narrow = false;
    @property({type: Boolean, reflect: true}) public expanded = true;
    @property({attribute: "always-expand", type: Boolean}) public alwaysExpand = false;

    constructor() {
        super();
        this.addEventListener("keydown", this._handleKeyDown);
        this.addEventListener("click", this._handleToggleClick);
    }

    override disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener("keydown", this._handleKeyDown);
        this.removeEventListener("click", this._handleToggleClick);
    }

    /**
     * Renders the sidebar component.
     */
    protected override render() {
        const selectedPanel = this.gateway.panelUrl;
        return html`
            <nav class="sidebar" role="navigation" aria-expanded=${!this.narrow}>
                ${this._renderTopbar()}
                ${this._renderAllPanels(selectedPanel)}
            </nav>
        `;
    }


    private _renderTopbar() {
        return html`
            <div class="menu">
                ${!this.narrow ? html`
                    <wt-icon-button
                            path=${this.expanded ? mdiMenuOpen : mdiMenu}
                            @click=${this._toggleSidebar}>
                    </wt-icon-button>` : nothing}
                <div class="title">HomeAssistant</div>
            </div>
        `;
    }

    /**
     * Renders a single panel item.
     */
    private _renderPanel(panel: PanelInfo, selectedPanel: string) {
        if (!panel.title) return nothing;
        const iconPath = PANEL_ICONS[panel.component_name] || panel.icon || PANEL_ICONS["webthings"];
        return html`
            <wt-list-item
                    type="link"
                    href=${`/${panel.url_path}`}
                    class=${classMap({selected: selectedPanel === panel.url_path})}>
                <wt-svg-icon slot="start" path=${iconPath}></wt-svg-icon>
                ${this.expanded ? html`${panel.title}` : nothing}
            </wt-list-item>
        `;
    }

    /**
     * Renders all panel items.
     */
    private _renderAllPanels(selectedPanel: string) {
        const panels = Object.values(this.gateway.panels);
        return html`
            <wt-list>
                ${panels.map((p) => this._renderPanel(p, selectedPanel))}
            </wt-list>
        `;
    }

    /**
     * Handles keyboard events for accessibility.
     */
    private _handleKeyDown(event: KeyboardEvent) {
        if (event.key === "e" || event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            this._toggleSidebar();
        }
    }

    private _handleToggleClick(event: Event) {
        if ((event.target as HTMLElement).closest("wt-icon-button")) {
            this._toggleSidebar();
        }
    }


    private _toggleSidebar() {
        fireEvent(this, "toggle-menu")
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "wt-sidebar": WtSidebar;
    }
}
