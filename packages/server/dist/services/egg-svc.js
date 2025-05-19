"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var egg_svc_exports = {};
__export(egg_svc_exports, {
  default: () => egg_svc_default
});
module.exports = __toCommonJS(egg_svc_exports);
var import_mongoose = require("mongoose");
const EggSchema = new import_mongoose.Schema(
  {
    eggname: String,
    cost: String,
    imgsrc: String,
    rarity: [Number]
  },
  { collection: "egg" }
);
const EggModel = (0, import_mongoose.model)(
  "Egg",
  EggSchema
);
function index() {
  return EggModel.find();
}
function get(eggname) {
  return EggModel.find({ eggname }).then((list) => list[0]).catch((err) => {
    throw `${eggname} Not Found`;
  });
}
var egg_svc_default = { index, get };
