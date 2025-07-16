import {Api} from "models/api"
import {Extension} from "./views/extension"
import {App} from "./views/app.svelte"


declare global {
    interface Window {
        Extension: typeof Extension;
        API: Api;
        APP: App;
    }
}

// 将类挂载到 window（需先判断环境）
if (typeof window !== 'undefined') {
    window.Extension = Extension;
}

