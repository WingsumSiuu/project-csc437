import { css, html, LitElement } from "lit";
import { define } from "@calpoly/mustang";
//import { property } from "lit/decorators.js";
import { EggContainerElement } from "../components/egg-container";
import headings from "../styles/headings.css";
import reset from "../styles/reset.css";
import icon from "../styles/icon.css";

export class EggView extends LitElement {
    static uses = define({
        "egg-container": EggContainerElement,
    });

    render() {
        return html`
            <br>
            <br>
            <div class="body-content-intro-text">
                <h1 class="page-title">the Bee Swarm Simulator Egg List</h1>
                <p>In Bee Swarm, eggs hatch bees.</p>
                <p>Eggs are usually purchasable, though rarer eggs tend to be quite difficult to consistently acquire.</p>
            </div>
            <br>
            <hr />
            <br>
            <div class="body-content">
                <h3 class="title-text">Eggs</h3>
                <egg-container></egg-container>
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

        `
    ];

}
