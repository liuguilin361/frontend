import Thing from "models/thing.svelte.ts";
import type {ThingDescription} from "models/types.d.ts";
import {Things} from "models/things.svelte.ts";
import {lightIcons, LightStatus} from "data/capability-light.ts";
import {PropertyEnum} from "models/constants.ts";


export class Light extends Thing {

    constructor(things: Things, description: ThingDescription) {
        super(things, description, lightIcons)
        this.updateFromDescription(description);
        for (const [key, value] of Object.entries(description.properties)) {
            if (value["@type"] == PropertyEnum.OnOffProperty) {
                this.power = key;
            }
        }
        this.updateStatus()
    }

    override updateStatus() {
        let on = this.findProperty(PropertyEnum.OnOffProperty);
        let brightness = this.properties.get(PropertyEnum.BrightnessProperty);
        let color = this.properties.get(PropertyEnum.ColorModeProperty);
        if (on) {
            this.state = on.value ? LightStatus.On : LightStatus.Off;
            if (color) {
                this.color = color.value;
            } else {
                this.color = on.value ? "#FF0000" : "#778899";
            }
        }
        if (on?.value && brightness) {
            this.state = `${brightness.value}%`;
        }
        super.updateStatus();
    }
}
