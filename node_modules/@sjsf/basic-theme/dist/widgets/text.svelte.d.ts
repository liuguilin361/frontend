import type { HTMLInputAttributes } from "svelte/elements";
declare module "@sjsf/form" {
    interface UiOptions {
        text?: HTMLInputAttributes;
    }
}
declare const Text: import("svelte").Component<import("@sjsf/form/fields/widgets").WidgetCommonProps<string>, {}, "value">;
type Text = ReturnType<typeof Text>;
export default Text;
