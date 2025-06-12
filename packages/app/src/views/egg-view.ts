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
            <br>
            <div class="body-content-intro-text">
                <h1 class="page-title">the (partial) bee swarm simulator egg list</h1>
                <p>in bee swarm sim, eggs hatch bees.</p>
                <p>eggs are usually purchasable, though rarer eggs tend to be difficult to consistently acquire.</p>
            </div>
            <br>
            <br>
            <hr />
            <div class="body-content">
                <h3 class="title-text">eggs</h3>
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
