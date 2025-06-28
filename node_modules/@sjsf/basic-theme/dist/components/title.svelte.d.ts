import type { HTMLAttributes } from "svelte/elements";
declare module "@sjsf/form" {
    interface UiOptions {
        /**
         * Overrides the attributes of the field title
         */
        titleAttributes?: HTMLAttributes<HTMLDivElement>;
    }
}
declare const Title: import("svelte").Component<import("@sjsf/form/fields/components").ComponentCommonProps & {
    type: import("@sjsf/form/templates/components").ParentTemplateType;
    title: string;
}, {}, "">;
type Title = ReturnType<typeof Title>;
export default Title;
