import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { Bee } from "server/models";
import reset from "../styles/reset.css.ts";
import headings from "../styles/headings.css.ts";

export class BeeContainerElement extends LitElement {
    @property()
    src = "/api/bees";

    @property({ type: Array }) common: Bee[] = [];
    @property({ type: Array }) rare: Bee[] = [];
    @property({ type: Array }) legendary: Bee[] = [];

    override connectedCallback() {
        super.connectedCallback();
        if (this.src) this.hydrate(this.src);
    }

    render() {
        return html`
            <h3 class="title-text">Common Bees</h3>
            <div class="bee-container">
                ${this.renderBeeBox(this.common)}
            </div>
            <br>
            <hr>
            <br>
            <h3 class="title-text">Rare Bees</h3>
            <div class="bee-container">
                ${this.renderBeeBox(this.rare)}
            </div>
            <br>
            <hr>
            <br>
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
        headings.styles,
        css `
            .bee-container {
                display: flex;
                flex-wrap: wrap;
                gap: 1em;
            }

            .bee-box {
                border: var(--box-border-width) solid var(--box-border-color);
                flex-basis: 270px;
                flex-grow: 1;
                padding: 0 1em 1em 1em;

                > img {
                    width: 80%;
                }
            }

            .title-text {
                background-color: var(--color-tertiary);
                text-align: center;
                font-size: var(--font-size-medium);
                padding: 0.5em 0.5em 0.5em 0.5em;
            }
        `];

    hydrate(src: string) {
        fetch(src)
            .then(res => res.json())
            .then((json: { bees: Bee[] }) => {  // casting to Egg data type
                if (json?.bees) {
                    this.common = json.bees.filter(bee => bee.rarity === "common");
                    this.rare = json.bees.filter(bee => bee.rarity === "rare");
                    this.legendary = json.bees.filter(bee => bee.rarity === "legendary");
                }
            })
            .catch(err => console.error("error getting bee data:", err));
    }
}
