import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import reset from "./styles/reset.css.ts";
import tokens from "./styles/tokens.css.ts";
import page from "./styles/page.css.ts";
import { Bee } from "./models/schema.ts";

export class BeeContainerElement extends LitElement {

    @property()
    src?: string;       // src should be beedata.json

    // the bee data (schema in /models/schema.ts)
    @property({ type: Array }) common: Bee[] = [];
    @property({ type: Array }) rare: Bee[] = [];
    @property({ type: Array }) legendary: Bee[] = [];

    override connectedCallback() {
        super.connectedCallback();
        if (this.src) this.hydrate(this.src);
    }

    override render() {
        return html`
            <h3 class="title-text">Common Bees</h3>
            <div class="bee-container">
                ${this.renderBeeBox(this.common)}
            </div>
            <br>
            <hr>
            <h3 class="title-text">Rare Bees</h3>
            <div class="bee-container">
                ${this.renderBeeBox(this.rare)}
            </div>
            <br>
            <hr>
            <h3 class="title-text">Legendary Bees</h3>
            <div class="bee-container">
                ${this.renderBeeBox(this.legendary)}
            </div>
        `;
    }

    renderBeeBox(bees: Bee[]) {         // renders each bee box (filtered by rarity above)
        return bees.map((bee: Bee) => html`
            <div class="bee-box">
                <h3>${bee.beename}</h3>
                <p>${bee.desc}<hr>
                <img src=${bee.imgsrc}
                     alt="bee">
                <hr>
                <p>Token Ability: ${bee.ability}</p>
                <hr>
                <p>Bee Stats:</p>
                <table class="table">
                    <tr>
                        <td>Energy</td>
                        <td>${bee.stats[0]}</td>
                    </tr>
                    <tr>
                        <td>Attack</td>
                        <td>${bee.stats[1]}</td>
                    </tr>
                    <tr>
                        <td>Speed</td>
                        <td>${bee.stats[2]}</td>
                    </tr>
                    <tr>
                        <td>Pollen Collection Rate</td>
                        <td>${bee.stats[3]}</td>
                    </tr>
                </table>
            </div>
        `);
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
            .then((json: { bees: Bee[] }) => {  // casting to Egg data type
                if (json?.bees) {
                    // this.bees = json.bees;
                    this.common = json.bees.filter(bee => bee.rarity === "common");
                    this.rare = json.bees.filter(bee => bee.rarity === "rare");
                    this.legendary = json.bees.filter(bee => bee.rarity === "legendary");
                }
            })
            .catch(err => console.error("error getting bee data:", err));
    }

}