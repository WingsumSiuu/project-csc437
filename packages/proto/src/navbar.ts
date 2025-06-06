import {
    define, Dropdown, Events, Auth, Observer
} from "@calpoly/mustang";
import { css, html, LitElement } from "lit";
import { state } from "lit/decorators.js";
import reset from "./styles/reset.css.ts";
import page from "./styles/page.css.ts";
import tokens from "./styles/tokens.css.ts";

export class NavbarElement extends LitElement {
    static uses = define({
        "mu-dropdown": Dropdown.Element
    });

    @state()
    loggedIn = false;

    @state()
    userid?: string;

    override render() {
        return html`
            <header>
                <div class="navbar">
                    <div class="logo-flex">
                        <h1  @click=${() => (window.location.href = "/")}>bee swarm simulator
                            <svg class="icon">
                                <use href="/icons/bee.svg#icon-bee" />
                            </svg>
                        </h1>
                    </div>

                    <div class="dark-flex">
                    <mu-dropdown>
                        <a slot="actuator">
                            Hello, ${this.userid || "beekeeper"}
                        </a>
                        <menu>
                            <li>
                                <label class="dark-mode-switch"
                                       @change=${(event: Event) => Events.relay(
                                           event, "dark-mode", {
                                               checked: (event.target as HTMLInputElement)?.checked
                                           })
                                       }
                                >
                                <input type="checkbox" />
                                Dark Mode
                                </label>
                            </li>
                            <li>
                                ${this.loggedIn ?
                                    this.renderSignOutButton() :
                                    this.renderSignInButton()
                                }
                            </li>
                        </menu>
                    </mu-dropdown>
                    </div>
                </div>
            </header>
            
            `;
    }

    static styles = [
        reset.styles,
        page.styles,
        tokens.styles,
        css``
    ];

    static initializeOnce() {
        function toggleDarkMode(page: HTMLElement | null, checked: any) {
            page?.classList.toggle("dark-mode", checked);
        }

        document.body.addEventListener("dark-mode", (event: Event) =>
            toggleDarkMode(event.currentTarget as HTMLElement,
                (event as CustomEvent).detail.checked)
        );
    }

    _authObserver = new Observer<Auth.Model>(this, "beeswarm:auth");

    connectedCallback() {
        super.connectedCallback();
        this._authObserver.observe((auth: Auth.Model) => {
            const { user } = auth;

            if (user && user.authenticated ) {
                this.loggedIn = true;
                this.userid = user.username;
            } else {
                this.loggedIn = false;
                this.userid = undefined;
            }
        });
    }


    renderSignOutButton() {
        return html`
            <button
              @click=${(e: UIEvent) => {
                    Events.relay(e, "auth:message", ["auth/signout"])
                }}
            >
              Sign Out
            </button>
        `;
    }

    renderSignInButton() {
        return html`
            <a href="../login.html">
              Sign In…
            </a>
          `;
    }

}
