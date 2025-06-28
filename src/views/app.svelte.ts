import type {MenuItem} from "components/types";
import {Extension} from "./extension";


export class App {
    extensions: Record<string, Extension> = {};
    mainItems = $state<Array<MenuItem>>([
        {
            "id": "home",
            "title": "Home",
            "icon": "/home.svg",
            "url": "/",
        },
        {
            "id": "automation",
            "title": "Automation",
            "icon": "/automation.svg",
            "url": "/automation",
        },
        {
            "id": "add-on",
            "title": "Add-On",
            "icon": "/extension.svg",
            "url": "/addon",
        }
    ]);
    extensionItems = $state<Array<MenuItem>>([]);
    development = $state<Array<MenuItem>>([
        {
            "id": "dashboard",
            "title": "Dashboard",
            "icon": "/dashboard.svg",
            "url": "/dashboard",
        },
        {
            "id": "new-thing",
            "title": "Add Thing",
            "icon": "/thing.svg",
            "url": "/new-thing",
        },
        {
            "id": "form",
            "title": "Form",
            "icon": "/form.svg",
            "url": "/addon/form",
        },
        {
            "id": "store",
            "title": "store",
            "icon": "/store.svg",
            "url": "/store",
        }
    ]);

    constructor() {
        console.log("app constructor");
    }


    public registerExtension(extension: Extension) {
        this.extensions[extension.id] = extension;
    }


    addExtensionItem(extension: Extension, name: string) {
        this.extensionItems.push({
            "title": name,
            "id": `extension-${extension.id}`,
            "url": `/extensions/${extension.id}`,
        })
    }

    url(extension: Extension) {
        `/extensions/${extension.id}`;
    }
}


const app = new App();

export default app;












