import type {Constructor} from "@/types.ts";
import {WtBaseEl} from "@/state/wt-base-mixin.ts";

const ext = <T extends Constructor>(baseClass: T, mixins: any): T =>
    mixins.reduceRight((base: any, mixin: any) => mixin(base), baseClass);

export class WtElement extends ext(WtBaseEl, []) {
}
