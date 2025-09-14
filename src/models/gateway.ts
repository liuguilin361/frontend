import Thing from "./thing.ts";
import type {GroupDescription, ThingDescription} from "./types";
import ReopeningWebSocket from "./reopening-web-socket.ts";
import api from "./api.ts";
import type {MessageType} from "./message.ts";
import Model from "./model.ts";
import type {Event} from "./types.ts";
import {Events} from "./constants.ts";
import type {Gateway as GW, Panels} from "../types.ts";
import {mdiStore} from "@mdi/js";


// Interface for WebSocket messages
interface WebSocketMessage {
    messageType: MessageType;
    id: string;
    data?: any;
}

export class Gateway extends Model implements GW {
    public thingModels = new Map<string, Thing>();
    public groups = new Map<string, GroupDescription>();
    panels: Panels;
    panelUrl: string = 'webthings';

    private connectedThings = new Map<string, boolean>();
    private ws: ReopeningWebSocket | null = null;
    private groupsWs: ReopeningWebSocket | null = null;
    private queue: Promise<unknown> = Promise.resolve(true);
    private things: Map<string, ThingDescription> = new Map();

    constructor() {
        super();
        this.panels = {
            webthings: {
                component_name: 'webthings',
                config: {},
                url_path: "webthings",
                icon: null,
                title: 'Webthing',
            },
            addons: {
                component_name: 'addons',
                config: {},
                url_path: "addons",
                icon: null,
                title: 'Addons',
                config_panel_domain: "store",
            },
            "store": {
                component_name: 'store',
                config: {},
                url_path: "store",
                icon: mdiStore,
                title: null,
            }
        };
        this.onMessage = this.onMessage.bind(this);
        this.connectWebSocket();
    }

    get defaultPanel() {
        return this.panels['webthings'];
    }

    /**
     * Adds a job to the queue and ensures sequential execution.
     */
    async addQueue(job: () => Promise<void>): Promise<unknown> {
        this.queue = this.queue.then(async () => {
            await job();
        }).catch((e) => {
            console.error("Queue job failed", e);
        });
        return this.queue;
    }

    subscribe(event: Event, handler: any, immediate = false) {
        super.subscribe(event, handler);
        switch (event) {
            case Events.REFRESH_THINGS:
                if (immediate) {
                    handler(this.thingModels, this.groups);
                }
                break;
            case Events.DELETE_THINGS:
                break;
            case Events.DELETE_GROUPS:
                break;
            default:
                console.warn(`GatewayModel does not support event:${event}`);
                break;
        }
    }


    /**
     * Handles incoming WebSocket messages.
     */
    onMessage(event: MessageEvent<string>) {

        try {
            const message: WebSocketMessage = JSON.parse(JSON.parse(event.data));
            switch (message.messageType) {
                case 'connected':
                    this.handleConnected(message.id, message.data);
                    break;
                case 'thingAdded':
                    this.refreshThings().catch((e) => console.error(e));
                    break;
                case 'thingModified':
                    this.refreshThing(message.id).catch((e) => console.error(e));
                    break;
                case 'propertyStatus':
                    this.handlePropertyStatus(message.id, message.data);
                    break;
                case 'groupAdded':
                case 'groupModified':
                case 'groupRemoved':
                case 'layoutModified':
                    // Handle these cases as needed
                    break;
                default:
                    console.warn(
                        `Unknown message type: ${message.messageType}`,
                    );
            }
        } catch (e) {
            console.error("Failed to parse WebSocket message", e);
        }
    }

    /**
     * Handles 'connected' WebSocket message.
     */
    handleConnected(thingId: string, data: any): void {
        const thing = this.thingModels.get(thingId);
        if (thing) {
            thing.onConnected(data as boolean);
        }
    }

    handlePropertyStatus(thingId: string, data: Record<string, any>): void {
        const thing = this.thingModels.get(thingId);
        thing?.onPropertyStatus(data);
    }

    /**
     * Refreshes all things and groups from the API.
     */
    async refreshThings(): Promise<unknown> {

        return this.addQueue(async () => {
            try {
                // Fetch things
                const things = await api.getThings<ThingDescription>();
                const fetchedThingIds = new Set<string>();
                for (const key in things) {
                    let description = things[key];
                    const thingId = description.id;
                    // const thingId = decodeURIComponent(description.href.split('/').pop()!);
                    fetchedThingIds.add(thingId);
                    this.setThing(thingId, description);
                }
            } catch (e) {
                console.error("Failed to refresh things or groups", e);
            }
        });
    }

    public setThing(thingId: string, description: ThingDescription): void {
        if (this.thingModels.has(thingId)) {
            const thing = this.thingModels.get(thingId);
            thing?.updateFromDescription(description);
        } else {
            const thing = new Thing(this, description);
            thing.subscribe(Events.DELETE_THING, this.handleRemove.bind(this));
            if (this.connectedThings.has(thingId)) {
                thing.onConnected(this.connectedThings.get(thingId) || false)
            }
            this.thingModels.set(thingId, thing);
        }
        this.things.set(thingId, description);
    }

    /**
     * Removes a thing and cleans up its resources.
     */
    handleRemove(thingId: string, _skipEvent: boolean = false): void {
        const thing = this.thingModels.get(thingId);
        if (thing) {
            this.thingModels.delete(thingId);
        }
        this.things.delete(thingId);
    }

    /**
     * Updates a group description.
     */
    setGroup(groupId: string, description: GroupDescription): void {
        this.groups.set(groupId, description);
    }

    /**
     * Removes a group.
     */
    handleRemoveGroup(groupId: string, _skipEvent: boolean = false): void {
        this.groups.delete(groupId);
    }


    /**
     * Gets the things map (reactive).
     */
    public getThings(): Map<string, Thing> {
        return this.thingModels;
    }


    getThing(thingId: string) {
        if (this.things.has(thingId) && this.thingModels.has(thingId)) {
            return Promise.resolve(this.thingModels.get(thingId));
        }
        return this.refreshThing(thingId).then(() => {
            return this.thingModels.get(thingId);
        });
    }

    /**
     * Gets the groups map.
     */
    public getGroups(): Map<string, GroupDescription> {
        return this.groups;
    }


    /**
     * Cleans up WebSocket connections.
     */
    public cleanup(): void {
        this.ws?.closePermanently();
        this.groupsWs?.closePermanently();
        this.ws = null;
        this.groupsWs = null;
    }

    /**
     * Initializes WebSocket connections for things and groups.
     */
    private connectWebSocket(): void {
        const origin = window.location.origin;
        const wsHref = `${origin}/things/ws`.replace(/^http/, 'ws');
        // const groupsWsHref = `${origin}/groups/ws`.replace(/^http/, 'ws');
        // const groupsWsHref = `/api/groups/ws`;

        this.ws = new ReopeningWebSocket(wsHref);
        // this.groupsWs = new ReopeningWebSocket(groupsWsHref);

        // Bind event listeners
        this.ws.addEventListener("open", this.refreshThings.bind(this));
        this.ws.addEventListener("message", this.onMessage.bind(this));
        // this.groupsWs.addEventListener('open', this.refreshThings.bind(this));
        // this.groupsWs.addEventListener('message', this.onMessage.bind(this));
    }

    /**
     * Refreshes a single thing by ID.
     */
    private async refreshThing(thingId: string): Promise<unknown> {
        return this.addQueue(async () => {
            try {
                const description = await api.getThing<ThingDescription>(
                    thingId,
                );
                this.setThing(thingId, description);
            } catch (e) {
                console.error(`Failed to refresh thing ${thingId}`, e);
            }
        });
    }

}

// Create and export a singleton instance
const instance = new Gateway();

export default instance;
