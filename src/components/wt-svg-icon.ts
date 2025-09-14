import type {SVGTemplateResult} from "lit";
import {css, LitElement, nothing, svg} from "lit";
import {customElement, property} from "lit/decorators.js";

@customElement("wt-svg-icon")
export class WtSvgIcon extends LitElement {


    static override styles = css`
        :host {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            position: relative;
            vertical-align: middle;
            fill: var(--icon-primary-color, currentcolor);;
            width: var(--icon-size, 24px);
            height: var(-icon-size, 24px);
        }


        path.primary-path {
            opacity: var(--icon-primary-opactity, 1);
        }

        path.secondary-path {
            fill: var(--icon-secondary-color, currentcolor);
            opacity: var(--icon-secondary-opactity, 0.5);
        }

        svg {
            width: 100%;
            height: 100%;
            pointer-events: none;
            display: block;
        }
    `;


    @property() public path?: string;

    @property({attribute: false}) public secondaryPath?: string;

    @property({attribute: false}) public viewBox?: string;


    @property({type: String}) public label: string = "";

    // ... render 方法
    protected override render(): SVGTemplateResult {
        const role = this.label ? "img" : "presentation";
        const ariaHidden = this.label ? "false" : "true";
        return svg`
        <svg
                viewBox=${this.viewBox || "0 0 24 24"}
                focusable="false"
                role=${role}
                aria-hidden=${ariaHidden}
                aria-label=${this.label || nothing}
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
}

declare global {
    interface HTMLElementTagNameMap {
        "wt-svg-icon": WtSvgIcon;
    }
}
