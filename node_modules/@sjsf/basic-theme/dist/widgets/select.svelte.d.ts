import type { HTMLSelectAttributes } from "svelte/elements";
declare module "@sjsf/form" {
    interface UiOptions {
        select?: HTMLSelectAttributes;
    }
}
declare const Select: import("svelte").Component<import("@sjsf/form/fields/widgets").WidgetCommonProps<import("@sjsf/form").SchemaValue> & import("@sjsf/form/fields/widgets").Options, {}, "value">;
type Select = ReturnType<typeof Select>;
export default Select;
