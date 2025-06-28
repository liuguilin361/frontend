import type {TemplateResult} from "lit";
import {LitElement, html} from "lit";
import {customElement, property} from "lit/decorators.js";

import {classMap} from "lit/directives/class-map.js";

export type TileIconImageStyle = "square" | "rounded-square" | "circle";

export const DEFAULT_TILE_ICON_BORDER_STYLE = "circle";

@customElement("thing-tile-icon")
export class ThingTileIcon extends LitElement {
    @property({type: Boolean, reflect: true})
    public interactive = false;

    @property({attribute: "border-style", type: String})
    public imageStyle?: TileIconImageStyle;

    @property({attribute: false})
    public imageUrl?: string;

    protected override render(): TemplateResult {
        if (this.imageUrl) {
            const imageStyle = this.imageStyle || DEFAULT_TILE_ICON_BORDER_STYLE;
            return html`
                <div class="container ${classMap({[imageStyle]: this.imageUrl})}">
                    <img alt="" src=${this.imageUrl}/>
                </div>
                <slot></slot>
            `;
        }

        return html`
            <div class="container ${this.interactive ? "background" : ""}">
                <slot name="icon"></slot>
            </div>
            <slot></slot>
        `;
    }


}

declare global {
    interface HTMLElementTagNameMap {
        "tile-icon": ThingTileIcon;
    }
}
