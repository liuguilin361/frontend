import type {WtBaseEl} from "@/state/wt-base-mixin.ts";
import type {Constructor, Gateway} from '@/types.ts';
import type {PropertyValues} from "lit";
import type {DomEvent} from "@/common/event.ts";

interface DefaultPanelParams {
    defaultPanel: Gateway['defaultPanel'];
}

declare global {
    interface HTMLElementEventMap {
        'default-panel': DomEvent<DefaultPanelParams>
    }
}


export default <T extends Constructor<WtBaseEl>>(superClass: T) =>
    class extends superClass {
        protected firstUpdated(changedProperties: PropertyValues) {
            super.firstUpdated(changedProperties);
            this.addEventListener("default-panel", (ev) => {
                this._updateGateway({defaultPanel: ev.detail.defaultPanel});
            });
        }
    }

