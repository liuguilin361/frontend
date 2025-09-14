import App from "../state/app.ts";

export class Extension {
    id: string;

    constructor(id: string) {
        this.id = id;
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
