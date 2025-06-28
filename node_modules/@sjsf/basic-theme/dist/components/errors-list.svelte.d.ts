import type { HTMLAttributes } from "svelte/elements";
declare module "@sjsf/form" {
    interface UiOptions {
        /**
         * Overrides the attributes of the errors list.
         */
        errorsList?: HTMLAttributes<HTMLUListElement>;
    }
}
declare const ErrorsList: import("svelte").Component<import("@sjsf/form/fields/components").ComponentCommonProps, {}, "">;
type ErrorsList = ReturnType<typeof ErrorsList>;
export default ErrorsList;
