import type { HTMLInputAttributes } from "svelte/elements";
import "@sjsf/form/fields/extra-widgets/radio";
declare module "@sjsf/form" {
    interface UiOptions {
        radio?: HTMLInputAttributes;
    }
}
declare const Radio: import("svelte").Component<import("@sjsf/form/fields/widgets").WidgetCommonProps<import("@sjsf/form").SchemaValue> & import("@sjsf/form/fields/widgets").Options, {}, "value">;
type Radio = ReturnType<typeof Radio>;
export default Radio;
