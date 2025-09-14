import type {PropertyDescription, PropertyType} from "./types.ts";


export default class Property {
    value: any;
    name: string;
    '@type': PropertyType;
    type?: string;
    public minimum?: number;
    public maximum?: number;
    description: PropertyDescription;

    constructor(data: PropertyDescription) {
        this.description = data;
        this.value = data.value;
        this.name = data.name;
        this.type = data.type;
        this.minimum = data.minimum;
        this.maximum = data.maximum;
        this["@type"] = data["@type"] as PropertyType;
    }

    setValue(value: any) {
        this.value = value
    }
}
