export interface DomEvent<T> extends Event {
    detail: T;
}


export const event = (
    node: HTMLElement | Window,
    type: string,
    detail?: any,
    options?: {
        bubbles?: boolean;
        cancelable?: boolean;
        composed?: boolean;
    }
) => {
    options = options || {};
    // @ts-ignore
    detail = detail === null || detail === undefined ? {} : detail;
    const event = new Event(type, {
        bubbles: options.bubbles === undefined ? true : options.bubbles,
        cancelable: Boolean(options.cancelable),
        composed: options.composed === undefined ? true : options.composed,
    });
    (event as any).detail = detail;
    node.dispatchEvent(event);
    return event;
};
