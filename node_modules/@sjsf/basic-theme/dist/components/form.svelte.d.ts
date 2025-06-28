import type { HTMLFormAttributes } from "svelte/elements";
declare module "@sjsf/form" {
    interface UiOptions {
        form?: HTMLFormAttributes;
    }
}
declare const Form: import("svelte").Component<{
    config: import("@sjsf/form").Config;
    ref?: HTMLFormElement | undefined;
    children: import("svelte").Snippet;
    attributes?: HTMLFormAttributes | undefined;
}, {}, "ref">;
type Form = ReturnType<typeof Form>;
export default Form;
