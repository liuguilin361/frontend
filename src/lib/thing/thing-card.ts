import {css, html, LitElement, nothing} from "lit";
import {customElement, property} from "lit/decorators.js";

@customElement("thing-card")
export class ThingCard extends LitElement {
    static override styles = css`
        :host {
            background: var(
                    --color-base-200 var(--color-base-100, white)
            );
            -webkit-backdrop-filter: var(--color-base-200, none);
            backdrop-filter: var(--color-base-200, none);
            box-shadow: var(--color-base-100, none);
            box-sizing: border-box;
            border-radius: var(--breakpoint-2xl, 12px);
            border-width: var(--breakpoint-sm, 1px);
            border-style: solid;
            border-color: var(--color-accent, var(--divider-color, #e0e0e0));
            color: var(--color-primary);
            display: block;
            transition: all 0.3s ease-out;
            position: relative;
        }

        :host([raised]) {
            border: none;
            box-shadow: var(
                    --ha-card-box-shadow,
                    0px 2px 1px -1px rgba(0, 0, 0, 0.2),
                    0px 1px 1px 0px rgba(0, 0, 0, 0.14),
                    0px 1px 3px 0px rgba(0, 0, 0, 0.12)
            );
        }

        .card-header,
        :host ::slotted(.card-header) {
            letter-spacing: -0.012em;
            line-height: var(--thing-line-height-expanded);
            padding: 12px 16px 16px;
            display: block;
            margin-block-start: 0px;
            margin-block-end: 0;
            font-weight: var(--thing-font-weight-normal);
        }

        :host ::slotted(.card-content:not(:first-child)),
        slot:not(:first-child)::slotted(.card-content) {
            padding-top: 0;
            margin-top: -8px;
        }

        :host ::slotted(.card-content) {
            padding: 16px;
        }

        :host ::slotted(.card-actions) {
            border-top: 1px solid var(--divider-color, #e8e8e8);
            padding: 5px 16px;
        }
    `;
    @property() public header?: string;
    @property({type: Boolean, reflect: true}) public raised = false;

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
        "thing-card": ThingCard;
    }
}
