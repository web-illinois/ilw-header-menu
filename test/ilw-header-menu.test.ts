import { expect, test } from "vitest";
import { render } from "vitest-browser-lit";
import { html } from "lit";
import "../src/ilw-header-menu";

const content = html`
<ilw-header-menu>
    <ul>
        <li><ilw-header-menu-section id="current1">
            <span slot="label">Start Here</span>
            <ul>
            <li><a href="/getting_started/index.html">Getting Started</a></li>
            <li><a href="/create_page/index.html">Create a Page</a></li>
            <li><a href="/upgrade/index.html">Upgrade from V2</a></li>
            </ul>
        </ilw-header-menu-section></li>
        <li><ilw-header-menu-section id="current2" linked="true" current>
            <a slot="link" href="/philosophy/index.html">Information</a>
            <ul>
              <li><a href="/philosophy/index.html" aria-current="page">Philosophy</a></li>
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
        <li><ilw-header-menu-section id="current3">
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
    </ul>
</ilw-header-menu>
`;

test("renders slotted content", async () => {
    const screen = render(content);
    const element = screen.getByText("Start Here");
    await expect.element(element).toBeInTheDocument();
});