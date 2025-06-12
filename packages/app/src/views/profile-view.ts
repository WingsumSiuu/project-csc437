import { define, Form, View } from "@calpoly/mustang";
import { html, css } from "lit";
import { property, state } from "lit/decorators.js";
import { User } from "server/models";
import { Msg } from "../messages";
import {init, Model} from "../model";
import headings from "../styles/headings.css";
import reset from "../styles/reset.css";

export class ProfileViewElement extends View<Model, Msg> {
    static uses = define({
        "mu-form": Form.Element
    });

    @property({ type: Boolean }) showName: boolean = true;
    @property({ type: Boolean }) showNickname: boolean = true;
    @property({ type: Boolean }) showLevel: boolean = true;
    @property({ type: Boolean }) showColor: boolean = true;

    @property({ attribute: "userid" })
    userid?: string;

    @state()
    get user(): User | undefined {
        return this.model.profile;
    }

    @property()
    mode = "view";

    constructor() {
        super("beeswarm:model");
    }


    override render() {
        return this.mode === "edit" ?
            this.renderEditor() :
            this.renderView();
    }

    // renderView() {
    //     const {
    //         userid,
    //         nickname,
    //         level,
    //         color,
    //         profilePicture,
    //     } = this.user || {};
    //
    //     return html`
    //         <div class="body-content">
    //             <br>
    //             <br>
    //             <br>
    //             <h1 class="main-title">${userid}'s profile</h1>
    //             <button @click=${() => {
    //                 this.mode = "edit";
    //                 }}>
    //                 edit
    //             </button>
    //             <br>
    //             <br>
    //             <br>
    //             <div class="two-one-grid">
    //                 <div>
    //                     <div class="card">
    //                         <h3 class="banner" @click=${() => this.showName = !this.showName} style="cursor: crosshair;">
    //                             <span class="carrot">${this.showName ? '▼' : '▶'}</span> user id
    //                         </h3>
    //
    //                         ${this.showName ? html`
    //                             <div class="card-content">
    //                                 <p>${userid || "none"}</p>
    //                             </div>
    //                         `: ''}
    //                     </div>
    //                     <br>
    //                     <div class="card">
    //                         <h3 class="banner" @click=${() => this.showNickname = !this.showNickname} style="cursor: crosshair;">
    //                             <span class="carrot">${this.showNickname ? '▼' : '▶'}</span> display name
    //                         </h3>
    //
    //                         ${this.showNickname ? html`
    //                             <div class="card-content">
    //                                 <p>${nickname || "none"}</p>
    //                             </div>
    //                              `: ''}
    //                     </div>
    //                     <br>
    //                     <div class="card">
    //                         <h3 class="banner" @click=${() => this.showLevel = !this.showLevel} style="cursor: crosshair;">
    //                             <span class="carrot">${this.showLevel ? '▼' : '▶'}</span> level
    //                         </h3>
    //
    //                         ${this.showLevel ? html`
    //                             <div class="card-content">
    //                                 <p>${level || "not specified"}</p>
    //                             </div>
    //                              `: ''}
    //                     </div>
    //                     <br>
    //                     <div class="card">
    //                         <h3 class="banner" @click=${() => this.showColor = !this.showColor} style="cursor: crosshair;">
    //                             <span class="carrot">${this.showColor ? '▼' : '▶'}</span> color
    //                         </h3>
    //
    //                         ${this.showColor ? html`
    //                             <div class="card-content">
    //                                 <div style="display: flex; align-items: center; gap: 1rem;">
    //                                     <div style="width: 20px; height: 20px; background-color: ${color}; border: 2px solid var(--color-line);"></div>
    //                                     <p style="margin: 0;">${color || "not specified"}</p>
    //                                 </div>
    //                                 <br>
    //                             </div>
    //                              `: ''}
    //                     </div>
    //                 </div>
    //                 <div class="col">
    //                     <h3>profile picture</h3>
    //                     <img src=${profilePicture} class="profpic" style="border: 3px solid ${color}" />
    //                 </div>
    //             </div>
    //         </div>
    //         <br>
    //         <br>
    //     `;
    // }

    renderView() {
        const {
            userid,
            nickname,
            level,
            color,
            profilePicture,
        } = this.user || {};

        return html`
            <div class="body-content">
                <br>
                <br>
                <br>
                <h1 class="main-title">${userid}'s profile</h1>
                <button @click=${() => {
                    this.mode = "edit";
                }}>
                    edit
                </button>
                <br>
                <br>
                <br>
                <div class="form-card">
                    <div class="two-one-grid">
                        <div>
                            <h3>user id: ${this.userid}</h3>
                            <p>* userid is permanent</p>
                            <hr>
                            <h3>display name</h3>
                            <p style="padding-left: 1.5em;">${nickname || "none"}</p>
                            <h3>level</h3>
                            <p style="padding-left: 1.5em;">${level || "none"}</p>
                            <h3>color</h3>
                            <div style="display: flex; align-items: center; gap: 1rem; padding-left: 1.5em;">
                                <div style="width: 20px; height: 20px; background-color: ${color}; border: 2px solid var(--color-line);"></div>
                                <p style="margin: 0;">${color || "not specified"}</p>
                            </div>
                        </div>
                        <div class="col">
                            <h3>profile picture</h3>
                            <img src=${profilePicture} class="profpic" style="border: 3px solid ${color}" alt="pp"/>
                            <br>
                            <br>
                        </div>
                    </div>
                </div>
            <br>
            <br>
            </div>
        `;
    }

    renderEditor() {
        const {
            nickname,
            level,
            color,
            profilePicture,
        } = this.user || {};

        return html`
            <div class="body-content">
            <br>
            <br>
            <br>
            <h1 class="main-title">${this.userid}'s profile (edit mode)</h1>
                <div>
                    <button @click=${() => {
                        this.mode = "view";
                    }}>
                        view
                    </button>
                    <br>
                    <br>
                    <br>
                    <div class="form-card">
                        <div class="two-one-grid">
                            <div>
                                <h3>user id: ${this.userid}</h3>
                                <p>* userid is permanent</p>
                                <hr>
                                <mu-form
                                        .init=${init}
                                        @mu-form:submit=${this.handleSubmit}
                                >
                                    <dl>
                                        <dt>display name</dt>
                                        <dd><input name="nickname" value=${nickname}  required /></dd>
                
                                        <dt>level</dt>
                                        <dd><input name="level" type="number" min="0" value=${level}  required /></dd>
                
                                        <dt>favorite color</dt>
                                        <dd><input name="color" type="color" value=${color} /></dd>
                                        
                                        <dt>Avatar</dt>
                                        <dd>
                                            <input
                                                type="file"
                                                @change=${(e: InputEvent) => {
                                                    const target = e.target as HTMLInputElement;
                                                    const files = target.files;
                                                    if (files && files.length) {
                                                        this.handleAvatarSelected(files)
                                                    }
                                                }}
                                            />
                                        </dd>
                                    </dl>
                                    <br>
                                    <br>
                                    <br>
                            </div>
                            <div class="col">
                                <h3>profile picture</h3>
                                <img src=${this._profile_pic || profilePicture} class="profpic" style="border: 3px solid ${color}" alt="pp"/>
                                <br>
                                <br>
                            </div>
                        </div>
                        </div>
                    </mu-form>
                </div>
                <br>
        `;
    }

    static styles = [
        reset.styles,
        headings.styles,
        css`
            dt {
                font-size: 1.17em;
            }
            
            .main-title {
                font-size: 2rem;
                text-shadow: .2em .15em var(--color-text-shadow);
                text-align: center;
            }

            .card {
                border: 2px solid var(--color-line);
                border-radius: 1em;
            }

            .form-card {
                padding: 0 1.5em;
                border: 2px solid var(--color-line);
                border-radius: 1em;
            }

            .banner {
                padding: 0.25em 1em;
                text-align: left;
                background-color: var(--color-secondary);
                font-size: var(--font-size-medium);

                background: var(--color-seven);
            }

            .card-content {
                padding-left: 1.25em;
            }

            .carrot {
                font-size: 0.7em;
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
                padding-top: 1em;
            }

            .profpic {
                width: 300px;
                height: 300px;
                border-radius: 50%;
                object-fit: cover;
            }

            button {
                font-family: "Mansalva", sans-serif;
                font-size: 1em;
                border: 2px solid var(--color-line);
                padding: 0.25em 1em;
                background-color: var(--color-primary);
                border-radius: 30%;
            }

            mu-form {
                display: contents;
            }

            input {
                margin: 1em 0;
                font: inherit;
            }

            dl, dt {
                font-family: "mansalva", sans-serif;
            }
        `];

    connectedCallback() {
        super.connectedCallback();
        if (this.userid) {
            console.log("Dispatching select message for:", this.userid);
            this.dispatchMessage(["profile/select", { userid: this.userid }]);
            console.log("profile" + this.user);
        }
    }

    attributeChangedCallback(
        name: string,
        oldValue: string,
        newValue: string
    ) {
        super.attributeChangedCallback(name, oldValue, newValue);
        if (
            name === "userid" &&
            oldValue !== newValue &&
            newValue
        ) {
            this.dispatchMessage([
                "profile/select",
                { userid: newValue }
            ]);
        }
    }

    @state()
    _profile_pic? : string;

    handleSubmit(event: Form.SubmitEvent<User>) {
        const json: object = {
            ...this.user,
            ...event.detail
        }

        if (this._profile_pic) (json as User).profilePicture = this._profile_pic;

        if ( this.userid ) {
            this.dispatchMessage(["profile/save", {
                userid: this.userid,
                profile: json as User,
                onSuccess: () =>
                    this.mode = "view",
                onFailure: (err) => {
                    console.log("Error saving profile", err);
                }
            }]);
        }
    }

    handleAvatarSelected(files: FileList) {
        if (files && files.length) {
            const reader = new Promise((resolve, reject) => {
                const fr = new FileReader();
                fr.onload = () => resolve(fr.result);
                fr.onerror = (err) => reject(err);
                fr.readAsDataURL(files[0]);
            });

            reader.then((result: unknown) =>
                (this._profile_pic = result as string));
        }
    }

    firstUpdated() {
        if (this.userid) {
            this.dispatchMessage([
                "profile/select",
                { userid: this.userid }
            ]);
        }
    }
}