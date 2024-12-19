import { LitElement, html, unsafeCSS } from "lit";
// @ts-ignore
import styles from './ilw-header-menu.styles.css?inline';
import './ilw-header-menu.css';
import { customElement, property } from "lit/decorators.js";

@customElement("ilw-header-menu")
export default class HeaderMenu extends LitElement {

    @property()
    theme = "";

    static get styles() {
        return unsafeCSS(styles);
    }

    constructor() {
        super();
    }

    render() {
        return html`
            <div>
                <slot></slot>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "ilw-header-menu": HeaderMenu;
    }
}
