import {customElement, property} from "lit/decorators.js";
import {LitElement, nothing} from "lit";
import type Thing from "@models/thing.ts";
import {dynamicElement} from "@/common/dynamic-element-directive.ts";

@customElement("more-info-content")
export class MoreInfoContent extends LitElement {
    @property({attribute: false}) thing!: Thing;

    @property({attribute: false}) public editMode?: boolean;


    override render() {
        let moreInfoType: string | undefined;

        const capability = this.thing.selectedCapability;
        if (!capability) {
            return nothing;
        }
        moreInfoType = `more-info-${capability}`;
        return dynamicElement(moreInfoType, {
            thing: this.thing,
            editMode: this.editMode,
        });
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "more-info-content": MoreInfoContent;
    }
}
