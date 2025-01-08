import { LitElement, html, unsafeCSS } from "lit";
// @ts-ignore
import styles from './ilw-header-menu.styles.css?inline';
import './ilw-header-menu.css';
import { customElement, property } from "lit/decorators.js";

@customElement("ilw-header-menu")
export default class HeaderMenu extends LitElement {

    @property({ 
        type: Boolean,
        reflect: true
    })
    compact = false;

    @property({ 
        type: Number
    })
    width = 990;

    static get styles() {
        return unsafeCSS(styles);
    }

    constructor() {
        super();
        this.addEventListener('keydown', this.handleWindowKeydown.bind(this));
        this.handleWindowResize = this.handleWindowResize.bind(this);
        this.handleWindowClick = this.handleWindowClick.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('click', this.handleWindowClick.bind(this));
        window.addEventListener('resize', this.handleWindowResize);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('click', this.handleWindowClick.bind(this));
        window.removeEventListener('resize', this.handleWindowResize);
    }

    handleWindowClick(evt: MouseEvent) {
        if (!this.contains(evt.target as HTMLElement)) this.closeAllExceptOneSections(null);
    }
    
    handleWindowKeydown(evt: KeyboardEvent) {
        if (evt.key === 'Escape') this.closeAllExceptOneSections(null);
    }

    handleNavigationSectionToggleClick(evt: CustomEvent) {
        this.closeAllExceptOneSections(evt.target);
    }

    handleWindowResize() {
        if (this.offsetWidth < this.width) {
            if (!this.compact) this.compact = true;
        }
        else {
            if (this.compact) this.compact = false;
        }
    }

    getSections() {
        return this.querySelectorAll('ilw-header-menu-section');
    }

    closeAllExceptOneSections(target: EventTarget | null) {
        this.getSections().forEach(s => { if (target == null || target != s) { s.expanded = false; } });
    }

    render() {
        this.handleWindowResize();
        return html`
            <nav aria-label="Header Menu Navigation" @ilw-header-menu-section-expanded=${this.handleNavigationSectionToggleClick}>
                <slot></slot>
            </nav>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "ilw-header-menu": HeaderMenu;
    }
}
