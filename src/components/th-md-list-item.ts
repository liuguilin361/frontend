import {css, LitElement, html} from "lit";
import {customElement,property} from "lit/decorators.js";


@customElement("th-md-list-item")
export class ThMdListItem extends LitElement {
    @property({type: Boolean,reflect:true})
    selected = false;


    static styles = css`
        :host {
            display: block;
            border-bottom: 1px solid #e0e0e0; /* 添加底部边框作为分隔线 */
        }
        .list-item {
            height: 45px;
            display: flex;
            align-items: center;
          
        }

        .list-item:hover {
            background-color: #f5f5f5; /* 更柔和的悬停颜色 */
            cursor: pointer;
        }
        
        :host([selected]) {
            background-color: #666666;
            font-weight: bold;
        }
        
        :host(:last-child) {
            border-bottom: none; /* 最后一个项目不需要底部边框 */
        }

        ::slotted([slot="start"]) {
            flex-shrink: 0;
            width: 50px;
        }

        ::slotted([slot="headline"]) {
            flex-grow: 1;
            min-width: 0;
        }
        :host([selected]) ::slotted([slot="headline"]) {
            color: white;
        }
        :host([selected]) ::slotted([slot="start"]) {
            color: white;
        }
    `

    render() {
        return html`
            <div class="list-item">
                <slot name="start"></slot>
                <slot name="headline"></slot>
            </div>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "th-md-list-item": ThMdListItem;
    }
}
