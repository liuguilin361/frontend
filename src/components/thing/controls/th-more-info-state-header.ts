import {customElement, property} from "lit/decorators.js";
import {css, html, LitElement, type TemplateResult} from "lit";
import Thing from "models/thing.svelte.ts";

@customElement("th-more-info-state-header")
export class ThMoreInfoStateHeader extends LitElement {
    @property({attribute: false}) thing!: Thing;

    static override styles = css`
            p {
                text-align: center;
                margin: 0;
            }

            .state {
                font-style: normal;
                font-size: var(--th-font-size-md, 36px);
            }
        `


    override render(): TemplateResult {
        return html`
            <p class="state">${this.thing.state}</p>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "th-more-info-state-header": ThMoreInfoStateHeader;
    }
}
