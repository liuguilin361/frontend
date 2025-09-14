export interface ThingCardConfig {
    index?: number;
    view_index?: number;
    view_layout?: any;
    type: string;

    // visibility?: Condition[];
    [key: string]: any;
}
