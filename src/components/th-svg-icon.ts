import type {SVGTemplateResult} from "lit";
import {css, LitElement, nothing, svg} from "lit";
import {customElement, property} from "lit/decorators.js";

@customElement("th-svg-icon")
export class ThSvgIcon extends LitElement {

    @property({reflect: true}) public path: string = "";

    @property({attribute: false}) public secondaryPath: string = "";


    @property({attribute: false}) public viewBox: string = "0 0 24 24";

    protected override render(): SVGTemplateResult {
        return svg`
            <svg       
                viewBox=${this.viewBox}
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
                role="img"
                aria-hidden="true"
            >
                <g>
                    ${
            this.path
                ? svg`<path class="primary-path" d=${this.path}></path>`
                : nothing
        }
                    ${
            this.secondaryPath
                ? svg`<path class="secondary-path" d=${this.secondaryPath}></path>`
                : nothing
        }
                </g>
            </svg>
        `;
    }

    static override styles = css`
        :host {
            display: inline-flex;
            position: relative;
            vertical-align: middle;
            width: var(--th-icon-width, 24px);
            height: var(--th-icon-height, 24px);
        }

        svg {
            pointer-events: none;
            fill: currentColor;
            display: block;
            width: 100%; /* Ensure SVG scales to host dimensions */
            height: 100%; /* Ensure SVG scales to host dimensions */
        }

        /*
         * Apply fill directly to the paths using CSS variables.
         * The 'color' property on :host will propagate to 'currentColor' in SVG.
         */

        path.primary-path {
            opacity: var(--th-icon-primary-opacity, 1);
        }

        path.secondary-path {
            opacity: var(--th-icon-secondary-opacity, 0.5);
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "th-svg-icon": ThSvgIcon;
    }
}
