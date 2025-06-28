import Property from "./property.svelte.js";
import type {Capabilities, Properties, ThingDescription} from "models/types";
import {Things} from "models/things.svelte.js";
import {SvelteMap} from 'svelte/reactivity';



export default class Thing {
    public id: string = "";
    public on: boolean = $state(false);
    public title = $state<string>("");
    public status = $state<string>("disconnected");
    public group = $state<string|null>(null);
    public selectedCapability?: Capabilities = undefined;
    public href: string = "";
    public connected = $state<boolean>(false);
    public properties = new SvelteMap<string, Property>(); // 改为 Record

    constructor(public things: Things, public description: ThingDescription) {
        console.log("Received Things in Thing constructor:", things); // 调试
        this.updateFromDescription(description);
    }

    updateFromDescription(description: ThingDescription) {
        this.title = description.title;
        this.selectedCapability = description.selectedCapability as Capabilities;
        this.id = description.id;
        this.href = description.href || `/things/${encodeURIComponent(description.id)}`;
        this.connected = description.connected
        this.group = description.group;
        for (const key in description.properties) {
            this.properties.set(key, new Property(description.properties[key]));
        }
    }


    /**
     * Handles property status updates.
     * @param data Property values.
     */
    onPropertyStatus(data: Record<string, any>): void {
        for (const key in data) {
            if (this.properties.has(key)) {
                const property = this.properties.get(key);
                property?.setValue(data[key]);
                if (property) {
                    this.updateStatus(property);
                }
            }
        }
    }

    onConnected(connected: boolean) {
        if (this.connected !== connected) {
            this.connected = connected;
            if (!this.connected) {
                this.status = "disconnected";
            }
        }
    }

    /**
     * Handles thing status updates.
     * @param property Property.
     */
    updateStatus(property: Property): void {
        this.onConnected(true);
        if (typeof property["@type"] === "string") {
            let atType = property["@type"]! as Properties;
            if (atType === "OnOffProperty") {
                this.onOff(property.value);
            }
            if (atType === "BrightnessProperty") {
                this.onOff(true);
                this.status = `${property.value}%`
            }
        }
    }

    onOff(on: boolean) {
        this.on = on;
        if (this.on && this.status === "off") {
            this.status = "on"
        } else {
            this.status = "off"
        }
    }

    setOn(onOff: boolean) {
        this.things?.setProperty(this.id, "on", onOff)
    }

    /**
     * Checks if a property exists.
     * @param name Property name.
     * @returns True if the property exists.
     */
    hasProperty(name: string): boolean {
        return name in this.properties; // 改为 Record 检查
    }

}
