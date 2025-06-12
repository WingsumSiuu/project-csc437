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
import { ProfileViewElement } from "./views/profile-view";
import { BearView } from "./views/bear-view";
import { PollenView } from "./views/pollen-view";
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
        path: "/app/bear/:name",
        view: (params: Switch.Params) => html`
            <bear-view src="/api/bears/${params.name}"></bear-view>
        `
    },
    {
        auth: "protected",
        path: "/app/profile/:userid",
        view: (params: Switch.Params) => html`
              <profile-view userid=${params.userid}> </profile-view>
        `
    },
    {
        auth: "protected",
        path: "/app/pollen/:userid",
        view: (params: Switch.Params) => html`
              <pollen-view userid=${params.userid}> </pollen-view>
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
    "mu-store": class AppStore extends Store.Provider<Model, Msg> {
        constructor() {
            super(update, init, "beeswarm:auth");
        }
    },
    "navbar-element": NavbarElement,
    "home-view": HomeView,
    "egg-view": EggView,
    "bee-view": BeeView,
    "field-view": FieldView,
    "bear-view": BearView,
    "noob-shop-view": NoobShopView,
    "profile-view": ProfileViewElement,
    "pollen-view": PollenView,
    "mu-switch": class AppSwitch extends Switch.Element {
        constructor() {
            super(routes, "beeswarm:history", "beeswarm:auth");
        }
    },
});

NavbarElement.initializeOnce();