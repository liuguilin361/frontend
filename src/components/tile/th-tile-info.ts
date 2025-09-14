import {css, html, LitElement, nothing, type TemplateResult} from "lit";
import {customElement, property} from "lit/decorators.js";

@customElement("th-tile-info")
export class ThTileInfo extends LitElement {
    static override styles = css`
        :host {
            --font-size-primary: 14px;
            --font-size-secondary: 12px;
            --text-color-primary: black;
            --text-color-secondary: gray;
        }

        .info {
            display: flex;
            flex-direction: column;
            user-select: none;
        }

        .text-primary {
            font-size: 16px; /* 较大字号 */
            font-weight: 600; /* 中等加粗 */
            color: #333333; /* 深灰色 - 高对比度 */
            line-height: 1.6; /* 舒适行高 */
            letter-spacing: 0.5px; /* 轻微字间距提升可读性 */
            font-family: "Helvetica Neue", Arial, sans-serif; /* 现代字体栈 */
        }

        .text-secondary {
            font-size: 12px; /* 较小字号 */
            font-weight: 400; /* 正常字重 */
            color: #666666; /* 中灰色 - 较低对比度 */
            line-height: 1.5; /* 紧凑行高 */
            opacity: 0.9; /* 轻微透明效果 */
            font-family: inherit; /* 继承主字体 */
        }
    `;
    @property({type: String, reflect: true}) public primary?: string;
    @property({type: String, reflect: true}) public secondary?: string | TemplateResult<1>;

    protected override render() {
        return html`
            <div class="info">
                <span class="text-primary">${this.primary}</span>
                ${this.secondary
                        ? html`<span class="text-secondary">${this.secondary}</span>`
                        : nothing}
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "th-tile-info": ThTileInfo;
    }
}
