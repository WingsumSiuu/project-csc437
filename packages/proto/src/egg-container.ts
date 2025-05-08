import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import reset from "./styles/reset.css.ts";
import tokens from "./styles/tokens.css.ts";
import page from "./styles/page.css.ts";
import { Egg } from "./models/schema.ts";

export class EggContainerElement extends LitElement {

    @property()
    src?: string;       // src should be eggdata.json

    // the egg data (schema in /models/schema.ts)
    @property({ type: Array }) eggs: Egg[] = [];

    override connectedCallback() {
        super.connectedCallback();
        if (this.src) this.hydrate(this.src);
    }

    override render() {
        return html`
            ${this.eggs.map((egg: Egg) => html`
                <div class="shop-box">
                    <img width="100px" src="${egg.imgsrc}" />
                    <div class="info">
                        <h3>${egg.eggname}</h3>
                        <hr>
                        <p>Cost: ${egg.cost}</p>
                        <hr>
                        <p>Bee Hatch Chances:</p>
                        <table class="table">
                            <tr>
                                <th>Rarity</th>
                                <th>Chance</th>
                            </tr>
                            <tr>
                                <td>Common</td>
                                <td>${egg.rarity[0]}%</td>
                            </tr>
                            <tr>
                                <td>Rare</td>
                                <td>${egg.rarity[1]}%</td>
                            </tr>
                            <tr>
                                <td>Epic</td>
                                <td>${egg.rarity[2]}%</td>
                            </tr>
                            <tr>
                                <td>Legendary</td>
                                <td>${egg.rarity[3]}%</td>
                            </tr>
                        </table>
                    </div>
                </div>
            `)}
    `;
    }

    static styles = [
        reset.styles,
        page.styles,
        tokens.styles,
        css``
    ];

    hydrate(src: string) {
        fetch(src)
            .then(res => res.json())
            .then((json: { eggs: Egg[] }) => {  // casting to Egg datatype
                if (json?.eggs) {
                    this.eggs = json.eggs;
                }
            })
            .catch(err => console.error("error getting egg data:", err));
    }

}