import type { HTMLButtonAttributes } from "svelte/elements";
declare module "@sjsf/form" {
    interface UiOptions {
        submitButton?: HTMLButtonAttributes;
    }
}
declare const SubmitButton: import("svelte").Component<{
    config: import("@sjsf/form").Config;
    children: import("svelte").Snippet;
}, {}, "">;
type SubmitButton = ReturnType<typeof SubmitButton>;
export default SubmitButton;
