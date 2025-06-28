import type { HTMLInputAttributes } from "svelte/elements";
declare module "@sjsf/form" {
    interface UiOptions {
        checkbox?: HTMLInputAttributes;
    }
}
declare const Checkbox: import("svelte").Component<import("@sjsf/form/fields/widgets").WidgetCommonProps<boolean>, {}, "value">;
type Checkbox = ReturnType<typeof Checkbox>;
export default Checkbox;
