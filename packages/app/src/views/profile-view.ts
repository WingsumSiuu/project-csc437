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

    @property({ attribute: "userid" })
    userid?: string;

    @state()
    get user(): User | undefined {
        console.log("hello " + this.userid+ " "  + this.model.profile);
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

    renderView() {
        const {
            userid,
            name,
            nickname,
            level,
            color,
            profilePicture,
        } = this.user || {};

        return html`
        <button @click=${() => {
            this.mode = "edit";
        }}>
          edit
        </button>
        <p>username: ${this.userid}</p>
      <img src=${profilePicture} alt=${name} />
      <dl>
        <dt>Username</dt>
        <dd>${userid}</dd>
        <dt>Nickname</dt>
        <dd>${nickname}</dd>
        <dt>Level</dt>
        <dd>${level}</dd>
        <dt>Favorite Color</dt>
        <dd>
          <slot name="color-swatch">
            <span
              class="swatch"
              style="background: ${color}"></span>
          </slot>
          <slot name="color-name">${color}</slot>
        </dd>
      </dl>
      </section>
      </template>`;
    }

    renderEditor() {
        const {
            name,
            profilePicture
        } = this.user || {};

        return html`
            <button @click=${() => {
                this.mode = "view";
            }}>
                view
            </button>
            <p>username: ${this.userid}</p>
      <mu-form
        .init=${init}
        @mu-form:submit=${this.handleSubmit}
    }>
        <img src=${profilePicture} alt=${name} />
        <dl>
          <dt>profile picture</dt>
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
          <dt>Nickname</dt>
          <dd><input name="nickname"></dd>
          <dt>Level</dt>
          <dd><input name="level"></dd>
          <dt>Favorite Color</dt>
          <dd>
            <input type="color" name="color">
          </dd>
        </dl>
      </mu-form>`;
    }

    static styles = [
        reset.styles,
        headings.styles,
        css`
    :host {
      display: contents;
      grid-column: 2/-2;
      display: grid;
      grid-template-columns: subgrid;
    }
    section {
      display: grid;
      grid-template-columns: subgrid;
      align-items: end;
      grid-column: 1 / -1;
    }
    h1 {
      grid-row: 4;
      grid-column: auto / span 2;
    }
    img {
      display: block;
      grid-column: auto / span 2;
      grid-row: 1 / span 4;
    }
    .swatch {
      display: inline-block;
      width: 2em;
      aspect-ratio: 1;
      vertical-align: middle;
    }
    dl {
      display: grid;
      grid-column: 1 / -1;
      grid-row: 5 / auto;
      grid-template-columns: subgrid;
      align-items: baseline;
    }
    dt {
      grid-column: 1 / span 2;
      color: var(--color-text);
    }
    dd {
      grid-column: 3 / -1;
    }
    mu-form {
      display: contents;
    }
    input {
     margin: 1em 0;
     font: inherit;
    }
  `];

    connectedCallback() {
        super.connectedCallback();
        if (this.userid) {
            this.dispatchMessage(["profile/select", { userid: this.userid }]);
            console.log("profile" + this.userid);
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
    _profile_pic? : string; // the avatar, base64 encoded

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