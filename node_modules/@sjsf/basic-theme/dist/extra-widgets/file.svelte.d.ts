import type { HTMLInputAttributes } from "svelte/elements";
import "@sjsf/form/fields/extra-widgets/file";
declare module "@sjsf/form" {
    interface UiOptions {
        file?: HTMLInputAttributes;
    }
}
declare const File: import("svelte").Component<import("@sjsf/form/fields/widgets").WidgetCommonProps<FileList> & {
    multiple: boolean;
    loading: boolean;
    processing: boolean;
}, {}, "value">;
type File = ReturnType<typeof File>;
export default File;
