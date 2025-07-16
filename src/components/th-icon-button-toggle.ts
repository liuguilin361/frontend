import {customElement, property} from "lit/decorators.js";
import {css} from "lit";
import {ThIconButton} from "components/th-icon-button.ts";

@customElement("th-icon-button-toggle")
export class ThIconButtonToggle extends ThIconButton {

    @property({type: Boolean}) selected = false;

    static override styles = css`
        :host {
            --primary-background-color:var(--primary-color); 
        }
        :host([selected]) md-icon-button{
            color: var(--primary-background-color);
        }
    `;

}

declare global {
    interface HTMLElementTagNameMap {
        "th-icon-button-toggle": ThIconButtonToggle; // 全局声明中也保持一致
    }
}
