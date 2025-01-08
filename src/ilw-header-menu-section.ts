import { LitElement, html, unsafeCSS } from "lit";
// @ts-ignore
import styles from './ilw-header-menu-section.styles.css?inline';
import './ilw-header-menu-section.css';
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
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('keydown', this.handleWindowKeydown.bind(this));
    }

    handleWindowKeydown(evt: KeyboardEvent) {
        if (evt.key === 'Escape') console.log('Escape key pressed');
    }

    handleToggleClick(evt: Event) {
        this.expanded = !this.expanded;
        this.dispatchEvent(new CustomEvent('ilw-header-menu-section-expanded', {detail: !this.expanded, bubbles: true, composed: true}));
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
        console.log(this.current);
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
