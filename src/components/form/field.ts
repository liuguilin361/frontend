import type {Config} from "@sjsf/form";

export type Fields = {
    id: string;
    title: string;
    description?: string;
    options: Array<any>;
    min?: number;
    max?: number;
    readOnly: boolean;
}


export function getField(config: Config): Fields {
    return {
        id: config.id,
        title: config.title,
        description: config.schema.description,
        options: config.schema.enum || [],
        min: config.schema.minimum,
        max: config.schema.maximum,
        readOnly: config.schema.readOnly || false,
    };
}
