import type {Panels, PanelState} from "@/types.ts";
import {mdiStore} from "@mdi/js";


class PanelStore implements PanelState {
    public panels: Panels = {};
    public defaultPanel: string = "webthings";
    public panelUrl = "webthings";

    constructor() {
        this.panels.webthings = {
            component_name: 'webthings',
            config: {},
            url_path: "webthings",
            icon: null,
            title: 'Webthing',
        };

        this.panels.addons = {
            component_name: 'addons',
            config: {},
            url_path: "addons",
            icon: null,
            title: 'Addons',
            config_panel_domain: "store",
        };

        this.panels.store = {
            component_name: 'store',
            config: {},
            url_path: "store",
            icon: mdiStore,
            title: null,
        }
    }
}


