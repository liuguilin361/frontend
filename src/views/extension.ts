import App from "./app.svelte";

export class Extension {
    constructor(public id: string) {
        App.registerExtension(this);
    }

    addMenuEntry(name: string) {
        return App.addExtensionItem(this, name);
    }

}

// 将类挂载到 window（需先判断环境）
if (typeof window !== 'undefined') {
    window.Extension = Extension;
}
