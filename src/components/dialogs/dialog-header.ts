import {customElement, property} from "lit/decorators.js";
import {css, html, LitElement} from "lit";

@customElement("dialog-header")
export class DialogHeader extends LitElement {
    static styles = css`
        .header-bar {
            display: flex;
            flex-direction: row;
            align-items: start;
            box-sizing: border-box;
            gap: 8px;
        }

        .header-action-items {
            display: flex;
            flex: 0 0 auto;
        }
    `;

    @property({type: Boolean}) disabled = false;

    protected override render() {
        return html`
            <header class="header">
                <div class="header-bar">
                    <section class="header-navigation-icon">
                        <slot name="navigationIcon"></slot>
                    </section>
                    <section class="header-content">
                        <div class="header-title">
                            <slot name="title"></slot>
                        </div>
                        <div class="header-subtitle">
                            <slot name="subtitle"></slot>
                        </div>
                    </section>
                    <section class="header-action-items">
                        <slot name="actionItems"></slot>
                    </section>
                </div>
                <slot></slot>
            </header>
        `;
    }


}

declare global {
    interface HTMLElementTagNameMap {
        "dialog-header": DialogHeader; // 全局声明中也保持一致
    }
}
