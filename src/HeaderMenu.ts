import { LitElement, html, unsafeCSS } from "lit";
// @ts-ignore
import styles from './HeaderMenu.styles.css?inline';
import './HeaderMenu.css';
import { customElement, property } from "lit/decorators.js";
import HeaderMenuSection from "./HeaderMenuSection";

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
        this.handleWindowResize();
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
        if (evt.key === 'ArrowRight') {
            evt.preventDefault();
            this.closeAllExceptOneSections(null);
            this.gotoNextSection();
        }
        if (evt.key === 'ArrowLeft') {
            evt.preventDefault();
            this.closeAllExceptOneSections(null);
            this.gotoPreviousSection();
        }
    }

    handleNavigationSectionToggleClick(evt: CustomEvent) {
        this.closeAllExceptOneSections(evt.target);
    }

    gotoPreviousSection() {
        let newNode: Element | null = null;
        let activeElement = document.activeElement;
        if (activeElement != null) {
            if (activeElement.closest('li') && (activeElement.closest('li') as Element).previousElementSibling    ) {
                const previousSibling = (activeElement.closest('li') as Element).previousElementSibling;
                if (previousSibling && previousSibling.children.length > 0) {
                    newNode = previousSibling.children[0];
                }
            }
            if (newNode && newNode.tagName === 'ILW-HEADER-MENU-SECTION') {
                (newNode as HeaderMenuSection).setFocus(true);
            } else {
                (newNode as HTMLElement).focus();
            }
        }
    }

    gotoNextSection() {
        let newNode: Element | null = null;
        let activeElement = document.activeElement;
        if (activeElement != null) {
            if (activeElement.closest('li') && (activeElement.closest('li') as Element).nextElementSibling) {
                const nextSibling = (activeElement.closest('li') as Element).nextElementSibling;
                if (nextSibling && nextSibling.children.length > 0) {
                    newNode = nextSibling.children[0];
                }
            }
            if (newNode && newNode.tagName === 'ILW-HEADER-MENU-SECTION') {
                (newNode as HeaderMenuSection).setFocus();
            } else {
                (newNode as HTMLElement).focus();
            }
        }
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
        return html`
            <nav aria-label="Header Menu Navigation" @ilw-header-menu-section-expanded=${this.handleNavigationSectionToggleClick}>
                <div class="parent"><slot></slot></div>
            </nav>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "ilw-header-menu": HeaderMenu;
    }
}
