import type { HTMLAttributes } from "svelte/elements";
declare module "@sjsf/form" {
    interface UiOptions {
        /**
         * Overrides the attributes of the help.
         */
        helpAttributes?: HTMLAttributes<HTMLDivElement>;
    }
}
declare const Help: import("svelte").Component<import("@sjsf/form/fields/components").ComponentCommonProps & {
    help: string;
}, {}, "">;
type Help = ReturnType<typeof Help>;
export default Help;
