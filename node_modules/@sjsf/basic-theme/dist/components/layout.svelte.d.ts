import type { HTMLAttributes } from "svelte/elements";
import type { LayoutType } from "@sjsf/form/fields/components";
declare module "@sjsf/form" {
    interface UiOptions {
        /**
         * Overrides the attributes of any layout component.
         */
        layout?: HTMLAttributes<HTMLDivElement>;
        /**
         * Overrides the attributes of a layout with a specific type.
         * This override takes precedence over the `layout` override, but does not replace it.
         */
        layouts?: {
            [L in LayoutType]?: HTMLAttributes<HTMLDivElement>;
        };
    }
}
declare const Layout: import("svelte").Component<import("@sjsf/form/fields/components").ComponentCommonProps & {
    type: LayoutType;
    children: import("svelte").Snippet;
}, {}, "">;
type Layout = ReturnType<typeof Layout>;
export default Layout;
