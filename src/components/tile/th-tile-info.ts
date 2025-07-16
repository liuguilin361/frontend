import {css, type TemplateResult} from "lit";
import {html, LitElement, nothing} from "lit";
import {customElement, property} from "lit/decorators.js";

@customElement("th-tile-info")
export class ThTileInfo extends LitElement {
    @property({type: String, reflect: true}) public primary?: string;
    @property({type: String, reflect: true}) public secondary?: string | TemplateResult<1>;
    static override styles = css`
        :host {
            --font-size-primary: 14px;
            --font-size-secondary: 12px;
            --text-color-primary: black;
            --text-color-secondary: gray;
        }

        .info {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            gap: 4px;
        }

        span {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            width: 100%;
        }

        .primary {
            font-size: var(--font-size-primary);
            font-weight: var(--text-sm);
            line-height: var(--text-sm);
            color: var(--text-color-primary);
        }

        .secondary {
            font-size: var(--font-size-secondary);
            font-weight: var(--text-xs);
            line-height: var(--text-xs);
            color: var(--text-color-secondary);
        }
    `;


    protected override render() {
        return html`
            <div class="info">
                <span class="primary">${this.primary}</span>
                ${this.secondary
                        ? html`<span class="secondary">${this.secondary}</span>`
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
