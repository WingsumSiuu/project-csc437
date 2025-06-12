import { css, html } from "lit";
import headings from "../styles/headings.css";
import reset from "../styles/reset.css";
import icon from "../styles/icon.css";
import {property, state} from "lit/decorators.js";
import { Msg } from "../messages";
import { Model} from "../model";
import {View} from "@calpoly/mustang";
import {User} from "server/models";

export class PollenView extends View<Model, Msg> {
    @property({ attribute: "userid" })
    userid?: string;

    @state()
    get user(): User | undefined {
        return this.model.profile;
    }

    constructor() {
        super("beeswarm:model");
    }

    render() {
        const {
            pollen
        } = this.user || {};


        return html`
            <br>
            <br>
            <br>
            <div class="body-content-intro-text">
                <h1 class="page-title">the bee swarm experience</h1>
                <p>welcome to the <s>cookie</s> pollen clicker!</p>
            </div>
            <br>
            <br>
            <hr>
            <div class="body-content">
                <p>${pollen}</p>
                <button @click=${this.handleClick}>Collect Pollen</button>
            </div>
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
            
        
    `];

    connectedCallback() {
        super.connectedCallback();
        if (this.userid) {
            this.dispatchMessage(["profile/select", { userid: this.userid }]);
        }
    }

    handleClick() {
        if (this.userid && this.user?.pollen !== undefined) {
            const newPollen = this.user.pollen + 1;
            this.dispatchMessage([
                "pollen/save",
                {
                    userid: this.userid,
                    newPollen: newPollen,
                }
            ]);
        }
    }


}