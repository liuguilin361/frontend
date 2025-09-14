import type {ThingCardConfig} from "@/data/thing-card-config.ts";
import type {Constructor, Webthing} from "@/types.ts";


// export interface LovelaceCard extends HTMLElement {
//     hass?: HomeAssistant;
//     preview?: boolean;
//     layout?: string;
//     connectedWhileHidden?: boolean;
//     getCardSize(): number | Promise<number>;
//     /** @deprecated Use `getGridOptions` instead */
//     getLayoutOptions?(): LovelaceLayoutOptions;
//     getGridOptions?(): LovelaceGridOptions;
//     setConfig(config: LovelaceCardConfig): void;
// }

export interface ThingCard extends HTMLElement {
    thing?: Webthing;
    preview?: boolean;
    layout?: string;
    connectedWhileHidden?: boolean;

    getCardSize(): number | Promise<number>;

    // getLayoutOptions?(): LovelaceLayoutOptions;
    //
    // getGridOptions?(): LovelaceGridOptions;

    setConfig(config: ThingCardConfig): void;
}

export interface WebthingCardConstructor extends Constructor<ThingCardConfig> {
    // getStubConfig?: (
    //     hass: HomeAssistant,
    //     entities: string[],
    //     entitiesFallback: string[]
    // ) => LovelaceCardConfig;
    // getConfigElement?: () => LovelaceCardEditor;
    // getConfigForm?: () => LovelaceConfigForm;
}
