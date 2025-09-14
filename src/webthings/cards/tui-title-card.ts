import {customElement, property, state} from "lit/decorators.js";
import {css, html, LitElement} from "lit";
import type {WebthingCard} from "@/webthings/types.ts";
import type {TileCardConfig} from "@/webthings/cards/types.ts";
import '@components/th-card.ts';
import '@components/tile/th-tile-icon.ts';
import type Thing from "@models/thing.ts";
import {ifDefined} from "lit/directives/if-defined.js";

@customElement("webthing-title-card")
export class TuiTitleCard extends LitElement implements WebthingCard {
    static override styles = css``;
    @property({attribute: false}) thing?: Thing | undefined;
    preview?: boolean | undefined;
    layout?: string | undefined;


    @state() private _config?: TileCardConfig;
    @state() private _hasCarrdAction?: true;

    get _hasIconAction() {
        return true
    }

    getCardSize(): number | Promise<number> {
        throw new Error("Method not implemented.");
    }

    setConfig(config: TileCardConfig) {
        this._config = {tap_action: {action: 'more-info'}, ...config};
    }

    protected override render() {
        const thing = this._config?.thing;
        return html`
            <th-card>
                <div class="background">
                </div>
                <div class="container">
                    <div class="content">
                        <th-tile-icon role=${ifDefined(this._hasIconAction ? "button" : undefined)}>
                        </th-tile-icon>
                    </div>
                </div>
            </th-card>
        `;
    }


}

declare global {
    interface HTMLElementTagNameMap {
        "webthing-title-card": TuiTitleCard; // 全局声明中也保持一致
    }
}
