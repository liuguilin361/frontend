import {LitElement} from "lit";
import {property} from "lit/decorators.js";
import type {Gateway} from "@/types.ts";


export class WtBaseEl extends LitElement {

    @property({attribute: false}) gateway?: Gateway;

    protected _pendingGateway: Partial<Gateway> = {};

    protected _updateGateway(obj: Partial<Gateway>) {
        if (!this.gateway) {
            this._pendingGateway = {...this._pendingGateway, ...obj}
            return;
        }
        this.gateway = {...this.gateway, ...obj}
    }
}
