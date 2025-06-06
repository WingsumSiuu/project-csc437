import { css, html, LitElement } from "lit";
import { define } from "@calpoly/mustang";
//import { property } from "lit/decorators.js";
import { BeeContainerElement } from "../components/bee-container";
import headings from "../styles/headings.css";
import reset from "../styles/reset.css";
import icon from "../styles/icon.css";

export class BeeView extends LitElement {
    static uses = define({
        "bee-container": BeeContainerElement,
    });

    render() {
        return html`
            <br>
            <br>
            <br>
            <div class="body-content-intro-text">
                <h1 class="page-title">the (partial) bee swarm simulator bees list</h1>
                <p>your little fuzzy friends who fight for you, collect pollen for you, and convert pollen to honey for you</p>
                <p>treat them well</p>
            </div>
            <br>
            <hr>
            <div class="body-content">
                <bee-container></bee-container>
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
                text-shadow: 2px 2px var(--color-text-shadow);
            }

        `
    ];
}