import {
    getSimpleSchemaType,
    isFixedItems,
    type Validator,
} from "@sjsf/form/core";
import type {FormInternalContext, ResolveFieldType} from "@sjsf/form";


//返回的ResolveFieldType为Key，
// 这这个key到theme中去查找对应的field组件
export function resolver<V extends Validator>(
    internal: FormInternalContext<V>
): ResolveFieldType {
    // @ts-ignore
    return ({schema}) => {
        if (schema.oneOf !== undefined) {
            return "oneOfField";
        }
        if (schema.enum) {
            return "myEnumField";
        }
        if (schema.type === "string") {
            return "myStringField";
        }
        if (schema.type === "number") {
            return "myNumberField";
        }

        if (schema.anyOf !== undefined) {
            return "anyOfField";
        }

        const type = getSimpleSchemaType(schema);
        if (type === "array") {
            return isFixedItems(schema) ? "tupleField" : "arrayField";
        }
        return `${type}Field`;
    };
}
