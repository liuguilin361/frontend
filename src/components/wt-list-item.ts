import {customElement} from "lit/decorators.js";
import {ListItemEl} from "@material/web/list/internal/listitem/list-item";
import {styles} from "@material/web/list/internal/listitem/list-item-styles";
import {css} from "lit";

export const wtHdListStyles = [
    styles,
    css`
        :host {
            --ha-icon-display: block;
            --md-sys-color-primary: var(--primary-text-color);
            --md-sys-color-secondary: var(--secondary-text-color);
            --md-sys-color-surface: var(--card-background-color);
            --md-sys-color-on-surface: var(--primary-text-color);
            --md-sys-color-on-surface-variant: var(--secondary-text-color);
        }

        md-item {
            overflow: var(--md-item-overflow, hidden);
            align-items: var(--md-item-align-items, center);
            gap: var(--ha-md-list-item-gap, 16px);
        }
    `,
];

@customElement("wt-list-item")
export class WtListItem extends ListItemEl {
    static override styles = wtHdListStyles;
}

declare global {
    interface HTMLElementTagNameMap {
        "wt-list-item": WtListItem;
    }
}
