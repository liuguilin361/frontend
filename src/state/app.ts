import type {Panels} from "../types.ts";
import {Extension} from "./extension.ts";
import {mdiStore} from "@mdi/js";


export class App {
    extensions: Record<string, Extension> = {};
    panelUrl: string = 'webthings';
    panels: Panels;

    constructor() {
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
            store: {
                component_name: 'store',
                config: {},
                url_path: "store",
                icon: mdiStore,
                title: 'Add-ons Store',
            }
        };
    }

    public registerExtension(extension: Extension) {
        this.extensions[extension.id] = extension;
    }

    addExtensionItem(_extension: Extension, _name: string) {

    }

    url(extension: Extension) {
        `/extensions/${extension.id}`;
    }
}


const app = new App();

export default app;












