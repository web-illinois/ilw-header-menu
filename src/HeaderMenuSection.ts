import { LitElement, html, unsafeCSS } from "lit";
// @ts-ignore
import styles from './HeaderMenuSection.styles.css?inline';
import './HeaderMenuSection.css';
import { customElement, property } from "lit/decorators.js";

@customElement("ilw-header-menu-section")
export default class HeaderMenuSection extends LitElement {

    @property({ 
        type: Boolean
    })
    current = false;

    @property({ 
        type: Boolean
    })
    right = false;

    @property({ 
        type: Boolean
    })
    expanded = false;

    @property({
        type: Boolean
    })
    mouseover = false;

    @property({
        reflect: true,
        type: Boolean
    })
    linked = false;

    static get styles() {
        return unsafeCSS(styles);
    }

    constructor() {
        super();
        this.addEventListener('keydown', this.handleWindowKeydown.bind(this));
    }

    connectedCallback() {
        super.connectedCallback();
    }

    handleToggleClick(evt: Event) {
        this.expanded = !this.expanded;
        this.dispatchEvent(new CustomEvent('ilw-header-menu-section-expanded', {detail: !this.expanded, bubbles: true, composed: true}));
      }

    handleWindowKeydown(evt: KeyboardEvent) {
        if (evt.key === 'ArrowDown') {
            evt.stopPropagation();
            this.moveToNextItem();
            this.closeAllExceptOneSections(evt.target);
        }
        else if (evt.key === 'ArrowRight' || evt.key === 'ArrowLeft') {
            if (this.isOnAnchorInLinked() && evt.key === 'ArrowRight') {
                evt.stopPropagation();
                this.expanded = false;
                this.setFocus(true);
            } else if (this.isOnButtonInLinked() && evt.key === 'ArrowLeft') {
                evt.stopPropagation();
                this.expanded = false;
                this.setFocus();
            } else if (this.isOnButtonInLinked() && evt.key === 'ArrowRight') {
                this.expanded = false;
            } else if (this.isOnAnchorInLinked() && evt.key === 'ArrowLeft') {
                this.expanded = false;
            } else {
                this.expanded = false;
                this.setFocus();
            }
        }
        else if (evt.key === 'ArrowUp') {
            evt.stopPropagation();
            this.moveToPreviousItem();
            this.closeAllExceptOneSections(evt.target);
        }
        else if (evt.key === 'Escape') {
            if (this.expanded) {
                evt.stopPropagation();
                this.setFocus();
                this.expanded = false;
            }
        }
    }

    isEmbedded() {
        return this.parentElement && this.parentElement.closest('ilw-header-menu-section') != null;
    }

    isOnAnchorInLinked() {
        return this.linked && document.activeElement && document.activeElement.tagName === 'A';
    }

    isOnButtonInLinked() {
        return this.linked && document.activeElement && document.activeElement.tagName === 'ILW-HEADER-MENU-SECTION';
    }

    setFocus(useButton: Boolean = false) {
        let newNode: Element | null = null;
        if (this.linked && !useButton) {
            newNode = this.querySelector('a');
        }
        else if (this.shadowRoot) {
            newNode = this.shadowRoot.querySelector('a');
            if (newNode == null) {
                newNode = this.shadowRoot.querySelector('button');
            }
        }
        if (newNode != null) {
            (newNode as HTMLElement).focus();
        }
    }

    moveToNextItem() {
        let newNode: Element | null = null;
        if (!this.expanded && !this.isEmbedded()) {
            this.expanded = true;
        }
        let activeElement = document.activeElement;
        if (activeElement != null) {
            if (activeElement.tagName === 'ILW-HEADER-MENU-SECTION' && (!this.isEmbedded() || this.expanded)) {
                newNode = activeElement.querySelector('li');
                if (newNode != null) {
                    newNode = newNode.children[0];
                }
            } else {
                newNode = activeElement.closest('li');
                if (newNode != null) {
                    newNode = newNode.nextElementSibling;
                }
                if (newNode != null) {
                    newNode = newNode.children[0];
                }
            }
            if (newNode != null) {
                if (newNode.tagName === 'ILW-HEADER-MENU-SECTION') {
                    (newNode as HeaderMenuSection).setFocus();
                } else {
                    (newNode as HTMLElement).focus();
                }
            }
        }
    }

    moveToPreviousItem() {
        let newNode: Element | null = null;
        let activeElement = document.activeElement;
        if (activeElement != null) {
            if (activeElement.tagName === 'ILW-HEADER-MENU-SECTION' && (!this.isEmbedded() || this.expanded)) {
                newNode = activeElement.querySelector('li');
                if (newNode != null) {
                    newNode = newNode.children[0];
                }
            } else {
                newNode = activeElement.closest('li');
                if (newNode != null) {
                    newNode = newNode.previousElementSibling;
                }
                if (newNode != null) {
                    newNode = newNode.children[0];
                }
            }
            if (newNode != null) {
                if (newNode.tagName === 'ILW-HEADER-MENU-SECTION') {
                    (newNode as HeaderMenuSection).setFocus();
                } else {
                    (newNode as HTMLElement).focus();
                }
            }
        }
    }

    renderArrow() {
        return html`<svg class="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40.4 23.82" aria-hidden="true">
          <path id="chevron" d="m39.34,1.06c-1.41-1.41-3.7-1.41-5.12,0l-14.02,14.02L6.18,1.06C4.76-.35,2.47-.35,1.06,1.06s-1.41,3.7,0,5.12l16.58,16.58c1.41,1.41,3.7,1.41,5.12,0L39.34,6.18c1.41-1.41,1.41-3.7,0-5.12Z"/>
        </svg>`;
      }

      toggleMouseOver() {
        this.mouseover = !this.mouseover;
      }

      handleNavigationSectionToggleClick(evt: CustomEvent) {
        evt.stopPropagation();
        this.closeAllExceptOneSections(evt.target);
    }

    getSections() {
        return this.querySelectorAll('ilw-header-menu-section');
    }

    closeAllExceptOneSections(target: EventTarget | null) {
        this.getSections().forEach(s => { if (target == null || target != s) { s.expanded = false; } });
    }


    render() {
        this.current = this.current || (this.getAttribute('aria-current') != null && (this.getAttribute('aria-current') === 'page' || this.getAttribute('aria-current') === 'true'));
        var withLink = html`
            <div class="header-link ${this.mouseover ? "highlighted" : ""} ${this.current ? "current" : ""}" @mouseover="${this.toggleMouseOver.bind(this)}"  @mouseout="${this.toggleMouseOver.bind(this)}">
                <slot name="link"></slot>
                <button @click=${this.handleToggleClick.bind(this)} aria-expanded=${this.expanded ? 'true' : 'false'} aria-controls="items">
                    ${this.renderArrow()}
                </button>
            </div>
        `;

        var withoutLink = html`
            <button class="${this.current ? "current" : ""}" @click=${this.handleToggleClick.bind(this)} aria-expanded=${this.expanded ? 'true' : 'false'} aria-controls="items">
                <div class="header">
                    <div class="label"><slot name="label"></slot> </div>
                    <div class="icon">${this.renderArrow()}</div>
                </div>
            </button>
        `;

        return html`
            <div class="parent" @ilw-header-menu-section-expanded=${this.handleNavigationSectionToggleClick}>
                ${this.linked ? withLink : withoutLink}
                <div id="items" class="${this.expanded ? 'expanded' : ''} ${this.right ? 'right' : ''}">
                    <slot></slot>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "ilw-header-menu-section": HeaderMenuSection;
    }
}
