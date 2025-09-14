import {customElement} from "lit/decorators.js";
import {List} from "@material/web/list/internal/list";
import {styles} from "@material/web/list/internal/list-styles";
import "@material/web/list/list";
import {css} from "lit";


@customElement("wt-list")
export class WtList extends List {
    static override styles = [
        styles,
        css`
            :host {
                --md-sys-color-surface: var(--card-background-color, white);
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "wt-list": WtList;
    }
}
