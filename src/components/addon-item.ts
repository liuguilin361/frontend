import {customElement, property, state} from "lit/decorators.js";
import {css, html, LitElement, nothing} from "lit";
import "../components/th-card.ts";
import "../components/wt-svg-icon.ts";
import "@material/web/iconbutton/icon-button.js";
import "@material/web/button/outlined-button";
import "@material/web/switch/switch";
import "./wt-icon-button.ts";
import type {AddonManifest} from "../models/types";
import {ifDefined} from "lit/directives/if-defined.js";
import Api from "../models/api.ts";


type AddonStatus = "settings" | "remove";

@customElement("addon-item")
export class AddonItem extends LitElement {
    static override styles = css`
        :host[hidden] {
            visibility: hidden;
        }

        #card {
            display: flex;
            flex-direction: column;
            height: 208px;
            width: 400px;
        }

        .icon-warp {
            padding: 6px;
        }

        .card-content {
            overflow: auto;
            display: flex;
            flex-grow: 1;
            min-width: 0;
            padding: 16px 20px;
        }

        .content {
            margin-inline-start: 24px;
        }


        .button-strip {
            box-sizing: border-box;
            padding-top: 8px;
            padding-bottom: 8px;
            padding-inline-end: 20px;
        }


        .button {
            margin-inline-start: 8px;
        }

        .layout-horizontal-center {
            display: flex;
            flex: 1 1 0;
            flex-direction: row;
            align-items: center;
        }
    `;
    @property() addon?: AddonManifest;
    @property() errorMessage?: string;
    @state() status?: AddonStatus;
    @state() enabled: boolean = false;
    @state() addonId: string = "";

    public override connectedCallback(): void {
        super.connectedCallback();
        this.enabled = this.addon?.enabled ?? false;
        this.addonId = this.addon?.id || "";
    }

    _settings() {
        this.status = "settings";
        console.log("request:", !this.enabled);
        Api.setAddonSetting(this.addonId, !this.enabled).then((result) => {
            console.log("result:", result);
            this.enabled = !this.enabled;
            this.errorMessage = undefined;
        }).catch((err) => {
            this.enabled = this.enabled ?? false;
            this.errorMessage = err.message;
        })
        this.status = undefined;
    }

    _remove() {
        this.status = "remove";
        Api.uninstallAddon(this.addonId).then(() => {
            this.hidden = true;
        }).catch((err) => {
            this.errorMessage = err.message;
        })
        this.status = undefined;
    }

    protected override render() {
        if (!this.addon) {
            return nothing;
        }
        return html`
            <th-card id="card">
                <div class="card-content">
                    <div class="icon-warp">
                        <img height="36px" width="36px" src="/images/extension.svg" alt=${this.addon.primary_type}>
                    </div>
                    <div class="content">
                        <strong>${this.addon.name}</strong>
                        ${this.addon.description
                                ? html`
                                    <article>
                                        <span class="card-text">${this.addon.description}</span>
                                    </article>`
                                : nothing}
                        ${this.addon.id
                                ? html`
                                    <div>id:${this.addon.id}</div>`
                                : nothing}
                        ${this.addon.manifest_version
                                ? html`
                                    <div>
                                            version:${this.addon.manifest_version}
                                    </div>`
                                : nothing}
                        ${this.addon.author
                                ? html`<span>
                                    author:<a
                                        class="link"
                                        href=${ifDefined(this.addon.homepage_url)}
                                >${this.addon.author}</a>
                                </span>`
                                : nothing}
                        ${this.errorMessage
                                ? html`<p>${this.errorMessage}</p>`
                                : nothing}
                    </div>
                </div>
                <div class="button-strip card-actions layout-horizontal-center">
                    <div class="layout-horizontal-center">
                        <div class="delete-button button">
                            <md-outlined-button @click=${this._remove}>
                                delete
                            </md-outlined-button>
                        </div>

                        <div class="config-button button">
                            <md-outlined-button>
                                config
                            </md-outlined-button>
                        </div>
                    </div>
                    <md-switch @change=${this._settings} ?disabled=${!!this.status}
                               ?selected=${this.enabled}></md-switch>
                </div>
            </th-card>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "addon-item": AddonItem;
    }
}
