import type {WtElement} from "@/state/wt-element.ts";
import type {Constructor} from "@/types";
import type {PropertyValues} from "lit";


export default <T extends Constructor<WtElement>>(superClass: T) =>
    class extends superClass {
        protected firstUpdated(changedProps: PropertyValues) {
            super.firstUpdated(changedProps);

            // window.addEventListener("hass-quick-bar-trigger", (ev) => {
            //     switch (ev.detail.key) {
            //         case "e":
            //             this._showQuickBar(ev.detail);
            //             break;
            //         case "c":
            //             this._showQuickBar(ev.detail, QuickBarMode.Command);
            //             break;
            //         case "d":
            //             this._showQuickBar(ev.detail, QuickBarMode.Device);
            //             break;
            //         case "m":
            //             this._createMyLink(ev.detail);
            //             break;
            //         case "a":
            //             this._showVoiceCommandDialog(ev.detail);
            //             break;
            //         case "?":
            //             this._showShortcutDialog(ev.detail);
            //     }
            // });

            this._registerShortcut();
        }

        private _registerShortcut() {
            // tinykeys(window, {
            //     // Those are for latin keyboards that have e, c, m keys
            //     e: (ev) => this._showQuickBar(ev),
            //     c: (ev) => this._showQuickBar(ev, QuickBarMode.Command),
            //     m: (ev) => this._createMyLink(ev),
            //     a: (ev) => this._showVoiceCommandDialog(ev),
            //     d: (ev) => this._showQuickBar(ev, QuickBarMode.Device),
            //     // Workaround see https://github.com/jamiebuilds/tinykeys/issues/130
            //     "Shift+?": (ev) => this._showShortcutDialog(ev),
            //     // Those are fallbacks for non-latin keyboards that don't have e, c, m keys (qwerty-based shortcuts)
            //     KeyE: (ev) => this._showQuickBar(ev),
            //     KeyC: (ev) => this._showQuickBar(ev, QuickBarMode.Command),
            //     KeyM: (ev) => this._createMyLink(ev),
            //     KeyA: (ev) => this._showVoiceCommandDialog(ev),
            //     KeyD: (ev) => this._showQuickBar(ev, QuickBarMode.Device),
            // });
        }

    };
