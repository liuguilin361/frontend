import type { HTMLInputAttributes } from "svelte/elements";
import "@sjsf/form/fields/extra-widgets/range";
declare module "@sjsf/form" {
    interface UiOptions {
        range?: HTMLInputAttributes;
    }
}
declare const Range: import("svelte").Component<import("@sjsf/form/fields/widgets").WidgetCommonProps<number>, {}, "value">;
type Range = ReturnType<typeof Range>;
export default Range;
