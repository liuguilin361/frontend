import type { HTMLInputAttributes } from "svelte/elements";
import "@sjsf/form/fields/extra-widgets/date-picker";
declare module "@sjsf/form" {
    interface UiOptions {
        datePicker?: HTMLInputAttributes;
    }
}
declare const DatePicker: import("svelte").Component<import("@sjsf/form/fields/widgets").WidgetCommonProps<string>, {}, "value">;
type DatePicker = ReturnType<typeof DatePicker>;
export default DatePicker;
