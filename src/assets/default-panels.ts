import type {Panels} from "@/types.ts";
import {mdiStore} from "@mdi/js";


export const defaultPanels: Panels = {
    webthings: {
        component_name: 'webthings',
        config: null,
        url_path: "webthings",
        icon: null,
        title: 'Webthing',
    },
    addons: {
        component_name: 'addons',
        config: null,
        url_path: "addons",
        icon: null,
        title: 'Addons',
        config_panel_domain: "store",
    },
    store: {
        component_name: 'store',
        config: null,
        url_path: "store",
        icon: mdiStore,
        title: null,
    }
}
