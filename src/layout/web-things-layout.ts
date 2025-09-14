import {customElement, property, state} from "lit/decorators.js";
import "@awesome.me/webawesome/dist/styles/webawesome.css"
import {css, html, LitElement, type PropertyValues} from "lit";
import '@/layout/components/wt-drawer.ts'
import '@/layout/components/wt-sidebar.ts'
import '@/layout/partial-panel-resolver.ts';
import type {Gateway, Panels, Route} from "@/types.ts";
import type {RouteConfig} from "@lit-labs/router";
import {Routes} from '@lit-labs/router';
import {defaultPanels} from "@/assets/default-panels.ts";
import "@/panels/panel-webthings.ts";
import {html as staticHtml, unsafeStatic} from "lit/static-html.js";


const COMPONENTS: { [key: string]: () => Promise<unknown> } = {
    webthings: () => import("@/panels/panel-webthings.ts"),
    addons: () => import("@/panels/panel-addons.ts"),
    store: () => import("@/panels/panel-store.ts"),
};

@customElement("web-things-layout")
export class WebThingsLayout extends LitElement {

    static override styles = css`
        :host {
            display: flex;
            width: 100vw;
            height: 100vh;
            --wt-drawer-width: 256px; /* Sync with sidebar default width */
        }

    `;

    @property({attribute: false}) public gateway!: Gateway;
    @property({attribute: false}) public route?: Route;
    @property({type: Boolean}) public narrow = false;
    @property({type: Boolean}) public expanded = true;

    @property({type: String}) public panelUrl = '';
    @property({type: String}) public defaultPanel = "webthings";
    @property({attribute: false}) public panels: Panels = {};


    private _router = new Routes(this, [
        {
            path: `/`,
            render: () => html`
                <wt-panel-webthings .gateway=${this.gateway}></wt-panel-webthings>`,
        }]);
    @state() private _drawerOpen = false;

    constructor() {
        super();
        this.panels = {...defaultPanels};
        this._router.routes.push({
            path: `/*`,
            render: (params) => html`<h1>Not found: ${params[0]}</h1>`,
            enter: async (params) => {
                console.log("params=>>>", params);
                const path = params[0];
                const dynamicRoute = this.getDynamicRoute(path);
                console.log("dynamicRoute=>>>", dynamicRoute);
                if (dynamicRoute) {
                    const {routes} = this._router;
                    routes.splice(routes.length - 1, 0, dynamicRoute);
                    // Trigger the router again
                    await this._router.goto('/' + path);
                    // Reject this route so the dynamic one is matched
                    return false;
                }
                return true;
            }
        });
    }

    protected firstUpdated(_changedProperties: PropertyValues) {
        import("@/layout/components/wt-sidebar");
        super.firstUpdated(_changedProperties);
        const updateRoute = (path = location.pathname) => {
            this._router.goto(path);
        }
        updateRoute();
        window.addEventListener('location-changed', () => updateRoute())
        this.addEventListener("toggle-menu", (ev: any) => {
            if (this.narrow) {
                this._drawerOpen = ev.detail?.open ?? !this._drawerOpen;
            }
            this.expanded = !this.expanded;
        });
    }

    protected override render() {
        const sidebarNarrow = this.narrow;
        return html`
            <wt-drawer open=${this._drawerOpen} type=${sidebarNarrow ? "modal" : undefined}>
                <wt-sidebar
                        .gateway=${this.gateway}
                        .route=${this.route}
                        ?expanded=${this.expanded}
                        ?narrow=${sidebarNarrow}
                        ?alwaysExpand=${sidebarNarrow}>
                </wt-sidebar>
                <div slot="appContent">
                    ${this._router.outlet()}
                </div>
            </wt-drawer>
        `;
    }

    private getDynamicRoute(path: string | undefined): RouteConfig | null {
        if (path === undefined) {
            return null;
        }
        if (path in this.panels && path in COMPONENTS) {
            const panel = this.panels[path];
            console.log("panel:", panel)
            COMPONENTS[path]?.().catch((e) => console.log(e));
            const tag = unsafeStatic(`wt-panel-${path}`);
            return {
                path: `/${panel.url_path}`,
                render: () => staticHtml`
                    <${tag} .gateway=${this.gateway}></${tag}>`
            };
        }
        return null;
    }

}

declare global {
    interface HTMLElementTagNameMap {
        "web-things-layout": WebThingsLayout; // 全局声明中也保持一致
    }
}
