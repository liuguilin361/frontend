import type {Properties} from "./types.d.ts";

export interface PropertyDescription {
    name: string;
    "@type"?: string,
    type?: string,
    maximum?: number;
    minimum?: number;
    multipleOf?: number;
    readOnly?: boolean;
    description: string;
    enum: any[];
    forms: any[];
    unit?: string;
    value: any;

    [key: string]: any; // Replace with specific properties if known
}


export default class Property {
    value = $state<any>();
    name: string;
    '@type'?: Properties = undefined;
    type?: string;
    description: PropertyDescription;

    constructor(data: PropertyDescription) {
        this.description = data;
        this.value = data.value;
        this.name = data.name;
        this.type = data.type;
        this["@type"] = data["@type"] as Properties;
    }

    setValue(value: any) {
        this.value = value
    }
}
