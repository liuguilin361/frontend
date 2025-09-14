import {customElement, property, state} from "lit/decorators.js";
import "@awesome.me/webawesome/dist/styles/webawesome.css"
import {css, html, LitElement, type PropertyValues} from "lit";
import '@/layout/components/wt-drawer.ts'
import '@/layout/components/wt-sidebar.ts'
import '@/layout/partial-panel-resolver.ts';
import type {Gateway, Route} from "@/types.ts";


@customElement("web-things-main")
export class WebThingMain extends LitElement {

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

    @state() private _drawerOpen = false;


    private get _sidebarNarrow() {
        return this.narrow;
    }


    protected firstUpdated(_changedProperties: PropertyValues) {
        import("@/layout/components/wt-sidebar");
        super.firstUpdated(_changedProperties);
        this.addEventListener("toggle-menu", (ev: any) => {
            if (this._sidebarNarrow) {
                this._drawerOpen = ev.detail?.open ?? !this._drawerOpen;
            }
            this.expanded = !this.expanded;
            console.log("expanded:", this.expanded);
        });
    }

    protected override render() {
        const sidebarNarrow = this._sidebarNarrow;
        return html`
            <wt-drawer open=${this._drawerOpen} type=${sidebarNarrow ? "modal" : ""}>
                <wt-sidebar
                        .gateway=${this.gateway}
                        .route=${this.route}
                        ?expanded=${this.expanded}
                        ?narrow=${sidebarNarrow}
                        ?alwaysExpand=${sidebarNarrow}>
                </wt-sidebar>
                <div slot="appContent" style="width 100%; height: 100%;display: flex">
                    <div style="width: 50%; background: aquamarine">
                        <button>Toggle</button>
                    </div>
                    <div style="width: 50%; background: red">Right</div>
                </div>
            </wt-drawer>
        `;
        // return html`
        //     <wt-drawer open ?narrow=${this.isNarrow}>
        //         <wt-sidebar
        //                 .gateway=${this.gateway}
        //                 .route=${this.route}
        //                 ?narrow=${this.isNarrow}
        //                 ?expanded=${!this.isNarrow}></wt-sidebar>
        //         <partial-panel-resolver
        //                 .gateway=${this.gateway}
        //                 .route=${this.route}
        //                 slot="appContent"></partial-panel-resolver>
        //     </wt-drawer>
        // `;
    }

}

declare global {
    interface HTMLElementTagNameMap {
        "web-things-main": WebThingMain; // 全局声明中也保持一致
    }
}
