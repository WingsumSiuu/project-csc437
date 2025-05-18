import { css } from "lit";

const styles = css`
    .mansalva-regular {
        font-family: "Mansalva", sans-serif;
        font-weight: 400;
        font-style: normal;
        margin: 0 0;
    }

    /* banners and things */
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

    .main-image {
        opacity: 0.65;
    }

    h3, h2, h1, p, td, th, a, li {
        color: var(--color-text);
        text-shadow: var(--color-text-shadow);
        font-family: "Mansalva", sans-serif;
    }

    /*!* text *!*/
    /*p {*/
    /*    font-family: "Times New Roman", sans-serif;*/
    /*    font-size: var(--font-size-small);*/
    /*}*/

    /* index.html */
    .header-text {
        background-color: var(--color-secondary);
        text-align: center;
        font-size: var(--font-size-larger);

    }

    .title-text {
        background-color: var(--color-tertiary);
        text-align: center;
        font-size: var(--font-size-medium);
        padding: 0.5em 0.5em 0.5em 0.5em;
    }

    .subtitle-text {
        background-color: var(--color-quaternary);
        text-align: right;
        font-size: var(--font-size-medium);
        padding: 0.15em 0.5em 0.15em 0.5em;

    }

    .index-grid {
        --page-grids: 3;
        display: grid;
        align-content: end;
        grid-template-columns: repeat(
        var(--page-grids), 1fr
    );

        gap:
                var(--box-gap);

        grid-column:
                span min(
                        5,
                        var(--page-grids)
                ) / -1;

        @media screen and (max-width: 50rem) {
            grid-template-columns: 1fr;
        }
    }

    /* at the top of each individual concept page (ie a specific field/mob page) */
    .page-title {
        font-family: "Mansalva", sans-serif;
    }

    /* image with text on top */
    .img-under-text {
        position: relative;
        text-align: center;
        color: white;
        > img {
            opacity: .6;
        }
        > p {
            background-color: rgba(0, 0, 0, 0.35);
            padding: var(--box-gap);
        }
    }

    /* centering text on image*/
    .centered {
        opacity: 1;
        /*color: black;*/
        position: absolute;
        line-height: 2em;
        font-size: 1em;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .small-border-box {
    }

    .box-grid {
        display: flex;
        flex-wrap: wrap;
        gap: var(--box-gap);

        & > * {
            width: fit-content;
            flex-grow: 1;
        }
    }

    .two-one-grid {   /* for field, shop (needs a new name) */
        display: grid;
        grid-template-columns: 2fr 1fr;
        width: 100%;
        gap: var(--box-gap);

        @media screen and (max-width: 50rem) {
            grid-template-columns: 1fr;
        }
    }

    .mob-box {     /* for boxes displaying mobs on each field */
        border: var(--box-border-width) solid var(--box-border-color);
        padding: 10px 20px;

        >.mob-img {
            width: 90%;
        }
    }

    .table {   /* the stat table (for borders, spacing) */
        width: 100%;
        border-collapse: collapse;

        >th, td {
            border: 1px solid black;
            padding: 10px 1px 10px 10px;
            text-align: left;
        }
    }

    .flower-box {   /* for types of flowers on fields */
        display: flex;
        flex-wrap: wrap;
        border: var(--box-border-width) solid var(--box-border-color);

        >.flower-icon {
            width: var(--icon-size);
            height: var(--icon-size);
        }
    }

    .shop-box {     /* for player accessories */
        display: flex;
        align-items: center;
        gap: 20px;
        border: var(--box-border-width) solid var(--box-border-color);
        padding: 20px 25px;
        //margin-top: -1.35em;

        > img {
            width: 150px;
            margin: 0 1.5em 0 1.5em;
        }

        .info {     /* stats, cost, etc */
            flex-grow: 1;
            margin: 0 1.5em 0 0;
            padding-bottom: 1.5em;
        }
    }

    .shop-tool-box {    /* for player tools */
        border: var(--box-border-width) solid var(--box-border-color);
        padding: 0 20px;
        margin-bottom: 1em;

        > img {
            width: 150px;
        }

    }

    .bee-container {
        display: flex;
        flex-wrap: wrap;
        gap: 1em;
    }

    .bee-box {
        border: var(--box-border-width) solid var(--box-border-color);
        flex-basis: 250px;
        flex-grow: 1;
        padding: 0 1em 1em 1em;

        > img {
            width: 80%;
        }
    }

    .bear-grid {   /* for image, bear quests */
        display: grid;
        grid-template-columns: 1fr 2fr;
        width: 100%;
        gap: var(--box-gap);

        @media screen and (max-width: 50rem) {
            grid-template-columns: 1fr;
        }

        >img {
            width: 100%;
        }

        > .info {
        }

        & > * .questbox {
            border: 2px solid black;
            margin-bottom: 1em;
        }

    }

    .noobshop {
        background-color: rgba(221, 252, 228, 0.5);
    }

    .common {
        background-color: var(--color-common);
    }

    .legendary {
        background-color: var(--color-legendary);
    }

    svg.icon {
        display: inline;
        height: 1.75em;
        width: 1.75em;
        vertical-align: text-top;
        fill: currentColor;
    }
`;

export default { styles };