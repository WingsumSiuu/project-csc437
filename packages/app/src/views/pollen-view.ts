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
            nickname,
            color,
            profilePicture,
            pollen
        } = this.user || {};


        return html`
            <br>
            <br>
            <br>
            <div class="body-content-intro-text">
                <h1 class="page-title">the bee swarm experience (not!)</h1>
                <p>welcome to the <s>cookie</s> pollen clicker!</p>
            </div>
            <br>
            <br>
            <hr>
            <div class="body-content">
                <div class="form-card">
                    <div class="two-one-grid">
                        <div>
                            <p>currently playing...</p>
                            <h3 style="padding-left: 1.5em;" class="subtitle-text">${nickname || "none"}</h3>
                            <img src=${profilePicture} class="profpic" style="border: 1em solid ${color}" alt="pp"/>
                            <br>
                            <br>
                        </div>
                        <div class="col">
                            <h3 style="padding-left: 1.5em; padding-bottom: 0.25em;" class="title-text">
                                <svg class="icon">
                                    <use href="/icons/bee.svg#icon-bee" />
                                </svg>
                                pollen count
                                <svg class="icon">
                                    <use href="/icons/bee.svg#icon-bee" />
                                </svg>
                            </h3>
                            <h3 style="font-size: 1.5em">- ${pollen} -</h3>
                            <button @click=${this.handleClick}>Collect Pollen</button>
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
                background-color: var(--color-primary);
                text-align: center;
                font-size: var(--font-size-medium);
                padding: 0.5em 0.5em 0.5em 0.5em;
            }

            .subtitle-text {
                background-color: var(--color-primary);
                text-align: right;
                font-size: var(--font-size-medium);
                padding: 0.15em 0.5em 0.15em 0.5em;

            }

            button {
                font-family: "Mansalva", sans-serif;
                font-size: 1.15em;
                border: none;
                padding: 0.5em 1em;
                background-color: var(--color-primary);
                border-radius: 30%;
                color: var(--color-text);
            }

            .form-card {
                padding: 1em 1.5em;
                border: 2px solid var(--color-line);
                border-radius: 1em;

                background-color: var(--color-page-bg);
                background-image:
                        radial-gradient(#91862f 1px, transparent 1px),
                        radial-gradient(#aea76b 1px, transparent 1px);
                background-size: 50px 50px;
            }

            .two-one-grid {
                display: grid;
                grid-template-columns: 1fr 2fr;
                width: 100%;
                gap: var(--box-gap);

                @media screen and (max-width: 70rem) {
                    grid-template-columns: 1fr;
                }
            }

            .col {
                text-align: center;
                padding: 7.9em 5em;
            }

            .profpic {
                width: 300px;
                height: 300px;
                border-radius: 50%;
                object-fit: cover;
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