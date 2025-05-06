import { html, css, LitElement } from "lit";

export class TestingElement extends LitElement {
    static styles = css`
    h1 {
      font-size: 24px;
      background: red;
    }
  `;

    render() {
        return html`<h1 class="nice">meep</h1>`;
    }
}
