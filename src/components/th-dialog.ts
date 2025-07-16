import {css, type CSSResultGroup} from "lit";
import {customElement} from "lit/decorators.js";

import "@material/web/dialog/dialog.js";
import {MdDialog} from "@material/web/dialog/dialog"; // 确保 MdDialog 组件被注册

@customElement('th-dialog')
class ThDialog extends MdDialog { // 继承 LitElement，而不是 MdDialog

    styles(): CSSResultGroup {
        return [
            css``
        ]
    }

}

declare global {
    interface HTMLElementTagNameMap {
        'th-dialog': ThDialog;
    }
}
