import {noChange} from "lit";
import type {ChildPart, DirectiveParameters, PartInfo} from "lit/directive.js";
import {Directive, directive, PartType} from "lit/directive.js";

export const dynamicElement = directive(
    class extends Directive {
        public _element?: HTMLElement;

        constructor(partInfo: PartInfo) {
            super(partInfo);
            if (partInfo.type !== PartType.CHILD) {
                throw new Error(
                    "dynamicElementDirective can only be used in content bindings"
                );
            }
        }

        override update(_part: ChildPart, [tag, properties]: DirectiveParameters<this>) {
            if (this._element && this._element.localName === tag) {
                if (properties) {
                    Object.entries(properties).forEach(([key, value]) => {
                        // @ts-ignore
                        this._element![key] = value;
                    });
                }
                return noChange;
            }
            return this.render(tag, properties);
        }

        render(tag: string, properties?: Record<string, any>): HTMLElement {
            this._element = document.createElement(tag);
            if (properties) {
                Object.entries(properties).forEach(([key, value]) => {
                    // @ts-ignore
                    this._element![key] = value;
                });
            }
            return this._element;
        }
    }
);
