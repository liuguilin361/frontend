import type { HTMLSelectAttributes } from "svelte/elements";
import "@sjsf/form/fields/extra-widgets/multi-select";
declare module "@sjsf/form" {
    interface UiOptions {
        multiSelect?: HTMLSelectAttributes;
    }
}
declare const MultiSelect: import("svelte").Component<import("@sjsf/form/fields/widgets").WidgetCommonProps<import("@sjsf/form/core").SchemaArrayValue> & import("@sjsf/form/fields/widgets").Options, {}, "value">;
type MultiSelect = ReturnType<typeof MultiSelect>;
export default MultiSelect;
