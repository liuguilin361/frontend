import {css, html, LitElement} from "lit";
import {customElement, property} from "lit/decorators.js";
import "@components/th-dialog.ts"
import "@components/th-icon-button.ts"
import '@components/dialogs/more-info.ts'


@customElement('more-info-dialog')
class MoreInfoDialog extends LitElement {
    static override styles = css`
        .th-dialog {
            height: 200px;
            width: 200px;
            background: red;
        }
    `

    @property({type: Boolean, reflect: true}) public open = false;
    @property({type: String, reflect: true}) public label?: string;


    override render() {
        return html`
            <th-dialog label=${this.label} @wa-after-hide=${() => {
                this.dispatchEvent(new CustomEvent('close', {composed: true, bubbles: true}))
            }} class="th-dialog" ?open=${this.open}>
                <slot name="label"></slot>
                <slot name="header-actions"></slot>
                <slot name="footer"></slot>
                <slot></slot>
            </th-dialog>
        `
    }

}


declare global {
    interface HTMLElementTagNameMap {
        'more-info-dialog': MoreInfoDialog;
    }
}
