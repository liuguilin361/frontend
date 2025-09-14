import {customElement, state} from "lit/decorators.js";
import {css, html, type PropertyValues} from "lit";
import '@/layout/web-things-main.ts'
import '@/layout/web-things-layout.ts'
import '@/layout/init-page.ts'
import gateway from "@/models/gateway.ts";
import {onAnchorClick} from "@/common/handle-event.ts";
import {navigate} from "@/common/navigation.ts";
import {WtElement} from "@/state/wt-element.ts";
import QuickBarMixin from "@/state/quick-bar-mixin.ts";
import type {Route} from "@/types.ts";
import {getDefaultPanelUrlPath} from "../data/panel.ts";


//查找第一个斜杠后的内容；   /webthings/thing => webthings
const panelUrl = (path: string) => {
    const dividerPos = path.indexOf("/", 1);
    return dividerPos === -1 ? path.substring(1) : path.substring(1, dividerPos);
};

@customElement("web-things")
export class WebThingsAppEl extends QuickBarMixin(WtElement) {
    static styles = css`
        :host {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100vh;
        }
    `

    @state() public _route: Route;

    @state() public _panelUrl: string;

    constructor() {
        super();
        this.gateway = gateway;
        const path = location.pathname;

        if (['', '/'].includes(path)) {
            //导航到默认主页  /webthings
            navigate(`/${getDefaultPanelUrlPath()}${location.search}`, {replace: true}).catch(console.error);
        }

        this._route = {
            prefix: "",
            path,
        }
        this._panelUrl = panelUrl(path);
    }

    renderMain() {
        // return html`
        //     <web-things-main .gateway=${this.gateway} .route=${this._route}></web-things-main>
        // `;
        return html`
            <web-things-layout .gateway=${this.gateway} .route=${this._route}></web-things-layout>
        `;
    }


    protected update(changedProperties: PropertyValues<this>) {
        if (this.gateway) {
            this.render = this.renderMain;
            this.update = super.update;
        }
        super.update(changedProperties);
    }

    protected firstUpdated(changedProperties: PropertyValues) {
        super.firstUpdated(changedProperties);
        const updateRoute = (path = location.pathname) => {
            console.log('location-changed', path);
            if (this._route && path === this._route.path) {
                return;
            }
            this._route = {
                prefix: '',
                path,
            }
            this._panelUrl = panelUrl(path);
            this._updateGateway({panelUrl: this._panelUrl})
        };
        window.addEventListener('location-changed', () => updateRoute())

        window.addEventListener('click', (ev) => {
            const url = onAnchorClick(ev);
            if (url) {
                navigate(url.pathname).catch((err) => console.error(err));
            }
        })
        if (this.render !== this.renderMain) {
            this._renderInitInfo(false);
        }
    }

    private _renderInitInfo(error: boolean) {
        html`
            <init-page
                    .error=${error}
            ></init-page>`
    }

}

declare global {
    interface HTMLElementTagNameMap {
        "web-things": WebThingsAppEl; // 全局声明中也保持一致
    }
}
