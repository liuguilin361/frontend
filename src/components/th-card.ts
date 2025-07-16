import {css, html, LitElement, nothing} from "lit";
import {customElement, property} from "lit/decorators.js";


@customElement("th-card")
export class ThCard extends LitElement {
    @property() public header?: string;

    @property({type: Boolean, reflect: true}) public raised = true;


    static override styles = css`
        :host {
            display: block;
            box-sizing: border-box;
            /* Remove explicit border-style here if relying on shadow */
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Softer, more spread shadow */
            border-radius: var(--th-card-border-radius, 12px);
            border-width: var(--th-card-border-width, 1px);
            background: var(--th-card-background, white);
            color: var(--primary-text-color, black);
            transition: all 0.3s ease-out;
            position: relative;
        }

        :host([raised]) {
            border: none;
        }
        :host ::slotted{
            display: flex;
            flex-direction: column;
        }

        :host ::slotted(.card-content) {
            display: flex;
            flex-grow: 1;
            flex-direction: row;
        }

        :host ::slotted(.card-actions) {
            display: flex;
            border-top: 1px solid var(--th-card-border-color, #e8e8e8);
        }
    `;


    protected override render() {
        return html`
            ${this.header
                    ? html`<h1 class="card-header">${this.header}</h1>`
                    : nothing}
            <slot></slot>
        `;
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "th-card": ThCard;
    }
}
