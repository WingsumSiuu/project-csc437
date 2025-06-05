import { css, html, LitElement } from "lit";
import headings from "../styles/headings.css";
import reset from "../styles/reset.css";
import icon from "../styles/icon.css";

export class NoobShopView extends LitElement {

    render() {
        return html`
            <br>
            <div class="body-content-intro-text">
                <h1 class="page-title">welcome to the noob shop</h1>
                <p>the home of your first bee swarm simulator purchase!</p>
            </div>
            <br>
            <hr>
            <div class="body-content">
                <div class="two-one-grid">
                    <div>
                        <h3 class="title-text">Player Gear</h3>
                        <h3 class="subtitle-text">Head</h3>
                        <div class="shop-box">
                            <img src="/images/tools/helmet.jpeg" alt="helmet">
                            <div class="info">
                                <h3>helmet</h3>
                                <p>upgraded defense!</p>
                                <hr>
                                <p>price: 30000 honey</p>
                                <p>+25% defense</p>
                            </div>
                        </div>
                        <h3 class="subtitle-text">Belt</h3>
                        <div class="shop-box">
                            <img src="/images/tools/belt-pocket.webp" alt="belt pocket">
                            <div class="info">
                                <h3>belt pocket</h3>
                                <p>another pocket for pollen + a lucky charm</p>
                                <hr>
                                <p>price: 14000 honey</p>
                                <p>+25% loot luck and +5000 pollen capacity</p>
                            </div>
                        </div>
                        <h3 class="subtitle-text">Pollen Holder</h3>
                        <div class="shop-box">
                            <img src="/images/tools/pouch.webp" alt="pouch">
                            <div class="info">
                                <h3>pouch</h3>
                                <p>the starter gear</p>
                                <hr>
                                <p>capacity: 200 pollen</p>
                                <p>price: 0 honey</p>
                            </div>
                        </div>
                        <h3 class="subtitle-text">Boots</h3>
                        <div class="shop-box">
                            <img src="/images/tools/basicboots.webp" alt="basic boots">
                            <div class="info">
                                <h3>basic boots</h3>
                                <p>rain boots</p>
                                <hr>
                                <p>price: 4400 honey</p>
                                <p>+4 movement speed</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 class="title-text">Tools Sold</h3>
                        <div class="tool-boxes-flex">
                            <div class="shop-tool-box">
                                <h3>scooper</h3>
                                <p>your first tool</p>
                                <hr>
                                <img src="/images/tools/scooper.webp" alt="scooper">
                                <hr>
                                <p>cost: 0 honey</p>
                                <p>collection Range: 2 tiles</p>
                                <p>pollen Collection Rate: 2 per 0.8 seconds</p>
                            </div>
                            <div class="shop-tool-box">
                                <h3>vacuum</h3>
                                <p>brr</p>
                                <hr>
                                <img src="/images/tools/vacuum.webp" alt="vacuum">
                                <hr>
                                <p>cost: 14000 honey</p>
                                <p>collection Range: 13 tiles</p>
                                <p>pollen Collection Rate: 2 per 0.8 seconds</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    `;
    }

    static styles = [
        reset.styles,
        headings.styles,
        icon.styles,
        css`
            .body-content-intro-text {
                text-align: center;
                padding-bottom: 1em;
            }

            .page-title {
                font-family: "Mansalva", sans-serif;
                text-shadow:  2px 2px var(--color-text-shadow);
            }

            .title-text {
                background-color: var(--color-tertiary);
                text-align: center;
                font-size: var(--font-size-medium);
                padding: 0.5em 0.5em 0.5em 0.5em;
            }

            .subtitle-text {
                background-color: var(--color-quaternary);
                text-align: right;
                font-size: var(--font-size-medium);
                padding: 0.15em 0.5em 0.15em 0.5em;

            }
            
            .two-one-grid { 
                display: grid;
                grid-template-columns: 2fr 1fr;
                width: 100%;
                gap: var(--box-gap);

                @media screen and (max-width: 70rem) {
                    grid-template-columns: 1fr;
                }
            }

            .shop-box {   
                display: flex;
                align-items: center;
                gap: 20px;
                border: var(--box-border-width) solid var(--box-border-color);
                padding: 20px 25px;
                margin-top: -1.35em;

                > img {
                    width: 150px;
                    margin: 0 1.5em 0 1.5em;
                }

                .info {    
                    flex-grow: 1;
                    margin: 0 1.5em 0 0;
                }
            }

            .tool-boxes-flex {
                @media screen and (max-width: 70rem) {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1em;
                }
            }
            
            .shop-tool-box {   
                border: var(--box-border-width) solid var(--box-border-color);
                padding: 0 20px;
                margin-bottom: 1em;

                > img {
                    height: 250px;
                    padding: 1em 0;
                }
                
                @media screen and (max-width: 70rem) {
                    flex-grow: 1;
                    
                }

            }
        
    `];

}