import {css, html, LitElement} from "lit";
import {customElement, property, query} from "lit/decorators.js";
import "@material/web/iconbutton/icon-button";
import {MdIconButton} from "@material/web/iconbutton/icon-button";
import "./wt-svg-icon.ts";

@customElement("wt-icon-button")
export class WtIconButton extends LitElement {

    static override shadowRootOptions: ShadowRootInit = {
        mode: "open",
        delegatesFocus: true,
    };

    static override styles = css`
        :host {
            display: inline-block;
            outline: none;
        }

        :host([disabled]) {
            pointer-events: none;
        }
    `;
    @property({type: Boolean, reflect: true}) disabled = false;
    @property({type: Boolean, reflect: true}) selected = false;
    @property({type: Boolean, reflect: true}) toggle = false;
    @property({type: String}) path?: string;
    @property({type: String, reflect: true}) href: string = "";
    @property({type: String, reflect: true}) target: string = "";
    @property({type: String, reflect: true}) type: "button" | "reset" | "submit" = "submit";
    @property({type: String, reflect: true}) value: string = "";

    @query("md-icon-button", true) private _button?: MdIconButton;

    public override focus(options?: FocusOptions) {
        this._button?.focus(options);
    }

    override render() {
        return html`
            <md-icon-button
                    href=${this.href}
                    target=${this.target}
                    type=${this.type}
                    value=${this.value}
                    ?disabled=${this.disabled}
                    ?selected=${this.selected}
                    ?toggle=${this.toggle}
            >
                ${this.path
                        ? html`
                            <wt-svg-icon path=${this.path}></wt-svg-icon>`
                        : html`
                            <slot></slot>`}
            </md-icon-button>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "wt-icon-button": WtIconButton;
    }
}
