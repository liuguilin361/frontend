import {BaseStateIcons} from "data/icons.ts";
import {mdiLightbulb, mdiLightbulbOff, mdiLightbulbOn} from "@mdi/js";


export enum LightStatus {
    On = "on",
    Off = "off",
}


class LightIcons extends BaseStateIcons {

    constructor() {
        super({'on': mdiLightbulbOn, 'off': mdiLightbulb}, mdiLightbulb);
    }

    protected override getDynamicIcon(state: string): string | undefined {
        if (state.endsWith('%')) {
            return this.get("on")
        }
        if (state === 'disconnected') {
            return mdiLightbulbOff;
        }
        return undefined;
    }
}


export const lightIcons = new LightIcons();
