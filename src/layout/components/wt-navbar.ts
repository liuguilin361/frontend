import {customElement, property} from "lit/decorators.js";
import {css, html, LitElement} from "lit";

export const navBarStyle = css`
    :host {
        --shape-corner: var(--mdui-shape-corner-none);
        --z-index: 2000;
        position: sticky;
        top: 0; /* 确保 sticky 定位从页面顶部开始 */
        left: 0;
        display: flex;
        width: 100%;
        flex-direction: row; /* 横向排列子元素 */
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        border-bottom-left-radius: var(--shape-corner, 30px);
        border-bottom-right-radius: var(--shape-corner, 30px);
        z-index: var(--z-index, 0);
        transition: top var(--mdui-motion-duration-long2) var(--mdui-motion-easing-standard), height var(--mdui-motion-duration-long2) var(--mdui-motion-easing-standard), box-shadow var(--mdui-motion-duration-short4) var(--mdui-motion-easing-linear), background-color var(--mdui-motion-duration-short4) var(--mdui-motion-easing-linear);
        padding: .75rem .5rem;
        height: 4rem;
        background-color: var(--color-base-200, gray);
    }

    :host([scroll-target]:not([scroll-target=''])) {
        position: absolute
    }

    :host([scroll-behavior~=shrink]) {
        transition-duration: var(--mdui-motion-duration-short4)
    }

    :host([scrolling]) {
        background-color: rgb(var(--mdui-color-surface-container));
        box-shadow: var(--mdui-elevation-level2)
    }

    ::slotted(mdui-button-icon) {
        color: rgb(var(--mdui-color-on-surface-variant));
        font-size: 1.5rem
    }

    ::slotted(mdui-button-icon:first-child) {
        color: rgb(var(--mdui-color-on-surface))
    }

    ::slotted(mdui-avatar) {
        width: 1.875rem;
        height: 1.875rem;
        margin-top: .3125rem;
        margin-bottom: .3125rem
    }

    ::slotted(*) {
        flex-shrink: 0
    }

    ::slotted(:not(:last-child)) {
        margin-right: .5rem
    }

    :host([variant=medium]) {
        height: 7rem
    }

    :host([variant=large]) {
        height: 9.5rem
    }

    :host([hide]:not([hide=false i])) {
        transition-duration: var(--mdui-motion-duration-short4);
        top: -4.625rem
    }

    :host([hide][variant=medium]:not([hide=false i])) {
        top: -7.625rem
    }

    :host([hide][variant=large]:not([hide=false i])) {
        top: -10.125rem
    }

    :host([shrink][variant=large]:not([shrink=false i])), :host([shrink][variant=medium]:not([shrink=false i])) {
        transition-duration: var(--mdui-motion-duration-short4);
        height: 4rem
    }`;

@customElement("wt-navbar")
export class WtNavbar extends LitElement {
    static styles = [navBarStyle];

    @property({type: Boolean})
    hide = false;

    @property({reflect: true})
    variant: "small" | "medium" | "large" = "small";

    render() {
        return html`
            <slot name="nav-start"></slot>
            <slot></slot>
            <slot name="nav-end"></slot>`;
    }

}

declare global {
    interface HTMLElementTagNameMap {
        "wt-navbar": WtNavbar;
    }
}



