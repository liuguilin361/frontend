import type {ThingCard} from "@/webthings/types.ts";
import type {ThingCardConfig} from "@/data/thing-card-config.ts";

const _create_element = <T extends keyof CreateElementConfigTypes>(tag: string, config: CreateElementConfigTypes[T]["config"]): CreateElementConfigTypes[T]['element'] => {
    const element = document.createElement(tag) as CreateElementConfigTypes[T]["element"];
    // @ts-ignore
    element.setConfig(config)
    return element;
}


export const createThingElement = <T extends keyof CreateElementConfigTypes>(tag: T, config: CreateElementConfigTypes[T]["config"]): CreateElementConfigTypes[T]["element"] => {
    return _create_element(tag, config);
}

// export interface LovelaceCardConfig {
//     index?: number;
//     view_index?: number;
//     view_layout?: any;
//     /** @deprecated Use `grid_options` instead */
//     layout_options?: LovelaceLayoutOptions;
//     grid_options?: LovelaceGridOptions;
//     type: string;
//     [key: string]: any;
//     visibility?: Condition[];
// }


// export const createCardElement = (config: LovelaceCardConfig) =>
//     createLovelaceElement(
//         "card",
//         config,
//         ALWAYS_LOADED_TYPES,
//         LAZY_LOAD_TYPES,
//         undefined,
//         undefined
//     );


// const ALWAYS_LOADED_TYPES = new Set([
//     "entity",
//     "entities",
//     "button",
//     "entity-button",
//     "glance",
//     "grid",
//     "section",
//     "light",
//     "sensor",
//     "thermostat",
//     "weather-forecast",
//     "tile",
//     "heading",
// ]);

interface CreateElementConfigTypes {
    card: {
        element: ThingCard;
        config: ThingCardConfig;
    }
}


// interface CreateElementConfigTypes {
//     card: {
//         config: LovelaceCardConfig;
//         element: LovelaceCard;
//         constructor: LovelaceCardConstructor;
//     };
//     badge: {
//         config: LovelaceBadgeConfig;
//         element: LovelaceBadge;
//         constructor: LovelaceBadgeConstructor;
//     };
//     element: {
//         config: LovelaceElementConfig;
//         element: LovelaceElement;
//         constructor: LovelaceElementConstructor;
//     };
//     row: {
//         config: LovelaceRowConfig;
//         element: LovelaceRow;
//         constructor: LovelaceRowConstructor;
//     };
//     "header-footer": {
//         config: LovelaceHeaderFooterConfig;
//         element: LovelaceHeaderFooter;
//         constructor: LovelaceHeaderFooterConstructor;
//     };
//     view: {
//         config: LovelaceViewConfig;
//         element: LovelaceViewElement;
//         constructor: unknown;
//     };
//     "card-feature": {
//         config: LovelaceCardFeatureConfig;
//         element: LovelaceCardFeature;
//         constructor: LovelaceCardFeatureConstructor;
//     };
//     section: {
//         config: LovelaceSectionConfig;
//         element: LovelaceSectionElement;
//         constructor: unknown;
//     };
//     "heading-badge": {
//         config: LovelaceHeadingBadgeConfig;
//         element: LovelaceHeadingBadge;
//         constructor: LovelaceHeadingBadgeConstructor;
//     };
// }


// const LAZY_LOAD_TYPES = {
//     "alarm-panel": () => import("../cards/hui-alarm-panel-card"),
//     area: () => import("../cards/hui-area-card"),
//     calendar: () => import("../cards/hui-calendar-card"),
//     conditional: () => import("../cards/hui-conditional-card"),
//     "empty-state": () => import("../cards/hui-empty-state-card"),
//     "energy-compare": () => import("../cards/energy/hui-energy-compare-card"),
//     "energy-carbon-consumed-gauge": () =>
//         import("../cards/energy/hui-energy-carbon-consumed-gauge-card"),
//     "energy-date-selection": () =>
//         import("../cards/energy/hui-energy-date-selection-card"),
//     "energy-devices-graph": () =>
//         import("../cards/energy/hui-energy-devices-graph-card"),
//     "energy-devices-detail-graph": () =>
//         import("../cards/energy/hui-energy-devices-detail-graph-card"),
//     "energy-distribution": () =>
//         import("../cards/energy/hui-energy-distribution-card"),
//     "energy-gas-graph": () => import("../cards/energy/hui-energy-gas-graph-card"),
//     "energy-water-graph": () =>
//         import("../cards/energy/hui-energy-water-graph-card"),
//     "energy-grid-neutrality-gauge": () =>
//         import("../cards/energy/hui-energy-grid-neutrality-gauge-card"),
//     "energy-solar-consumed-gauge": () =>
//         import("../cards/energy/hui-energy-solar-consumed-gauge-card"),
//     "energy-self-sufficiency-gauge": () =>
//         import("../cards/energy/hui-energy-self-sufficiency-gauge-card"),
//     "energy-solar-graph": () =>
//         import("../cards/energy/hui-energy-solar-graph-card"),
//     "energy-sources-table": () =>
//         import("../cards/energy/hui-energy-sources-table-card"),
//     "energy-usage-graph": () =>
//         import("../cards/energy/hui-energy-usage-graph-card"),
//     "energy-sankey": () => import("../cards/energy/hui-energy-sankey-card"),
//     "entity-filter": () => import("../cards/hui-entity-filter-card"),
//     error: () => import("../cards/hui-error-card"),
//     gauge: () => import("../cards/hui-gauge-card"),
//     "history-graph": () => import("../cards/hui-history-graph-card"),
//     "horizontal-stack": () => import("../cards/hui-horizontal-stack-card"),
//     humidifier: () => import("../cards/hui-humidifier-card"),
//     iframe: () => import("../cards/hui-iframe-card"),
//     logbook: () => import("../cards/hui-logbook-card"),
//     map: () => import("../cards/hui-map-card"),
//     markdown: () => import("../cards/hui-markdown-card"),
//     clock: () => import("../cards/hui-clock-card"),
//     "media-control": () => import("../cards/hui-media-control-card"),
//     "picture-elements": () => import("../cards/hui-picture-elements-card"),
//     "picture-entity": () => import("../cards/hui-picture-entity-card"),
//     "picture-glance": () => import("../cards/hui-picture-glance-card"),
//     picture: () => import("../cards/hui-picture-card"),
//     "plant-status": () => import("../cards/hui-plant-status-card"),
//     "recovery-mode": () => import("../cards/hui-recovery-mode-card"),
//     "todo-list": () => import("../cards/hui-todo-list-card"),
//     "shopping-list": () => import("../cards/hui-shopping-list-card"),
//     starting: () => import("../cards/hui-starting-card"),
//     "statistics-graph": () => import("../cards/hui-statistics-graph-card"),
//     statistic: () => import("../cards/hui-statistic-card"),
//     "vertical-stack": () => import("../cards/hui-vertical-stack-card"),
// };
