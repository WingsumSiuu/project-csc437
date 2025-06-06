import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { Bear } from "server/models";
import reset from "../styles/reset.css.ts";
import headings from "../styles/headings.css.ts";

export class BearView extends LitElement {
    @property({ type: String })
    src?: string;

    @property( { type: Object })
    bear?: Bear;

    override connectedCallback() {
        super.connectedCallback();
        if (this.src) this.hydrate(this.src);
    }

    render() {
        return html`
            <br>
            <br>
            <br>
            <div class="body-content">
                <p>&gt; current viewing: bears </p>
                <div class="bear-grid">
                    <div class="profile">
                        <div class="card">
                            <h1 class="page-title">${this.bear?.bearname} bear</h1>
                            <hr>
                            <p>${this.bear?.desc}</p>
                        </div>
                        <br>
                        <img src="${this.bear?.image}" alt="bear" />
                    </div>
                    <div class="info">
                        <h3 class="title-text">Quests</h3>
                        ${this.bear?.quests.map(q => html`
                            <div class="questbox">
                                <p class="subtitle-text">${q.title}</p>
                                <ul>
                                    ${q.tasks.map(task => html`<li>${task}</li>`)}
                                    <li>Reward: ${q.reward}</li>
                                </ul>
                            </div>
                        `)}
                    </div>
                </div>
            </div>
    `;
    }

    static styles = [
        reset.styles,
        headings.styles,
        css `
            .body-content-intro-text {
                text-align: center;
                padding-bottom: 1em;
            }

            .page-title {
                font-family: "Mansalva", sans-serif;
                text-shadow:  2px 2px var(--color-secondary);
            }
            
            .title-text {
                background-color: var(--color-tertiary);
                text-align: center;
                font-size: 1.5em;
                padding: 0.5em 0.5em 0.5em 0.5em;
            }

            .subtitle-text {
                background-color: var(--color-secondary);
                text-align: right;
                font-size: 1.3em;
                padding: 0.15em 0.5em 0.15em 0.5em;

            }
            
            .bear-grid {
                display: grid;
                grid-template-columns: 1fr 2fr;
                width: 100%;
                gap: var(--box-gap);
    
                @media screen and (max-width: 50rem) {
                    grid-template-columns: 1fr;
                }

                & > * img {
                    width: 325px;     
                    height: 325px;  
                    border-radius: 50%;
                    object-fit: cover; 
                    border: 2px solid var(--color-line);
                }
    
                > .profile {
                    padding-top: 1.5em;
                }
            
                & > * .questbox {
                    border: 2px solid var(--color-line);;
                    margin-bottom: 1em;
            }

            .card {
                padding: 0 2em;
                border: 2px solid var(--color-line);
                border-radius: 1em;
            }
            
        `];

    hydrate(src: string) {
        fetch(src)
            .then(res => res.json())
            .then((json: Bear) => {
                this.bear = json;
            })
            .catch(err => console.error("error getting bear data:", err));
    }
}
