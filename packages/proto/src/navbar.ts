import {
    define, Dropdown, Events
} from "@calpoly/mustang";
import { css, html, LitElement } from "lit";
import reset from "./styles/reset.css.ts";
import page from "./styles/page.css.ts";
import tokens from "./styles/tokens.css.ts";

export class NavbarElement extends LitElement {
    static uses = define({
        "mu-dropdown": Dropdown.Element
    });

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
                        <label class="dark-mode-switch"
                               @change=${(event: Event) => Events.relay(
                                       event, "dark-mode", {
                                           checked: (event.target as HTMLInputElement)?.checked
                                       })
                               }
                        >
                            <h1>
                        <input type="checkbox" />
                            <svg class="icon">
                                <use href="/icons/bee.svg#icon-dark-mode" />
                            </svg>
                            </h1>
                        </label>
                    </div>
                </div>
            </header>
            
            `;
    }
    // <header>
    //                 <h1 class="navbar mansalva-regular">bee swarm simulator
    //                     <svg class="icon">
    //                         <use href="icons/bee.svg#icon-bee" />
    //                     </svg>
    //                 </h1>
    //
    //             </header>
    // <label class="dark-mode-switch"
    //                        @change=${(event: Event) => Events.relay(
    //                                event, "dark-mode", {
    //                                    checked: (event.target as HTMLInputElement)?.checked
    //                                })
    //                        }
    //                 >
    //                     <input type="checkbox" />
    //                     Dark Mode
    //                 </label>

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
}
