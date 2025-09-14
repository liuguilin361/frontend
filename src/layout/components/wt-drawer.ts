import {customElement, property, state} from "lit/decorators.js";
import {css, html, LitElement, nothing} from "lit";
import {classMap} from "lit/directives/class-map.js";

@customElement("wt-drawer")
export class WtDrawer extends LitElement {
    static styles = css`
        :host {
            --wt-drawer-width: 256px;
            --wt-drawer-collapsed-width: 60px;
            --wt-drawer-corner: 0.75rem;
            --wt-drawer-z-index: 2200;
            --wt-drawer-scrim-bg: rgba(0, 0, 0, 0.5);
            --wt-drawer-transition-duration: 0.3s;
            display: flex;
            height: 100%;
            width: 100%;
            overflow: hidden;
        }

        .drawer {
            background-color: #fff;
            border-top-right-radius: var(--wt-drawer-corner);
            border-bottom-right-radius: var(--wt-drawer-corner);
            border-right: 1px solid rgba(0, 0, 0, 0.12);
            z-index: var(--wt-drawer-z-index);
            display: flex;
            flex-direction: column;
            flex-shrink: 0;
            box-sizing: border-box;
            height: 100%;
            transition: width var(--wt-drawer-transition-duration) cubic-bezier(0.4, 0, 0.2, 1),
            transform var(--wt-drawer-transition-duration) cubic-bezier(0.4, 0, 0.2, 1);
        }

        .drawer-content {
            flex: 1;
            overflow-y: auto;

        }


        :host([dir="rtl"]) .drawer {
            border-top-left-radius: var(--wt-drawer-corner);
            border-bottom-left-radius: var(--wt-drawer-corner);
        }

        :host([open][type=model]) .drawer-app-content {
            margin-left: var(--wt-drawer-width);
        }

        :host([open][dir="rtl"]) .drawer-app-content {
            margin-right: var(--wt-drawer-width);
            margin-left: 0;
        }

        :host([collapsed]) .drawer {
            width: var(--wt-drawer-collapsed-width);
        }

        :host([collapsed]) .drawer-title,
        :host([collapsed]) .menu-text {
            display: none;
        }

        :host([type="modal"]) .drawer {
            position: fixed;
            transform: translateX(-100%);
            box-shadow: 0 8px 10px -5px rgba(0, 0, 0, 0.2),
            0 16px 24px 2px rgba(0, 0, 0, 0.14),
            0 6px 30px 5px rgba(0, 0, 0, .12);
        }

        :host([type="modal"][open]) .drawer {
            transform: translateX(0);
        }

        :host([type="modal"][dir="rtl"]) .drawer {
            transform: translateX(100%);
        }

        :host([type="modal"][open][dir="rtl"]) .drawer {
            transform: translateX(0);
        }

        .drawer-scrim {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--wt-drawer-scrim-bg);
            z-index: calc(var(--wt-drawer-z-index) - 1);
            opacity: 0;
            transition: opacity var(--wt-drawer-transition-duration) cubic-bezier(0.4, 0, 0.2, 1);
        }

        :host([type="modal"][open]) .drawer-scrim {
            display: block;
            opacity: 1;
            pointer-events: auto;
        }

        .drawer-app-content {
            flex: 1;
            overflow: auto;
            transition: margin var(--wt-drawer-transition-duration) cubic-bezier(0.4, 0, 0.2, 1);
        }

        @media (max-width: 768px) {
            :host([type="dismissible"]) .drawer {
                position: fixed;
                transform: translateX(-100%);
            }

            :host([type="dismissible"][open]) .drawer {
                transform: translateX(0);
            }

            :host([type="dismissible"][dir="rtl"]) .drawer {
                transform: translateX(100%);
            }

            :host([type="dismissible"][open][dir="rtl"]) .drawer {
                transform: translateX(0);
            }

            :host([type="dismissible"][open]) .drawer-scrim {
                display: block;
                opacity: 1;
                pointer-events: auto;
            }

            :host([type="dismissible"]) .drawer-app-content {
                margin-left: 0;
                margin-right: 0;
            }
        }
    `;

    @property({type: Boolean, reflect: true}) open = false;
    @property({type: Boolean, reflect: true}) collapsed = false;
    @property({type: String, reflect: true}) type: 'dismissible' | 'modal' = "dismissible";
    @property({type: String, reflect: true}) dir: "ltr" | "rtl" = "ltr";
    @state() private isModal = false;

    constructor() {
        super();
        this._updateModalState();
        this.addEventListener("keydown", this._handleKeyDown);
        this.addEventListener("drawer-open", this._handleOpen.bind(this));
        this.addEventListener("drawer-close", this._handleClose.bind(this));
        window.addEventListener("resize", this._updateModalState.bind(this));
    }

    override disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener("keydown", this._handleKeyDown);
        this.removeEventListener("drawer-open", this._handleOpen.bind(this));
        this.removeEventListener("drawer-close", this._handleClose.bind(this));
        window.removeEventListener("resize", this._updateModalState.bind(this));
    }

    override render() {
        const classes = classMap({
            'drawer': true,
            'drawer--dismissible': this.type === 'dismissible',
            'drawer--modal': this.isModal || this.type === 'modal',
        });
        return html`
            <aside part="drawer" class=${classes} role="none">
                <div class="drawer-content">
                    <slot></slot>
                </div>
            </aside>
            ${(this.isModal || this.type === 'modal' || this.type === 'dismissible') ? html`
                <div part="scrim" class="drawer-scrim" @click=${this._handleScrimClick}></div>
            ` : nothing}
            <div part="content" class="drawer-app-content">
                <slot name="appContent"></slot>
            </div>
        `;
    }

    override firstUpdated() {
        if (this.open) {
            this._focusFirstItem();
        }
    }


    private _handleScrimClick() {
        if (this.open) {
            this.open = false;
            this.dispatchEvent(new CustomEvent("close", {bubbles: true, composed: true}));
        }
    }

    private _handleOpen() {
        console.log("open", this.open);
        this.open = true;
    }

    private _handleClose() {
        this.open = false;
    }

    private _handleKeyDown(event: KeyboardEvent) {
        if (event.key === "Escape" && this.open) {
            event.preventDefault();
            this.open = false;
            this.dispatchEvent(new CustomEvent("close", {bubbles: true, composed: true}));
        }
        if (event.key === "c") {
            event.preventDefault();
            this.collapsed = !this.collapsed;
            this.dispatchEvent(new CustomEvent(this.collapsed ? "collapse" : "expand", {
                bubbles: true,
                composed: true
            }));
        }

    }

    private _updateModalState() {
        this.isModal = this.type === 'modal' || window.innerWidth <= 768;
        this.open = false;
        this.requestUpdate();
    }

    private _focusFirstItem() {
        const firstItem = this.querySelector('wt-list-item');
        if (firstItem) {
            (firstItem as HTMLElement).focus();
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "wt-drawer": WtDrawer;
    }
}
