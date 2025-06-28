import type { HTMLAttributes } from "svelte/elements";
declare module "@sjsf/form" {
    interface UiOptions {
        /**
         * Overrides the attributes of the description.
         */
        descriptionAttributes?: HTMLAttributes<HTMLDivElement>;
    }
}
declare const Description: import("svelte").Component<import("@sjsf/form/fields/components").ComponentCommonProps & {
    type: import("@sjsf/form/templates/components").ParentTemplateType;
    description: string;
}, {}, "">;
type Description = ReturnType<typeof Description>;
export default Description;
