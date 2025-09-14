import {customElement, property} from "lit/decorators.js";
import {css} from "lit";
import type {PropertyValues} from "@lit/reactive-element";
import {type RouteOptions, RoutePage, type RouterOptions} from "@/layout/route-page.ts";
import type {Gateway, Panels} from "@/types.ts";

const CACHE_URL_PATHS = ["webthings"];


const COMPONENTS: { [kye: string]: () => Promise<unknown> } = {
    webthings: () => import("@/panels/panel-webthings.ts"),
    addons: () => import("@/panels/panel-addons.ts"),
    store: () => import("@/panels/panel-store.ts"),
};


@customElement("partial-panel-resolver")
export class PartialPanelResolver extends RoutePage {

    static override styles = css``;
    @property({attribute: false}) public gateway!: Gateway;
    private _disconnectedPanel?: HTMLElement;
    private _disconnectedActiveElement?: HTMLElement;


    public willUpdate(changedProperties: PropertyValues<this>) {
        super.willUpdate(changedProperties);
        if (!changedProperties.has("gateway")) {
            return;
        }
        let oldGateway = changedProperties.get("gateway");
        if (this.gateway.panels && (!oldGateway || oldGateway.panels !== this.gateway.panels)) {
            this._updateRoutes(oldGateway?.panels).catch(console.error);
        }
    }

    _checkVisibility() {
        console.log("...checkVisibility");
        if (document.hidden) {
        } else {
            this._onVisible();
        }
    }


    protected updatePageEl(el: any) {
        let gateway = this.gateway;
        el.route = this.route;
        el.gateway = gateway;
    }

    protected createLoadingScreen() {
        const el = super.createLoadingScreen();
        el.rootNav = true;
        return el;
    }

    private async _updateRoutes(oldPanels?: Gateway['panels']) {
        this.routerOptions = this._getRoutes(this.gateway.panels);
        if (!oldPanels || oldPanels[this._currentPage] != this.gateway.panels[this._currentPage]) {
            await this.rebuild();
            await this.pageRendered;
        }
    }

    private _getRoutes(panels: Panels): RouterOptions {
        const routes: RouterOptions["routes"] = {};
        Object.values(panels).forEach((panel) => {
            const data: RouteOptions = {
                tag: `wt-panel-${panel.component_name}`,
                cache: CACHE_URL_PATHS.includes(panel.component_name),
            }
            if (panel.component_name in COMPONENTS) {
                data.load = COMPONENTS[panel.component_name];
            }
            routes[panel.url_path] = data;
        })
        return {
            beforeRender: (page: string) => {
                if (!page || !routes[page]) {
                    return this.gateway.defaultPanel || '/'
                }
                return undefined;
            },
            showLoading: false,
            routes,
        }
    }

    private _onVisible() {
        if (this._disconnectedPanel) {
            this.appendChild(this._disconnectedPanel);
            this._disconnectedPanel = undefined;
        }
        if (this._disconnectedActiveElement) {
            this._disconnectedActiveElement.focus();
            this._disconnectedActiveElement = undefined;
        }
    }


}

declare global {
    interface HTMLElementTagNameMap {
        "partial-panel-resolver": PartialPanelResolver; // 全局声明中也保持一致
    }
}
