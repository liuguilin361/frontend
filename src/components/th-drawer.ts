import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import '@material/web/iconbutton/icon-button.js';
import '@material/web/list/list.js';
import '@material/web/list/list-item.js';
import '@material/web/labs/navigationdrawer/navigation-drawer';


@customElement("th-drawer")
export class ThDrawer extends LitElement {
    @property({type: Boolean})
    opened = true;

    @property({type: String})
    pivot: 'start' | 'end' = 'start';

    static override styles = css`
        :host {
            overflow: unset;
            display: flex;
            height: 100vh; /* 使侧边栏占据整个视口高度 */
        }
        
        ::slotted([slot="content"]) {
            width: 100vw;
            height: 100vh;
            display: flex;
        }
        ::slotted([slot="sidebar"]) {
 
        }
        .drawer {
            display: flex;
        }
    `;

    override render() {
        return html`
            <div class="drawer">
                <slot name="sidebar"></slot>
                <slot name="content"></slot>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'th-drawer': ThDrawer;
    }
}
