import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { Egg } from "server/models";
import reset from "../styles/reset.css.ts";
import headings from "../styles/headings.css.ts";

export class EggContainerElement extends LitElement {
    @property()
    src = "/api/eggs";

    @property({ type: Array })
    eggs: Egg[] = [];

    override connectedCallback() {
        super.connectedCallback();
        if (this.src) this.hydrate(this.src);
    }

    render() {
        return html`
            ${this.eggs.map((egg: Egg) => html`
                <div class="shop-box">
                    <img width="100px" src="${egg.imgsrc}" alt="egg image" />
                    <div class="info">
                        <h3 class="egg-name">${egg.eggname}</h3>
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
                <br>
            `)}
        `;
        }

    static styles = [
        reset.styles,
        headings.styles,
        css `
            .shop-box {    
                display: flex;
                align-items: center;
                gap: 20px;
                border: var(--box-border-width) solid var(--box-border-color);
                padding: 20px 25px;

                > img {
                    width: 150px;
                    margin: 0 1.5em 0 1.5em;
                }

                .info {    
                    flex-grow: 1;
                    margin: 0 1.5em 0 0;
                    padding-bottom: 1.5em;
                }
            }

            .egg-name {
                font-size: 1.3em;
                text-shadow: 2px 2px var(--color-tertiary);
            }

            table {   
                width: 100%;
                border-collapse: collapse;

                >th, td {
                    border: 1px solid var(--color-text);
                    padding: 10px 1px 10px 10px;
                    text-align: left;
                }
            }
        `];

    hydrate(src: string) {
        fetch(src)
            .then(res => res.json())
            .then((json: { eggs: Egg[] }) => {  // casting to Egg datatype
                console.log(json.eggs);
                this.eggs = json.eggs;
            })
            .catch(err => console.error("error getting egg data:", err));
    }
}
