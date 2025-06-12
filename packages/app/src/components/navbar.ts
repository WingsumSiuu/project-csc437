import {
    Auth, define, Dropdown, Events, Observer, View
} from "@calpoly/mustang";
import { css, html } from "lit";
import { state } from "lit/decorators.js";
import headings from "../styles/headings.css";
import reset from "../styles/reset.css";
import icon from "../styles/icon.css";
import { Model } from "../model.ts";
import { Msg } from "../messages.ts";

function toggleDarkMode(ev: InputEvent) {
    const target = ev.target as HTMLInputElement;
    const checked = target.checked;

    Events.relay(ev, "dark-mode", { checked });
}

export class NavbarElement extends View<Model, Msg> {
    static uses = define({
        "mu-dropdown": Dropdown.Element
    });

    @state()
    loggedIn = false;

    @state()
    userid?: string;

    @state()
    get profile() {
        console.log("hello " + this.userid + " " + this.model.profile);

        return this.model.profile;
    }

    constructor() {
        super("beeswarm:model");
    }

    protected render() {
        //const name = this.profile?.nickname || "beekeeper";
        const profilePicture = this.profile?.profilePicture || "/images/bees/basicbee.webp";
        const color = this.profile?.color || "#cccccc";

        return html`
             <header>
                <div class="navbar">
                    <div class="logo-flex">
                        <h1>
                            <svg class="icon">
                                <use href="/icons/bee.svg#icon-bee" />
                            </svg>
                            bee swarm simulator
                        </h1>
                    </div>

                    <nav class="links">
                        <a href="/app">home</a>
                        <a href="/app/eggs">eggs</a>
                        <a href="/app/bees">bees</a>
                        ${this.loggedIn ? html`
                            <a href="/app/pollen/${this.userid}"> my pollen </a>
                        ` : ''}
                    </nav>
                    
                    <div class="right-flex">
                        <mu-dropdown>
                            <img
                                    slot="actuator"
                                    src=${profilePicture}
                                    alt="Profile Picture"
                                    class="pic"
                                    style="border: 3px solid ${color}"
                            />
                            <menu>
                                <li>
                                    Hello, ${this.userid || "beekeeper"}
                                </li>
                                ${this.loggedIn ? html`
                                    <li>
                                        <a href="/app/profile/${this.userid}">my profile</a>
                                    </li>
                                    <li>
                                        <a href="/app/pollen/${this.userid}"> my pollen </a>
                                    </li>
                                ` : ''}
                                <li>
                                    ${this.loggedIn
                                            ? this.renderSignOutButton()
                                            : this.renderSignInButton()}
                                </li>
                                <li>
                                    <label @change=${toggleDarkMode}>
                                        <input type="checkbox" />
                                        <svg class="icon">
                                            <use href="/icons/bee.svg#icon-dark-mode" />
                                        </svg>
                                    </label>
                                </li>
                            </menu>
                        </mu-dropdown>
                    </div>
                </div>
            </header>
    `
    }

    static styles = [
        reset.styles,
        headings.styles,
        icon.styles,
        css`
            .navbar {
                justify-content: space-between;

                align-items: center;
                display: flex;

                background-color: var(--color-primary);
                width: 100%;
                
                height: 4em;

                > .logo-flex {
                    padding-left: 1em;
                    font-size: 0.8em;
                    padding-top: 0.8em;
                }

                > .right-flex {
                    padding-right: 1em;
                    font-size: 1.2em;
                    li {
                        font-size: 0.8em;
                    }
                }
                
            }
            
            .pic {
                width: 2em;
                height: 2em;
                border-radius: 50%;
                object-fit: cover;
                border: 2px solid var(--color-line);
            }
            
            button {
                font-family: "Mansalva", sans-serif;
                background: none;
                border: none;
                margin-top: 1em;
            }

            .links {
                display: flex;
                gap: 1.5rem;
            }
        `
    ];


    _authObserver = new Observer<Auth.Model>(
        this,
        "beeswarm:auth"
    );

    connectedCallback() {
        super.connectedCallback();

        this._authObserver.observe(({ user }) => {
            if (user && user.authenticated ) {
                this.loggedIn = true;
                this.userid = user.username;

                console.log("hello " + this.userid);
                this.dispatchMessage(["profile/select", {userid: this.userid}]);
            } else {
                this.loggedIn = false;
                this.userid = undefined;
            }
        });
    }

    static initializeOnce() {
        function toggleDarkMode(
            page: HTMLElement,
            checked: boolean
        ) {
            page.classList.toggle("dark-mode", checked);
        }

        document.body.addEventListener("dark-mode", (event) =>
            toggleDarkMode(
                event.currentTarget as HTMLElement,
                (event as CustomEvent).detail?.checked
            )
        );
    }

    renderSignOutButton() {
        return html`
            <button style="color: var(--color-text);"
                    @click=${(e: UIEvent) => {
            Events.relay(e, "auth:message", ["auth/signout"]);
        }}
            >
                Sign Out
            </button>
        `;
    }

    renderSignInButton() {
        return html`
            <button style="color: var(--color-text);" @click=${() => {
            window.location.href = "/login.html";
        }}>
                Sign In
            </button>
        `;
    }

}
