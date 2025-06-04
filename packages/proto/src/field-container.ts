import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import reset from "./styles/reset.css.ts";
import tokens from "./styles/tokens.css.ts";
import page from "./styles/page.css.ts";
import {Field, Mob} from "./models/schema.ts";

export class FieldContainerElement extends LitElement {

    @property()
    src?: string;

    @property( { type: Object })
    field?: Field;

    override connectedCallback() {
        super.connectedCallback();
        if (this.src) this.hydrate(this.src);
    }

    override render() {
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
            <div class="body-content-field">
                <div class="two-one-grid">
                    <div>
                        <h3 class="title-text">Mob(s)</h3>
                        ${this.field?.mobs?.length
                                ? this.renderMobBox(this.field?.mobs)
                                : html`<p>No mobs in this field</p>`}
                    </div>

                    <div>
                        <h3 class="title-text">Flower(s)</h3>
                        ${this.field?.flowers?.length
                                ? this.renderFlowerBox(this.field.flowers)
                                : html`<p>No flowers in this field</p>`}       
                    </div>

                </div>
            </div>
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
            </div>
        `);
    }

    renderFlowerBox(flowers: String[]) {         // renders each bee box (filtered by rarity above)
        return flowers.map((flower: String) => html`
            <div class="flower-box">
                <svg class="flower-icon">
                    <use href="../../icons/bee.svg#icon-flower"></use>
                </svg>
                <p>${flower} flowers</p>
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
            .then((json: Field) => {
                this.field = json;
                console.log(json);
            })
            .catch(err => console.error("error getting field+mob data:", err));
    }

}