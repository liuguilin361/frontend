import Thing from "models/thing.svelte.js";
import type {GroupDescription, ThingDescription} from "./types";
import ReopeningWebSocket from "./reopening-web-socket";
import api from "./api";
import {SvelteMap} from "svelte/reactivity";
import {browser} from "$app/environment";

// Define message types for WebSocket
enum MessageType {
    Connected = "connected",
    ThingAdded = "thingAdded",
    ThingModified = "thingModified",
    GroupAdded = "groupAdded",
    GroupModified = "groupModified",
    GroupRemoved = "groupRemoved",
    LayoutModified = "layoutModified",
    PropertyStatus = "propertyStatus",
}

// Interface for WebSocket messages
interface WebSocketMessage {
    messageType: MessageType;
    id: string;
    data?: any;
}

export class Things {
    public things = new SvelteMap<string, Thing>();
    public groups = new SvelteMap<string, GroupDescription>();
    private ws: ReopeningWebSocket | null = null;
    private groupsWs: ReopeningWebSocket | null = null;
    private queue: Promise<void> = Promise.resolve();
    private descriptions: Map<string, ThingDescription> = new Map();
    private connectedThings = new Map<string, boolean>();

    constructor() {
        if (browser) {
            this.connectWebSocket();
        }
    }

    /**
     * Handles incoming WebSocket messages.
     */
    async onMessage(event: MessageEvent<string>): Promise<void> {
        console.log("websocket message =", event.data);
        try {
            const message: WebSocketMessage = JSON.parse(event.data);
            switch (message.messageType) {
                case MessageType.Connected:
                    this.handleConnected(message.id, message.data);
                    break;
                case MessageType.ThingAdded:
                    await this.refreshThings();
                    break;
                case MessageType.ThingModified:
                    await this.refreshThing(message.id);
                    break;
                case MessageType.PropertyStatus:
                    this.handlePropertyStatus(message.id, message.data);
                case MessageType.GroupAdded:
                case MessageType.GroupModified:
                case MessageType.GroupRemoved:
                case MessageType.LayoutModified:
                    // Handle these cases as needed
                    break;
                default:
                    console.warn(
                        `Unknown message type: ${message.messageType}`,
                    );
            }
        } catch (e) {
            this.logError("Failed to parse WebSocket message", e);
        }
    }

    /**
     * Handles 'connected' WebSocket message.
     */
    handleConnected(thingId: string, data: any): void {
        const thing = this.things.get(thingId);
        if (thing) {
            thing.onConnected(data as boolean);
        }
    }

    handlePropertyStatus(thingId: string, data: Record<string, any>): void {
        const thing = this.things.get(thingId);
        thing?.onPropertyStatus(data);
    }

    /**
     * Refreshes all things and groups from the API.
     */
    async refreshThings(): Promise<void> {
        console.log("refreshThings");
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
                this.logError("Failed to refresh things or groups", e);
            }
        });
    }

    // 添加 Thing 到 things Map
    public addThing(description: ThingDescription): void {
        if (!description.id) {
            console.error("无效的 ThingDescription：缺少 ID");
            return;
        }
        const thing = new Thing(this, description);
        this.things.set(description.id, thing);
        this.descriptions.set(description.id, description);
    }

    /**
     * Removes a thing and cleans up its resources.
     */
    handleRemove(thingId: string, skipEvent: boolean = false): void {
        const thing = this.things.get(thingId);
        if (thing) {
            this.things.delete(thingId);
        }
        this.descriptions.delete(thingId);
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
    handleRemoveGroup(groupId: string, skipEvent: boolean = false): void {
        this.groups.delete(groupId);
    }

    /**
     * Adds a job to the queue and ensures sequential execution.
     */
    async addQueue(job: () => Promise<void>): Promise<void> {
        this.queue = this.queue.then(async () => {
            await job();
        }).catch((e) => {
            this.logError("Queue job failed", e);
        });
        return this.queue;
    }

    /**
     * Gets the things map (reactive).
     */
    public getThings(): Map<string, Thing> {
        return this.things;
    }

    /**
     * Gets the groups map.
     */
    public getGroups(): Map<string, GroupDescription> {
        return this.groups;
    }

    /**
     * Gets the descriptions map.
     */
    public getDescriptions(): Map<string, ThingDescription> {
        return this.descriptions;
    }

    public setProperty(
        thingId: string,
        propertyName: string,
        value: any,
    ): void {
        let message = {
            id: thingId,
            messageType: "setProperty",
            data: {[propertyName]: value},
        };
        console.log("set property message=", message);
        const jsonString = JSON.stringify(message);
        this.ws?.send(jsonString);
    }

    /**
     * Centralized error logging.
     */
    logError(message: string, error: unknown): void {
        console.error(
            `${message}:`,
            error instanceof Error ? error.message : error,
        );
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
        // const origin = window.location.origin;
        // const wsHref = `${origin}/things/ws`.replace(/^http/, 'ws');
        const wsHref = `/api/things/ws`;
        // const groupsWsHref = `${origin}/groups/ws`.replace(/^http/, 'ws');
        const groupsWsHref = `/api/groups/ws`;

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
    private async refreshThing(thingId: string): Promise<void> {
        return this.addQueue(async () => {
            try {
                const description = await api.getThing<ThingDescription>(
                    thingId,
                );
                this.setThing(thingId, description);
            } catch (e) {
                this.logError(`Failed to refresh thing ${thingId}`, e);
            }
        });
    }

    /**
     * Updates or creates a thing model and its description.
     */
    private setThing(thingId: string, description: ThingDescription): void {
        if (this.things.has(thingId)) {
            this.things.get(thingId)?.updateFromDescription(description);
        } else {
            this.addThing(description);
        }
    }
}

// Create and export a singleton instance
const instance = new Things();

export default instance;
