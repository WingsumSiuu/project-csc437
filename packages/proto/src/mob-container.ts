import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import reset from "./styles/reset.css.ts";
import tokens from "./styles/tokens.css.ts";
import page from "./styles/page.css.ts";


export class MobContainerElement extends LitElement {
    @property()
    health = "unknown";


    override render() {
        return html`
      <!-- paste your template here -->
      <div class="mob-box">
          <h3>spider (level 4)</h3>
          <hr>
          <img class="mob-img" src="/images/mobs/spider-mob.webp" alt="spider mob">
          <hr>
          <p>Mob Stats</p>
          <table class="table">
              <tr>
                  <td>Health</td>
                  <td>100</td>
              </tr>
              <tr>
                  <td>Damage</td>
                  <td>20</td>
              </tr>
              <tr>
                  <td>Honey Dropped</td>
                  <td>1000</td>
              </tr>
          </table>
      </div>
    `;
    }

    static styles = [
        reset.styles,
        page.styles,
        tokens.styles,
        css``
    ];
}