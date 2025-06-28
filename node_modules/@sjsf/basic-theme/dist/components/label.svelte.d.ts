import type { HTMLLabelAttributes } from "svelte/elements";
declare module "@sjsf/form" {
    interface UiOptions {
        /**
         * Overrides the attributes of the field label.
         */
        labelAttributes?: HTMLLabelAttributes;
    }
}
declare const Label: import("svelte").Component<import("@sjsf/form/fields/components").ComponentCommonProps & {
    title: string;
}, {}, "">;
type Label = ReturnType<typeof Label>;
export default Label;
