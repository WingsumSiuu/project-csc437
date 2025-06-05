import { css, html, LitElement } from "lit";
import headings from "../styles/headings.css";
import reset from "../styles/reset.css";
import icon from "../styles/icon.css";

export class HomeView extends LitElement {

    render() {
        return html`
            <br>
            <h1 class="main-title">welcome, beekeeper</h1>
            <p class="body-content-intro-text">a simulator game on Roblox that entails whacking a pad of flowers to collect pollen, crack open eggs,
                all to collect bees!<br>aka a great way to waste time<br><br>free to play (with micro transactions of course)</p>
            <hr>
            <img class="main-image" src="/images/bss.png" alt="Bee Swarm Simulator">
            <hr>
            <h1 class="header-text">The Hub</h1>
            <div class="body-content index-grid">
                <div class="small-border-box">
                    <h3 class="title-text">0 Bee Zone</h3>
                    <p>Fields</p>
                    <ul>
                        <li>
                            <a href="/app/field/dandelion">Dandelion Field</a>
                        </li>
                    </ul>
                    <p>Shops</p>
                    <ul>
                        <li>
                            <a href="/app/shops/noob-shop">Noob Shop</a>
                        </li>
                    </ul>
                    <p>NPCs</p>
                    <ul>
                        <li>
                            <a href="/npcs/blackbear.html">Black bear</a>
                        </li>
                        <li>
                            <a href="/npcs/motherbear.html">Mother bear</a>
                        </li>
                    </ul>
                </div>
                <div class="small-border-box">
                    <h3 class="title-text">5 Bee Zone</h3>
                    <p>Fields</p>
                    <ul>
                        <li>
                            <a href="/app/field/spider">Spider Field</a>
                        </li>
                        <li>
                            <a href="/app/field/bamboo">Bamboo Field</a>
                        </li>
                    </ul>
                    <p>No shop in zone</p>
                    <p>NPCs</p>
                    <!--                    <p>in progress</p>-->
                    <ul>
                        <li>
                            <a href="/npcs/pandabear.html">Panda bear</a>
                        </li>
                    </ul>
                </div>
                <div class="small-border-box">
                    <h3 class="title-text">Miscellaneous</h3>
                    <ul>
                        <li>
                            <a href="/app/eggs">Eggs</a>
                        </li>
                        <li>
                            <a href="/app/bees">Bees</a>
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
                font-size: 1.2em;
            }

            .header-text {
                background-color: var(--color-secondary);
                text-align: center;
                font-size: var(--font-size-larger);
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

                gap:
                        var(--box-gap);

                grid-column:
                        span min(
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