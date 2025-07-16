import {css, html, LitElement, type TemplateResult} from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { customElement, property } from "lit/decorators.js";


export type TileIconImageStyle = "square" | "rounded-square" | "circle";

@customElement("th-icon")
export class ThIcon extends LitElement {
    // 因为现在 color 是应用在内部元素上，所以 :host 的静态样式不再需要设置 color 变量了
    // 如果你希望 thing-icon 本身也有颜色，可以保留 :host 的 color 样式
    static override styles = css`
        /* 示例：如果 thing-icon 自身需要宽度或高度 */
        :host {
            display: inline-block; /* 确保组件本身可以设置宽度和高度 */
        }
    `;
    @property()
    public icon?: string;
    @property()
    // 移除 color 属性的默认值。让它默认为 undefined。
    // 如果外部不设置 color，则 CSS 变量会回退到 currentColor。
    public color?: string;
    @property()
    public mode?: "svg" | "style" | "bg" | "mask" = "svg";
    @property()
    public inline?: boolean = false;
    @property()
    public width?: number = 24;
    @property()
    public height?: number=24;
    @property()
    public flip?: string;
    @property()
    public rotate?: number;

    protected override render():TemplateResult {
        // 创建一个样式对象
        // 只有当 this.color 有值时才应用 color 样式
        const iconStyles = {
            color: this.color || "#FF0000", // 如果 this.color 为 undefined/null/空字符串，则设置为空字符串，不应用 color 样式
        };
        return html`
            <iconify-icon
                style="${styleMap(iconStyles)}"
                icon="${this.icon}"
                width="${this.width}"
                height="${this.height}"
                rotate="${this.rotate}"
            ></iconify-icon>
            <slot></slot>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "th-icon": ThIcon;
    }
}
