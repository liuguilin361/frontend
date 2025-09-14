export const fireEvent = (node: HTMLElement | Window, type: string, detail?: any, options?: {
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
}) => {
    options = options || {};
    detail = detail || {};
    const event = new Event(type, {
        bubbles: options?.bubbles === undefined ? true : options.bubbles,
        cancelable: Boolean(options?.cancelable),
        composed: options?.composed === undefined ? true : options.composed
    });
    (event as any).detail = detail;
    node.dispatchEvent(event);
    return event;
}
