import type { HTMLTextareaAttributes } from "svelte/elements";
import "@sjsf/form/fields/extra-widgets/textarea";
declare module "@sjsf/form" {
    interface UiOptions {
        textarea?: HTMLTextareaAttributes;
    }
}
declare const Textarea: import("svelte").Component<import("@sjsf/form/fields/widgets").WidgetCommonProps<string>, {}, "value">;
type Textarea = ReturnType<typeof Textarea>;
export default Textarea;
