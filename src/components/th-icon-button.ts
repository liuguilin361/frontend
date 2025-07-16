import { css, html, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import "@material/web/iconbutton/icon-button";
import "./th-svg-icon.ts";

@customElement("th-icon-button")
export class ThIconButton extends LitElement {
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String }) value?: string;
  @property({ type: String }) path?: string;
  @property({ type: String }) label?: string;
  @property({ type: Boolean, reflect: true }) hideTitle = true;
  @query(".button") private _button!: HTMLElement;

  public override focus(options?: FocusOptions) {
    this._button?.focus(options);
  }

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

  override render() {
    return html`
      <md-icon-button
        aria-label=${ifDefined(this.label)}
        .value=${ifDefined(this.value)}
        title=${ifDefined(this.hideTitle ? undefined : this.label)}
        .disabled=${this.disabled}
      >
        ${this.path
          ? html` <th-svg-icon path=${this.path}></th-svg-icon>`
          : html` <slot></slot>`}
      </md-icon-button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "th-icon-button": ThIconButton;
  }
}
