import type {Event} from "./types.ts";


export type Handler<T = any> = (state: T) => void | Promise<void>;

export default class Model {
    // Use a Set for handlers. It's more efficient for storing unique values.
    public handlers: Map<Event, Set<Handler>>;

    constructor() {
        this.handlers = new Map();
    }

    unsubscribe(event: Event, handler: Handler) {
        this.handlers.get(event)?.delete(handler);
    }

    subscribe(event: Event, handler: Handler) {
        if (!this.handlers.has(event)) {
            this.handlers.set(event, new Set());
        }
        this.handlers.get(event)?.add(handler);
    }

    async handleEvent(event: Event, state: any) {
        const eventHandlers = this.handlers.get(event);
        if (eventHandlers) {
            // Use Promise.all to run handlers concurrently, with individual error catching.
            const promises = Array.from(eventHandlers).map(handler =>
                Promise.resolve()
                    .then(() => handler(state))
                    .catch(e => console.error(`Error in handler for event:${event}`, e))
            );
            await Promise.all(promises);
        }
    }
}
