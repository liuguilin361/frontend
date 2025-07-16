import {css, html, LitElement, nothing} from "lit";
import {customElement, property, query} from "lit/decorators.js";
import "$lib/components/th-dialog.ts"
import "$lib/components/th-dialog-header.ts"
import "$lib/components/th-icon-button.ts"
import {mdiClose} from "@mdi/js";
import type Thing from "models/thing.svelte.ts";
import 'components/dialogs/more-info/more-info-info.ts'


@customElement('th-more-info-dialog')
class ThMoreInfoDialog extends LitElement {
    @property({attribute: false}) public thing!: Thing;
    @property({type: Boolean, reflect: true}) public open = true;
    @property({type: Boolean, reflect: true}) public large = false;

    @query('th-dialog') private dialog!: HTMLElement & { show: () => void; close: (name?: string) => void; };


    private _close(name: string): void {
        this.dialog.close(name);
    }


    override render() {
        if(!this.thing) {
            return nothing;
        }

        return html`
            <th-dialog open=${this.open}>
                <th-dialog-header slot="headline">
                    <th-icon-button @click=${() => this._close("close")} slot="navigationIcon"
                                    path=${mdiClose}></th-icon-button>
                </th-dialog-header>
            </th-dialog>
        `
    }

    static override styles = css``

}


declare global {
    interface HTMLElementTagNameMap {
        'th-more-info-dialog': ThMoreInfoDialog;
    }
}
