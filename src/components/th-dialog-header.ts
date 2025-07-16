import {customElement, property} from "lit/decorators.js";
import {css, html, LitElement} from "lit";


@customElement('th-dialog-header')
export class ThDialogHeader extends LitElement {

    @property({type: String, reflect: true})
    action = "closed";

    @property({type: Boolean, reflect: true, attribute: "show-border"})
    showBorder = true;

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

    static override styles = css`
        :host {
            display: block;
        }

        :host([show-border]) {
            border-bottom: 1px solid var(--th-dialog-header-border-color, rgba(0, 0, 0, 0.12));
        }

        .header-bar {
            display: flex;
            /* Use align-items: center for vertical alignment across all items */
            align-items: center; 
            padding: 4px;
            box-sizing: border-box;
            gap: 8px; /* Add a small gap between sections for better spacing */
        }

        .header-navigation-icon,
        .header-action-items {
            flex-shrink: 0; /* Prevent these sections from shrinking */
            /* Remove min-width and height: 100%, as align-items: center handles vertical alignment */
            display: flex;
            align-items: center; /* Ensure slot content is vertically centered */
            justify-content: center; /* Center content horizontally if needed */
        }
        
        /* Adjust padding for slots within these sections if they are icon-buttons */
        .header-navigation-icon ::slotted(*),
        .header-action-items ::slotted(*) {
            padding: 8px; /* Add padding to slotted elements like icon buttons */
            box-sizing: border-box;
        }


        .header-content {
            flex: 1; /* Allows this section to take up remaining space */
            padding: 10px 4px; /* Keep existing padding for content */
            min-width: 0; /* Allows content to shrink if needed */
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .header-title {
            font-size: var(--th-font-size-lg, 1.25rem); /* Added a fallback font size */
            margin-bottom: 2px; /* Small space between title and subtitle */
            line-height: 1.2; /* Improve vertical rhythm */
        }

        .header-subtitle {
            font-size: var(--th-font-size-md, 1rem); /* Added a fallback font size */
            opacity: 0.8; /* Make subtitle slightly less prominent */
            line-height: 1.2; /* Improve vertical rhythm */
        }

        /* Responsive padding for header-bar */
        @media all and (min-width: 450px) and (min-height: 500px) {
            .header-bar {
                padding: 12px;
            }
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        'th-dialog-header': ThDialogHeader;
    }
}
