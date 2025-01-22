# ilw-header-menu

Links: **[ilw-header-menu in Builder](https://builder3.toolkit.illinois.edu/component/ilw-header-menu/index.html)** | 
[Illinois Web Theme](https://webtheme.illinois.edu/) | 
[Toolkit Development](https://github.com/web-illinois/toolkit-management)

## Overview

This is the menu used in conjunction with the ilw-header. This is a separate component because we are envisioning more types of menus (like mega-menu and side menus). 

The ilw-header-menu should contain an unordered list. Each list item can contain one of three items:

* a simple link or button (`<a>` or `<button>`)
* an `<ilw-header-menu-section>` that contains a span and an unordered list of links. The span should be in the `label` slot. 
* an `<ilw-header-menu-section linked="true">` that contains an anchor and an unordered list of links. The anchor should be in the `link` slot. 

### Attributes

* `width`: the numeric pixel width where it will change to the hamburger menu. This is defaulted to 990, but may be changed if you have a ridiculous menu. 
* `compact`: a boolean value that will force the menu to be a hamburger menu. Before using this option, see *Accessibility Notes and Use* for more information.

### Stacking

You can put a `<ilw-header-menu-section>` inside another. This allows you to nest menus inside others. We recommend not stacking menus within other menus  to minimize confusion. 

### right attribute

The `<ilw-header-menu-section>` may have a `right` attribute. This will right-align the menu so it doesn't float off the right-hand side of the page. 

## Code Examples

```html
<ilw-header-menu>
    <ul>
        <li><ilw-header-menu-section>
            <span slot="label">Start Here</span>
            <ul>
            <li><a href="/getting_started/index.html">Getting Started</a></li>
            <li><a href="/create_page/index.html">Create a Page</a></li>
            <li><a href="/upgrade/index.html">Upgrade from V2</a></li>
            </ul>
        </ilw-header-menu-section></li>
        <li><ilw-header-menu-section linked="true">
            <a slot="link" href="/philosophy/index.html">Information</a>
            <ul>
              <li><a href="/philosophy/index.html">Philosophy</a></li>
              <li><a href="/links/index.html">Helpful Links</a></li>
              <li><a href="/github/index.html">Organization and Github</a></li>
              <li> <ilw-header-menu-section>
                <span slot="label">Smithsonite</span>
                <ul>
                  <li><a href="#">Amphibole</a></li>
                  <li><a href="#">Pyroxene</a></li>
                  <li><a href="#">Feldspar</a></li>
                </ul>
              </ilw-header-menu-section></li>
              <li><ilw-header-menu-section linked="true">
                <a slot="link" href="#">Garnet</a>
                <ul>
                  <li><a href="#">Gneiss</a></li>
                  <li><a href="#">Peridotite</a></li>
                  <li><a href="#">Syenite</a></li>
                  <li><a href="#">Porphyry</a></li>
                </ul>
              </ilw-header-menu-section></li>
            </ul>
        </ilw-header-menu-section></li>
        <li><ilw-header-menu-section>
          <span slot="label">Testing Slots</span>
          <ul>
            <li> <ilw-header-menu-section>
              <span slot="label">Smithsonite</span>
              <ul>
                <li><a href="#">Amphibole</a></li>
                <li><a href="#">Pyroxene</a></li>
                <li><a href="#">Feldspar</a></li>
              </ul>
            </ilw-header-menu-section></li>
            <li> <ilw-header-menu-section>
              <span slot="label">Smithsonite</span>
              <ul>
                <li><a href="#">Amphibole</a></li>
                <li><a href="#">Pyroxene</a></li>
                <li><a href="#">Feldspar</a></li>
              </ul>
            </ilw-header-menu-section></li>
            <li> <ilw-header-menu-section>
              <span slot="label">Smithsonite</span>
              <ul>
                <li><a href="#">Amphibole</a></li>
                <li><a href="#">Pyroxene</a></li>
                <li><a href="#">Feldspar</a></li>
              </ul>
            </ilw-header-menu-section></li>
            <li> <ilw-header-menu-section>
              <span slot="label">Smithsonite</span>
              <ul>
                <li><a href="#">Amphibole</a></li>
                <li><a href="#">Pyroxene</a></li>
                <li><a href="#">Feldspar</a></li>
              </ul>
            </ilw-header-menu-section></li>
            <li> <ilw-header-menu-section>
              <span slot="label">Smithsonite</span>
              <ul>
                <li><a href="#">Amphibole</a></li>
                <li><a href="#">Pyroxene</a></li>
                <li><a href="#">Feldspar</a></li>
              </ul>
            </ilw-header-menu-section></li>
            <li> <ilw-header-menu-section>
              <span slot="label">Smithsonite</span>
              <ul>
                <li><a href="#">Amphibole</a></li>
                <li><a href="#">Pyroxene</a></li>
                <li><a href="#">Feldspar</a></li>
              </ul>
            </ilw-header-menu-section></li>
          </ul>
      </ilw-header-menu-section></li>
      <li><a href="/demo/index.html" id="current3">Demo Pages</a></li>
        <li><a href="/components_toc/index.html">Components</a></li>
        <li><a href="/preview/index.html">Component Preview</a></li>
        <li><ilw-header-menu-section right>
            <span slot="label">Six</span>
            <ul>
              <li><a href="/philosophy/index.html">Philosophy</a></li>
              <li><a href="/links/index.html">Helpful Links</a></li>
              <li><a href="/github/index.html">Organization and Github</a></li>
            </ul>
        </ilw-header-menu-section></li>
    </ul>
</ilw-header-menu>
```

## Accessibility Notes and Use

In a future revision, we will make the keyboard more intuitive. Right now, the Escape key exits the menu, and the arrow keys move across the top level and go into the menu. The tab keys are still active and function as normal. 

When creating menus, do not include all your links inside the menu. Just focus on the high-level links, and rely on breadcrumbs and side menus for internal links. Having a large menu system reduces usability. 

While it is tempting to hide your menu with the hamburger menu option, only do this if you have no other option. Hamburger menus harm usability because it hides the top-level categories and reduces the ability for users to browse to find what they want, especially for new users. 

## External References

* https://www.nngroup.com/articles/hamburger-menus/
* https://www.nngroup.com/articles/killing-global-navigation-one-trend-avoid/