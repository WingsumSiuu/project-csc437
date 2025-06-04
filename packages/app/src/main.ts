import {
    Auth, define, History, Switch, Store
} from "@calpoly/mustang";
import { html } from "lit";
import { NavbarElement } from "./components/navbar";
import { HomeView } from "./views/home-view";
import { EggView } from "./views/egg-view";
import { BeeView } from "./views/bee-view";
import { FieldView } from "./views/field-view";
import { NoobShopView } from "./views/noob-shop-view";

import { init, Model } from "./model";
import { Msg } from "./messages";
import update from "./update";


const routes: Switch.Route[] = [
    {
        path: "/app/field/:name",
        view: (params: Switch.Params) => html`
            <field-view src="/api/fields/${params.name}"></field-view>
        `
    },
    {
        auth: "protected",
        path: "/app/profile/:id",
        view: (params: Switch.Params) => html`
              <profile-view user-id=${params.id}>
              </profile-view>
        `
    },
    {
        path: "/app/npcs/:name",
        view: (params: Switch.Params) => html`
            <npc-view npcname=${params.name}></npc-view>
        `
    },
    {
        path: "/app/shops/noob-shop",
        view: () => html`
            <noob-shop-view></noob-shop-view>
        `
    },
    {
        path: "/app/bees",
        view: () => html`
            <bee-view></bee-view>
        `
    },
    {
        path: "/app/eggs",
        view: () => html`
            <egg-view></egg-view>
        `
    },
    {
        path: "/app",
        view: () => html`
            <home-view></home-view>
        `
    },
    {
        path: "/",
        redirect: "/app"
    }
];

define({
    "mu-auth": Auth.Provider,
    "mu-history": History.Provider,
    "mu-store": class AppStore extends Store.Provider<
        Model,
        Msg
    > {
        constructor() {
            super(update, init, "beeswarm:auth");
        }
    },
    "navbar-element": NavbarElement,
    "home-view": HomeView,
    "egg-view": EggView,
    "bee-view": BeeView,
    "field-view": FieldView,
    "noob-shop-view": NoobShopView,
    "mu-switch": class AppSwitch extends Switch.Element {
        constructor() {
            super(routes, "beeswarm:history", "beeswarm:auth");
        }
    },
});

NavbarElement.initializeOnce();