import { css } from "lit";

const styles = css`
    img {
        max-width: 100%;
    }

    body {
        margin: 0;
        background-color: var(--color-page-bg);
    }

    /* stuff under header, etc */
    .body-content {
        margin: 0 3em 0 3em;

    }

    .body-content-field {
        margin: 0 0.5em 0 0.5em;
    }
`;

export default { styles };