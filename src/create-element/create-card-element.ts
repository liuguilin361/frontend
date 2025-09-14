import type {ThingCardConfig} from "@/data/thing-card-config.ts";
import {createThingElement} from "@/create-element/create-element-base.ts";


export const createCardElement = (config: ThingCardConfig) => {
    return createThingElement('card', config);
}
