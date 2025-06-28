import type { HTMLButtonAttributes } from "svelte/elements";
import type { ButtonType } from "@sjsf/form/fields/components";
declare module "@sjsf/form" {
    interface UiOptions {
        /**
         * Overrides the attributes of any button component.
         */
        button?: HTMLButtonAttributes;
        /**
         * Overrides the attributes of a button with a specific type.
         * This override takes precedence over the `button` override, but does not replace it.
         */
        buttons?: {
            [B in ButtonType]?: HTMLButtonAttributes;
        };
    }
}
declare const Button: import("svelte").Component<import("@sjsf/form/fields/components").ComponentCommonProps & {
    type: ButtonType;
    disabled: boolean;
    children: import("svelte").Snippet;
    onclick: () => void;
}, {}, "">;
type Button = ReturnType<typeof Button>;
export default Button;
