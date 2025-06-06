import { css, html, LitElement } from "lit";
import headings from "../styles/headings.css";
import reset from "../styles/reset.css";
import icon from "../styles/icon.css";
import {property} from "lit/decorators.js";

export class HomeView extends LitElement {
    @property({ type: Boolean }) showDef: boolean = false;
    @property({ type: Boolean }) showDev: boolean = false;


    render() {
        return html`
            <br>
            <br>
            <br>
            <h1 class="main-title">welcome, beekeeper!</h1>
            <br>
            <br>
            <br>
            <hr>
            <img class="main-image" src="/images/bss.png" alt="Bee Swarm Simulator">
            <hr>
            <div class="def-content">
                <p>card 1</p>
                <div class="card">
                    <h3 class="def" @click=${() => this.showDef = !this.showDef} style="cursor: crosshair;">
                        <span class="carrot">${this.showDef ? '▼' : '▶'}</span> def
                    </h3>
                    ${this.showDef ? html`
                         <ul>
                             <li>a simulator game on Roblox that entails whacking a pad of flowers to collect pollen, crack open eggs,
                                 all to collect bees!</li>
                             <li>aka a great way to waste time</li>
                             <li>free to play (with micro transactions of course)</li>
                         </ul>
                     `: ''}
                </div>
                <p>card 2</p>
                <div class="card">
                    <h3 class="def" @click=${() => this.showDev = !this.showDev} style="cursor: crosshair;">
                        <span class="carrot">${this.showDev ? '▼' : '▶'}</span> dev
                    </h3>
    
                    ${this.showDev ? html`
                         <ul>
                             <li>onett</li>
                             <li>published march 23, 2018</li>
                         </ul>
                     `: ''}
                 </div>
            </div>
            <br>
            <hr>
            <h1 class="header-text">the bss info hub</h1>
            <div class="body-content index-grid">
                <div class="small-border-box">
                    <h3 class="title-text">0 bee zone</h3>
                    <p>fields</p>
                    <ul>
                        <li>
                            <a href="/app/field/dandelion">dandelion field</a>
                        </li>
                    </ul>
                    <p>shops</p>
                    <ul>
                        <li>
                            <a href="/app/shops/noob-shop">noob shop</a>
                        </li>
                    </ul>
                    <p>bears</p>
                    <ul>
                        <li>
                            <a href="/app/bear/black">black bear</a>
                        </li>
                        <li>
                            <a href="/app/bear/mother">mother bear</a>
                        </li>
                    </ul>
                </div>
                <div class="small-border-box">
                    <h3 class="title-text">5 bee zone</h3>
                    <p>fields</p>
                    <ul>
                        <li>
                            <a href="/app/field/spider">spider field</a>
                        </li>
                        <li>
                            <a href="/app/field/bamboo">bamboo field</a>
                        </li>
                    </ul>
                    <p>no shop in zone</p>
                    <p>bears</p>
                    <ul>
                        <li>
                            <a href="/app/bear/panda">panda bear</a>
                        </li>
                    </ul>
                </div>
                <div class="small-border-box">
                    <h3 class="title-text">miscellaneous</h3>
                    <ul>
                        <li>
                            <a href="/app/eggs">eggs</a>
                        </li>
                        <li>
                            <a href="/app/bees">bees</a>
                        </li>
                    </ul>
                </div>
            </div>
            <br>
            <br>
    `;
    }

    static styles = [
        reset.styles,
        headings.styles,
        icon.styles,
        css`
            .carrot {
                font-size: 0.7em;
            }

            .main-title {
                font-size: 2rem;
                text-align: center;
                text-shadow: .2em .15em var(--color-text-shadow);
            }

            .main-image {
                opacity: 0.65;
            }

            .body-content-intro-text {
                text-align: center;
                padding-bottom: 1em;
                font-size: 1em;
            }

            .def-content {
                padding: 0 15em;
            }

            .card {
                border: 2px solid var(--color-line);
                border-radius: 1em;
            }

            .def {
                padding: 0.25em 1em;
                text-align: left;
                background-color: var(--color-secondary);
                font-size: var(--font-size-medium);

                background: var(--color-seven);

                > .indent {
                    padding-left: 5em;
                }

            }
            
            .header-text {
                background-color: var(--color-secondary);
                text-align: center;
                font-size: 1.7em;
                padding: 0.25em 0;
            }

            .title-text {
                background-color: var(--color-tertiary);
                text-align: center;
                font-size: var(--font-size-medium);
                padding: 0.5em 0.5em 0.5em 0.5em;
            }

            .index-grid {
                --page-grids: 3;
                display: grid;
                align-content: end;
                grid-template-columns: repeat(
                var(--page-grids), 1fr
            );

                gap: var(--box-gap);

                grid-column: span min(
                        5,
                        var(--page-grids)
                ) / -1;

                @media screen and (max-width: 50rem) {
                    grid-template-columns: 1fr;
                }
            }
        `
    ];

}