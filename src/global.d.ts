import {Api} from "./models/api.ts"
import {Extension} from "./state/extension.ts"
import {App} from "./state/app.ts"


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

