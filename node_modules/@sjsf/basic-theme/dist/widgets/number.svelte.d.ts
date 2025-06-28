import type { HTMLInputAttributes } from "svelte/elements";
declare module "@sjsf/form" {
    interface UiOptions {
        number?: HTMLInputAttributes;
    }
}
declare const Number: import("svelte").Component<import("@sjsf/form/fields/widgets").WidgetCommonProps<number>, {}, "value">;
type Number = ReturnType<typeof Number>;
export default Number;
