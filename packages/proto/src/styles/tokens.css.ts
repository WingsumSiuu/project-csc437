import { css } from "lit";

const styles = css`
    :root {
        --color-text: rgb(51 51 51);
        --color-text-shadow: rgb(225, 197, 119);

        --color-link: rgb(135, 157, 193);

        --color-common: lightgoldenrodyellow;
        --color-legendary: lightblue;

        --color-page-bg: white;

        --color-primary: #fdf2b0;
        --color-secondary: #f3d17c;
        --color-tertiary: #d9e0a3;
        --color-quaternary: #c4cea1;
        --color-quinary: #cf9963;

        --box-width: 250px;
        --box-padding-width: 10px;
        --box-padding-height: 20px;

        --font-size-small: 1em;
        --font-size-medium: 1.25em;
        --font-size-large: 1.5em;
        --font-size-larger: 2em;

        --box-gap: 2em;

        --flower-box-padding: 0.25em;

        --mob-img: 150px;
        --mob-box: 250px;

        --icon-size: 3.5em;

        --box-border-width: 2px;
        --box-border-color: black;
    }

    body.dark-mode {
        --color-page-bg: rgb(48, 48, 48);

        --color-primary: #a88d8d;
        --color-secondary: #6a7e79;
        --color-tertiary: rgb(119, 80, 80);
        --color-quaternary: #798a72;
        --color-quinary: rgba(221, 252, 228, 0.5);

        --color-text: rgb(255, 255, 255);
        --color-text-shadow: rgb(166, 85, 85);

        --box-border-color: white;
    }
`;

export default { styles };