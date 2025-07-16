import {css, type TemplateResult} from "lit";
import {LitElement, html} from "lit";
import {customElement, property} from "lit/decorators.js";




@customElement("th-tile-icon")
export class ThTileIcon extends LitElement {

    @property({type: Boolean, reflect: true})
    public interactive = true;


    override render(): TemplateResult {
        return html`
            <div class="container ${this.interactive ? "background" : ""}">
                <slot name="icon"></slot>
            </div>
            <slot></slot>
        `;
    }


    static override styles = css`
        :host([interactive]:active) {
            transform: scale(1.1);
        }

        :host([interactive]:hover) {
            cursor: pointer;
        }


        .container ::slotted([slot="icon"]) {
            display: flex;
            transition: color 180ms ease-in-out;
            color: var(--primary-color,red);
        }

        .container {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            border-radius: 18px;
            overflow: hidden;
            transition: box-shadow 180ms ease-in-out;
        }

        .container.rounded-square {
            border-radius: 8px;
        }

        .container.square {
            border-radius: 0;
        }

        
        .container.background::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            transition: background-color 180ms ease-in-out,
            opacity 180ms ease-in-out;
            background-color: var(--tile-icon-color,orange);
            opacity: 0.2;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "th-tile-icon": ThTileIcon;
    }


}
