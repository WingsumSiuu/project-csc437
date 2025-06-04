import {
    Auth, define, Dropdown, Events, Observer
} from "@calpoly/mustang";
import { css, html, LitElement} from "lit";
import { state } from "lit/decorators.js";
import headings from "../styles/headings.css";
import reset from "../styles/reset.css";
import icon from "../styles/icon.css";

function toggleDarkMode(ev: InputEvent) {
    const target = ev.target as HTMLInputElement;
    const checked = target.checked;

    Events.relay(ev, "dark-mode", { checked });
}

function signOut(ev: MouseEvent) {
    Events.relay(ev, "auth:message", ["auth/signout"]);
}

export class NavbarElement extends LitElement {
    static uses = define({
        "mu-dropdown": Dropdown.Element
    });

    @state()
    loggedIn = false;

    @state()
    userid?: string;

    // constructor() {
    //     super("beeswarm:model");
    // }

    protected render() {

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
                                <label @change=${toggleDarkMode}>
                                    <input type="checkbox" />
                                    Dark Mode
                                </label>
                            </li>
                            <li class="when-signed-in">
                                <a id="signout" @click=${signOut}>Sign Out</a>
                            </li>
                            <li class="when-signed-out">
                                <a href="/login">Sign In</a>
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
                display: flex;
                justify-content: space-between;
                
                background-color: var(--color-primary);
                width: 100%;
                height: 5em;
                margin-top: -0.5em;
                
                > .logo-flex {
                    padding-left: 1em;
                }
                
                > .dark-flex {
                    padding-right: 1em;
                }    
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

                //this.dispatchMessage(["profile/select", {userid: this.userid}]);
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

}
