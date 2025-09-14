import type {ThingCardConfig} from "@/data/thing-card-config.ts";
import type {ActionConfig} from "@/data/action.ts";


export interface TileCardConfig extends ThingCardConfig {
    // entity: string;
    thing: string;
    name?: string;
    hide_state?: boolean;
    state_content?: string | string[];
    icon?: string;
    color?: string;
    show_entity_picture?: boolean;
    vertical?: boolean;
    tap_action?: ActionConfig;
    // hold_action?: ActionConfig;
    // double_tap_action?: ActionConfig;
    // icon_tap_action?: ActionConfig;
    // icon_hold_action?: ActionConfig;
    // icon_double_tap_action?: ActionConfig;
    // features?: LovelaceCardFeatureConfig[];
    // features_position?: LovelaceCardFeaturePosition;
}
