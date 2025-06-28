import type { HTMLInputAttributes } from "svelte/elements";
import "@sjsf/form/fields/extra-widgets/checkboxes";
declare module "@sjsf/form" {
    interface UiOptions {
        checkboxes?: HTMLInputAttributes;
    }
}
declare const Checkboxes: import("svelte").Component<import("@sjsf/form/fields/widgets").WidgetCommonProps<import("@sjsf/form/core").SchemaArrayValue> & import("@sjsf/form/fields/widgets").Options, {}, "value">;
type Checkboxes = ReturnType<typeof Checkboxes>;
export default Checkboxes;
