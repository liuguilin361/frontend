import Property from "./property.svelte.js";
import type {Capabilities, ThingDescription} from "models/types";
import {Things} from "models/things.svelte.js";
import {SvelteMap} from 'svelte/reactivity';
import {type StateIcons} from "data/icons.ts";
import Api from "models/api.ts";

type PropertyUpdateCallback = (propertyName: string, property: Property, thing: Thing) => void;

export default class Thing {
    public id: string = "";
    public on: boolean = $state(false);
    public name = $state<string>("");
    public state = $state<string>('');
    public group = $state<string | null>(null);
    public selectedCapability?: Capabilities = undefined;
    public href: string = "";
    public connected = $state<boolean>(false);
    public properties = new SvelteMap<string, Property>();
    public iconData: string = $state<string>("");
    public statusIconData: StateIcons;
    public power = "";
    public color = $state<string>("#778899");

    // Subscription mechanism
    private propertySubscriptions = new Map<string, Set<PropertyUpdateCallback>>();
    private allPropertiesSubscription = new Set<PropertyUpdateCallback>();

    constructor(public things: Things, public description: ThingDescription,iconData:StateIcons) {
        this.statusIconData = iconData;
        this.iconData = iconData.default;
        this.updateFromDescription(description);
    }

    updateFromDescription(description: ThingDescription) {
        this.name = description.name;
        this.selectedCapability = description.selectedCapability as Capabilities;
        this.id = description.id;
        this.href = description.href || `/things/${encodeURIComponent(description.id)}`;
        this.connected = description.connected;
        this.group = description.group;

        for (const key in description.properties) {
            const property = new Property(description.properties[key]);
            this.properties.set(key, property);
            // Notify subscribers about initial properties
            this.notifySubscribers(key, property);
        }
    }

    /**
     * Subscribe to updates for a specific property
     * @param propertyName Name of the property to subscribe to
     * @param callback Callback function to be called when property updates
     * @returns Unsubscribe function
     */
    subscribeToProperty(propertyName: string, callback: PropertyUpdateCallback): () => void {
        if (!this.propertySubscriptions.has(propertyName)) {
            this.propertySubscriptions.set(propertyName, new Set());
        }
        const subscriptions = this.propertySubscriptions.get(propertyName)!;
        subscriptions.add(callback);

        // Immediately call with current value if property exists
        const property = this.properties.get(propertyName);
        if (property) {
            callback(propertyName, property, this);
        }

        return () => subscriptions.delete(callback);
    }

    /**
     * Subscribe to updates for all properties
     * @param callback Callback function to be called when any property updates
     * @returns Unsubscribe function
     */
    subscribeToAllProperties(callback: PropertyUpdateCallback): () => void {
        this.allPropertiesSubscription.add(callback);

        // Immediately call with all current properties
        this.properties.forEach((property, propertyName) => {
            callback(propertyName, property, this);
        });

        return () => this.allPropertiesSubscription.delete(callback);
    }

    private notifySubscribers(propertyName: string, property: Property): void {
        // Notify specific property subscribers
        if (this.propertySubscriptions.has(propertyName)) {
            const callbacks = this.propertySubscriptions.get(propertyName)!;
            callbacks.forEach(callback => callback(propertyName, property, this));
        }

        // Notify all-properties subscribers
        this.allPropertiesSubscription.forEach(callback => {
            callback(propertyName, property, this);
        });
    }

    findProperty(prop: string) {
        for (const property of this.properties.values()) {
            if (property["@type"] === prop) {
                return property;
            }
        }
        return null;
    }

    onPropertyStatus(data: Record<string, any>): void {
        for (const key in data) {
            if (this.properties.has(key)) {
                const property = this.properties.get(key);
                if (property) {
                    property.setValue(data[key]);
                    this.notifySubscribers(key, property);
                }
            }
        }
        this.updateStatus();
    }

    updateStatus() {
        this.iconData = this.statusIconData.get(this.state);

    }

    onConnected(connected: boolean) {
        if (this.connected !== connected) {
            this.connected = connected;
            if (!this.connected) {
                this.state = "disconnected";
            }
        }
    }

    async setProperty(name: string, value: any): Promise<void> {
        if (!this.properties.has(name)) {
            return Promise.reject(new Error(`Unavailable property name ${name}`));
        }

        const property = this.properties.get(name);
        if (!property) {
            return Promise.reject(new Error(`Property ${name} not found`));
        }

        switch (property?.type) {
            case 'number':
                value = parseFloat(value);
                break;
            case 'integer':
                value = parseInt(value, 10);
                break;
            case 'boolean':
                value = Boolean(value);
                break;
            case 'string':
                value = String(value);
                break;
            default:
                return Promise.reject(new Error(`Unavailable or unsupported property type for '${name}': ${property?.type}`));
        }

        const href = `/things/${this.id}/properties/${property?.name}`;
        console.log("Set Property", href, "with value", value);

        try {
            await Api.putJsonWithEmptyResponse(href, value);
            // If the API call succeeds, update the property and notify subscribers
            property.setValue(value);
            this.notifySubscribers(name, property);
        } catch (error) {
            console.error("Failed to set property:", error);
            throw error;
        }
    }

    toggle() {
        this.properties.forEach(property => {
            if (property["@type"] === "OnOffProperty") {
                this.setProperty(property.name, !property.value).catch((error) => {
                    console.error(error);
                });
            }
        });
    }

    setOn(onOff: boolean) {
        this.things?.setProperty(this.id, "on", onOff);
    }
}
