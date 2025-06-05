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
    @property({ type: Array }) epic: Bee[] = [];

    override connectedCallback() {
        super.connectedCallback();
        if (this.src) this.hydrate(this.src);
    }

    render() {
        return html`
            <h3 class="title-text">Common Bees</h3>
            ${this.renderBeeBox(this.common)}
            <hr>
            <h3 class="title-text">Rare Bees</h3>
            ${this.renderBeeBox(this.rare)}
            <hr>
            <h3 class="title-text">Legendary Bees</h3>
            ${this.renderBeeBox(this.legendary)}
            <hr>
            <h3 class="title-text">Epic Bees</h3>
            ${this.renderBeeBox(this.epic)}
            <br>
        `;
    }

    renderBeeBox(bees: Bee[]) {         // renders each bee box (filtered by rarity above)
        return bees.map((bee: Bee) => html`
            <div class="bee-container">
                <img src=${bee.imgsrc} alt="bee">
                <div class="info">
                    <h3 class="bee-name">${bee.beename}</h3>
                    <p>${bee.desc}<p>
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
            </div>
            <br>
        `);
    }

    static styles = [
        reset.styles,
        headings.styles,
        css `
            .bee-container {
                display: flex;
                align-items: center;
                gap: 20px;
                border: var(--box-border-width) solid var(--box-border-color);
                padding: 20px 25px;

                > img {
                    width: 250px;
                    margin: 0 1.5em 0 1.5em;
                    
                }

                .info {
                    flex-grow: 1;
                    margin: 0 1.5em 0 0;
                }

                @media screen and (max-width: 50rem) {
                    display: flex;
                    flex-wrap: wrap;
                }
            
            }

            .title-text {
                background-color: var(--color-tertiary);
                text-align: center;
                font-size: var(--font-size-medium);
                padding: 0.5em 0.5em 0.5em 0.5em;
            }
            
            .bee-name {
                font-size: 1.3em;
                text-shadow: 2px 1.5px var(--color-tertiary);
            }

            table {
                width: 100%;
                border-collapse: collapse;
                
                > th, td {
                    border: 1px solid var(--color-text);
                    padding: 0.5em;
                }
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
                    this.epic = json.bees.filter(bee => bee.rarity === "epic");
                }
            })
            .catch(err => console.error("error getting bee data:", err));
    }
}
