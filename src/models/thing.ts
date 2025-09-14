import type {Event, PropertyDescription, ThingDescription} from "./types";
import {Gateway} from "./gateway.ts";
import Api from "./api.ts";
import Model from "./model.ts";
import {Events} from "./constants.ts";
import type {Webthing} from '@/types.ts';


export default class Thing extends Model implements Webthing {
    public gateway: Gateway;
    public thingDescription: ThingDescription;
    public selectedCapability: string;

    // Core  Definitions
    public modified: Date;
    public created: Date;
    public base: string;
    public title: string;
    public '@context': string | string[];
    public id: string;
    public '@type': string | string[];
    public description: string;
    public propertyDescriptions = new Map<string, PropertyDescription>();

    //Common Status
    public connected = false;
    public properties: Record<string, any> = {};


    //Private data
    private propertiesByType = new Map<string, PropertyDescription>();
    private readonly propertiesHref: string;

    constructor(gateway: Gateway, description: ThingDescription) {
        super();

        // Core  Definitions
        this['@context'] = description["@context"];
        this['@type'] = description["@type"];
        this.id = description.id;
        this.title = description.title || description.name;
        this.description = description.description || '';
        this.modified = new Date();
        this.created = new Date();
        this.base = description.base || description.href || `/things/${encodeURIComponent(this.id)}`;

        // Thing status
        this.selectedCapability = description.selectedCapability;
        this.connected = description.connected;
        this.group = description.group;

        //Private data
        this.gateway = gateway;
        this.propertiesHref = `${this.base}/properties`;
        this.thingDescription = description;

        this.updateFromDescription(description);
    }

    private _group = '';

    get group(): string {
        return this._group;
    }

    set group(value: string) {
        this._group = value;
    }

    updateFromDescription(description: ThingDescription) {
        // Use Object.entries for safer iteration.
        Object.entries(description.properties).forEach(([key, propDesc]) => {
            this.properties[key] = propDesc.value;
            this.propertyDescriptions.set(key, propDesc);
            if (propDesc['@type']) {
                this.propertiesByType.set(propDesc['@type'], propDesc);
            }
        });
        this.handleEvent(Events.PROPERTY_STATUS, this.properties).catch(e => console.error(e));
    }

    subscribe(event: Event, handler: any) {
        super.subscribe(event, handler);
        switch (event) {
            case Events.PROPERTY_STATUS:
                handler(this.properties);
                break;
            case Events.CONNECTED:
                handler(this.connected);
                break;
        }
    }

    onPropertyStatus(data: Record<string, any>): void {
        const updatedProperties: Record<string, any> = {};
        Object.entries(data).forEach(([prop, value]) => {
            const property = this.properties.get(prop);
            if (property) {
                property.setValue(value);
                updatedProperties[prop] = value;
            }
        });

        if (Object.keys(updatedProperties).length > 0) {
            this.handleEvent(Events.PROPERTY_STATUS, updatedProperties).catch((e) => console.error(e));
        }
    }

    findProperty(type: string): PropertyDescription | undefined {
        return this.propertiesByType.get(type);
    }

    updateProperties() {
        Api.getJson<Record<string, any>>(this.propertiesHref).then((data) => {
            for (const prop in data) {
                if (this.propertyDescriptions.has(prop)) {
                    this.properties[prop] = data[prop];
                }
            }
        }).catch(e => console.error(e));
        this.handleEvent(Events.PROPERTY_STATUS, this.propertiesByType).catch((e) => console.error(e));
    };

    onConnected(connected: boolean) {
        this.connected = connected;
        if (connected) {
            this.updateProperties();
        }
        this.handleEvent(Events.CONNECTED, connected).catch((e) => console.error(e));
    }

    async setProperty(name: string, value: any): Promise<void> {
        if (!this.properties.has(name)) {
            return Promise.reject(new Error(`Unavailable property name ${name}`));
        }

        const property = this.propertyDescriptions.get(name);
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

        const href = `${this.propertiesHref}/${name}`;
        console.log("Set Property", href, "with value", value);

        try {
            await Api.putJsonWithEmptyResponse(href, value);
            property.setValue(value);
        } catch (error) {
            console.error("Failed to set property:", error);
            throw error;
        }
    }

    toggle() {
        this.propertyDescriptions.forEach(property => {
            if (property["@type"] === "OnOffProperty") {
                this.setProperty(property.name, !property.value).catch((error) => {
                    console.error(error);
                });
            }
        });
    }
}
