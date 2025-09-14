import {css, html, LitElement} from "lit";
import {customElement, property, query} from "lit/decorators.js";
import '@awesome.me/webawesome/dist/components/dialog/dialog.js';

@customElement('th-dialog')
class ThDialog extends LitElement {

    static styles = css``
    @property({type: Boolean, reflect: true}) open: boolean = false;
    @property({type: String, reflect: true}) label?: string;

    @query('#dialog')
    dialog?: HTMLDialogElement;

    render() {
        return html`
            <wa-dialog label=${this.label} ?open=${this.open}>
                <slot name="label"></slot>
                <slot name="header-actions"></slot>
                <slot name="footer"></slot>
                <slot></slot>
            </wa-dialog>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'th-dialog': ThDialog;
    }
}
