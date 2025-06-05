import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { Field, Mob } from "server/models";
import reset from "../styles/reset.css.ts";
import headings from "../styles/headings.css.ts";

export class FieldView extends LitElement {
    @property({ type: String })
    src?: string;

    @property( { type: Object })
    field?: Field;

    override connectedCallback() {
        super.connectedCallback();
        if (this.src) this.hydrate(this.src);
    }

    render() {
        return html`
            <div class="body-content-intro-text">
                <h1 class="page-title">${this.field?.fieldname} field</h1>
                <p>${this.field?.desc}</p>
            </div>
            <hr>
            <div class="img-under-text">
                <img src="${this.field?.image}" alt="an image of a field">
            </div>
            <hr>
            <br>
            <div class="body-content">
                <div class="two-one-grid">
                    <div>
                        <h3 class="title-text">Mob(s)</h3>
                        <div class="mobs-flex">
                            ${this.field?.mobs?.length
                                ? this.renderMobBox(this.field?.mobs)
                                : html`<p>No mobs in this field</p>`}
                        </div>
                    </div>

                    <div>
                        <h3 class="title-text">Flower(s)</h3>
                        ${this.field?.flowers?.length
                            ? this.renderFlowerBox(this.field.flowers)
                            : html`<p>No flowers in this field</p>`}       
                    </div>

                </div>
            </div>
            <br>
            <br>
    `;
    }

    renderMobBox(mobs: Mob[] = []) {         // renders each bee box (filtered by rarity above)
        console.log(mobs[0]);
        console.log(mobs[0].mobname);
        return mobs.map((mob: Mob) => html`
            <div class="mob-box">
                <h3>${mob.mobname} (level ${mob.level})</h3>
                <hr />
                <img class="mob-img" src="${mob.image}" alt="imagine a mob picture" />
                <hr />
                <p>Mob Stats</p>
                <table class="table">
                    <tr>
                        <td>Health</td>
                        <td>${mob.stats?.health}</td>
                    </tr>
                    <tr>
                        <td>Damage</td>
                        <td>${mob.stats?.damage}</td>
                    </tr>
                    <tr>
                        <td>Honey Dropped</td>
                        <td>${mob.stats?.drop}</td>
                    </tr>
                </table>
                <br>
            </div>
        `);
    }

    renderFlowerBox(flowers: String[]) {         // renders each bee box (filtered by rarity above)
        return flowers.map((flower: String) => html`
            <div class="flower-box" style="background-color: ${this.getFlowerColor(flower)};">
                <svg class="flower-icon">
                    <use href="../../icons/bee.svg#icon-flower"></use>
                </svg>
                <p>${flower} flowers</p>
            </div>
        `);
    }

    getFlowerColor(flower: String): string {
        switch (flower) {
            case "blue": return "var(--color-flower-blue)";
            case "red": return "var(--color-flower-red)";
            case "white": return "var(--color-flower-white)";
            default: return "white";
        }
    }

    static styles = [
        reset.styles,
        headings.styles,
        css `
            .body-content-intro-text {
                text-align: center;
                padding-bottom: 1em;
            }

            .img-under-text {
                > img {
                    opacity: .6;
                }
            }

            .two-one-grid { 
                display: grid;
                grid-template-columns: 2fr 1fr;
                width: 100%;
                gap: var(--box-gap);

                @media screen and (max-width: 50rem) {
                    grid-template-columns: 1fr;
                }
            }

            .title-text {
                background-color: var(--color-tertiary);
                text-align: center;
                font-size: var(--font-size-medium);
                padding: 0.5em 0.5em 0.5em 0.5em;
            }

            .page-title {
                font-family: "Mansalva", sans-serif;
                text-shadow:  2px 2px var(--color-text-shadow);
            }
            
            .mob-box {   
                border: var(--box-border-width) solid var(--box-border-color);
                padding: 10px 20px;
                flex-basis: 250px;
                flex-grow: 1;

                >.mob-img {
                    width: 90%;
                }
            }
            
            .mobs-flex {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5em;
            }
            
            .flower-box {  
                display: flex;
                flex-wrap: wrap;
                border: var(--box-border-width) solid var(--box-border-color);
                
                > .flower-icon {
                    width: var(--icon-size);
                    height: var(--icon-size);
                    fill: var(--color-text);
                    padding-top: 0.3em;
                }
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
            .then((json: Field) => {
                this.field = json;
            })
            .catch(err => console.error("error getting field+mob data:", err));
    }
}
