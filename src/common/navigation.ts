import {event} from "@/common/event.ts";

export interface NavigateOptions {
    replace?: boolean;
    data?: any;
}

export const navigate = async (path: string, options?: NavigateOptions) => {
    const {history} = window;
    const replace = options?.replace || false;
    if (replace) {
        history.replaceState(history.state?.root ? {root: true} : (options?.data ?? null), `${window.location.pathname}#${path}`)
    } else {
        history.pushState(options?.data ?? null, "", path)
    }
    event(window, "location-changed", {
        replace,
    });
    return true;
}
