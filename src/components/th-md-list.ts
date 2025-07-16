import { List } from "@material/web/list/internal/list.js";
import { styles } from "@material/web/list/internal/list-styles.js";
import { css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("th-md-list")
export class ThMdList extends List {
    static override styles = [
        styles,
        css`
      :host {
        --md-sys-color-surface: var(--card-background-color);
      }
    `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "th-md-list": ThMdList;
    }
}
