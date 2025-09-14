import {property} from "lit/decorators.js";
import {type PropertyValues, ReactiveElement} from "lit";
import type {Route} from "@/types.ts";
import {navigate} from "@/common/navigation.ts";


const extractPage = (path: string, defaultPage: string) => {
    if (path === "") {
        return defaultPage;
    }
    const subpathStart = path.indexOf("/", 1);
    return subpathStart === -1
        ? path.substring(1)
        : path.substring(1, subpathStart);
};

export interface RouteOptions {
    // HTML tag of the route page.
    tag: string;
    // Function to load the page.
    load?: () => Promise<unknown>;
    cache?: boolean;
}

export interface RouterOptions {
    // The default route to show if path does not define a page.
    defaultPage?: string;
    // If all routes should be preloaded
    preloadAll?: boolean;
    // If a route has been shown, should we keep the element in memory
    cacheAll?: boolean;
    // Should we show a loading spinner while we load the element for the route
    showLoading?: boolean;
    // Promise that resolves when the initial data is loaded which is needed to show any route.
    initialLoad?: () => Promise<unknown>;
    // Hook that is called before rendering a new route. Allowing redirects.
    // If string returned, that page will be rendered instead.
    beforeRender?: (page: string) => string | undefined;
    routes: Record<string, RouteOptions | string>;
}

export class RoutePage extends ReactiveElement {

    @property({attribute: false}) route?: Route;

    protected routerOptions!: RouterOptions;
    protected _currentPage = "";
    private _currentLoadPromise?: Promise<void>;
    private _cache: Map<string, any> = new Map();

    private _initialLoadDone = false;

    // 执行时机: 组件实例首次创建时立即调用。
    // 参数: 无。
    // 说明: 这是 JavaScript 类构造函数，用于初始化组件的内部状态和设置默认属性。在这个阶段，组件的DOM尚未创建，不应该访问或操作DOM。
    constructor() {
        super();
        console.debug("route constructor")
    }

    protected get pageRendered(): Promise<void> {
        console.debug("route pageRendered")
        return this.updateComplete.then(() => this._currentLoadPromise);
    }

    // 执行时机: 组件首次连接到文档DOM时调用。
    // 参数: 无。
    // 说明: 这是一个标准的 Web Component 生命周期回调。在这个方法中，你可以执行一些一次性设置，例如添加事件监听器、请求数据等。
    connectedCallback() {
        console.debug("route connectedCallback")
        super.connectedCallback();
    }

    // 执行时机: 在组件首次连接到DOM之前（connectedCallback 之前）调用一次。
    // 参数: 无。
    // 说明: 返回组件的渲染根节点。默认情况下，它会创建一个 Shadow DOM。你可以重写此方法来将组件内容渲染到 Light DOM 或自定义的 Shadow DOM。
    protected createRenderRoot() {
        return this
    }


    // 执行时机: 在每次组件需要更新（由于属性变化或请求更新）但尚未开始渲染之前调用。
    // 参数: changedProperties: 一个 Map 对象，包含已更改的属性名称作为键和其旧值作为值。
    // 说明: 允许你在组件更新之前执行逻辑，例如基于旧属性值计算新状态或在渲染之前执行一些操作。你可以通过返回 false 来阻止更新。
    protected willUpdate(_changedProperties: PropertyValues) {

    }

    // 执行时机: 在组件的第一次更新周期完成，并且其模板内容首次渲染到DOM之后调用。
    // 参数: changedProperties: 一个 Map 对象，包含已更改的属性名称作为键和其旧值作为值。
    // 说明: 类似于 connectedCallback，但它确保了组件的DOM已经准备好。你可以在这里执行一些依赖于初始DOM结构的设置，例如获取元素引用、初始化第三方库等。
    protected firstUpdated(changedProperties: PropertyValues) {


        super.firstUpdated(changedProperties);
        const options = this.routerOptions;
        console.debug("firstUpdated routerOptions:", options)
        if (!options) {
            return;
        }
        /*导入路由模块*/
        if (options.preloadAll) {
            Object.values(options.routes).forEach((route) => {
                typeof route === "object" && route.load?.();
            })
        }

    }

    // 执行时机: 在每次组件更新周期完成，并且其模板内容已渲染到DOM之后调用。
    // 参数: changedProperties: 一个 Map 对象，包含已更改的属性名称作为键和其旧值作为值。
    // 说明: 允许你在组件更新后执行逻辑，例如在DOM更新后执行动画、发送分析事件或执行其他依赖于最新DOM状态的操作。
    protected update(changedProperties: PropertyValues) {
        super.update(changedProperties);
        const routerOptions = this.routerOptions || {routes: {}};
        if (routerOptions && routerOptions.initialLoad && !this._initialLoadDone) {
            return;
        }

        if (!changedProperties.has("route")) {
            if (this.lastChild && !this._currentLoadPromise) {
                this.updatePageEl(this.lastChild, changedProperties)
            }
            return
        }

        const route = this.route;
        const defaultPage = routerOptions.defaultPage;

        if (route && route.path === '' && defaultPage !== undefined) {
            const queryParams = window.location.search;
            navigate(`${route.prefix}/${defaultPage}${queryParams}`, {
                replace: true,
            }).catch(error => console.error(error));
        }
        let newPage = route ? extractPage(route.path, defaultPage || '') : 'not_found';
        let routeOptions = this.routerOptions.routes[newPage];

        while (typeof routeOptions === 'string') {
            newPage = routeOptions;
            routeOptions = routerOptions.routes[newPage];
        }

        if (routerOptions.beforeRender) {
            const result = routerOptions.beforeRender(newPage);
            if (result) {
                newPage = result;
                routeOptions = routerOptions.routes[newPage];
                while (typeof routeOptions === 'string') {
                    newPage = routeOptions;
                    routeOptions = routerOptions.routes[newPage];
                }
                if (route) {
                    navigate(`${route.prefix}/${result}${location.search}`, {
                        replace: true,
                    }).catch(error => console.error(error));
                }
            }
        }

        if (this._currentPage === newPage) {
            if (this.lastChild) {
                this.updatePageEl(this.lastChild, changedProperties);
            }
            return;
        }

        if (!routeOptions) {
            this._currentPage = '';
            if (this.lastChild) {
                this.removeChild(this.lastChild);
            }
            return;
        }

        this._currentPage = newPage;

        const loadParms = routeOptions.load ? routeOptions.load() : Promise.resolve();

        loadParms.catch((err) => {
            console.error("Error loading page", newPage, err);
            this.appendChild(this.createErrorScreen(`Error while loading page ${newPage}.`));
            return;
        })

        if (!routerOptions.showLoading) {
            this._createPanel(routerOptions, newPage, routeOptions as RouteOptions);
            return;
        }
    }

    protected createLoadingScreen() {
        import("./loading-screen");
        return document.createElement("loading-screen");
    }

    protected createErrorScreen(err: string) {
        import("./error-screen.ts");
        let errorEl = document.createElement("error-screen");
        errorEl.error = err;
        return errorEl;
    }


    protected async rebuild(): Promise<void> {
        const oldRoute = this.route;
        if (oldRoute === undefined) {
            return;
        }
        this.route = undefined;
        await this.updateComplete;
        if (typeof this.route === 'undefined') {
            this.route = oldRoute;
        }
    }

    protected updatePageEl(_el: any, _changedProperties?: PropertyValues) {
    }

    protected createElement(tag: string) {
        return document.createElement(tag);
    }

    private _createPanel(routerOptions: RouterOptions, page: string, routeOptions: RouteOptions) {
        if (this.lastChild) {
            this.removeChild(this.lastChild);
        }
        const panelEl = this.createElement(routeOptions.tag)
        this.updatePageEl(panelEl);
        // this.shadowRoot?.appendChild(panelEl);
        this.appendChild(panelEl);
        if (routerOptions.cacheAll || routeOptions.cache) {
            this._cache.set(page, page);
        }
    }
}


