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
var bee_svc_exports = {};
__export(bee_svc_exports, {
  default: () => bee_svc_default
});
module.exports = __toCommonJS(bee_svc_exports);
var import_mongoose = require("mongoose");
const BeeSchema = new import_mongoose.Schema(
  {
    beename: String,
    rarity: String,
    desc: String,
    ability: String,
    imgsrc: String,
    stats: [String]
  },
  { collection: "Bee" }
);
const BeeModel = (0, import_mongoose.model)(
  "Bee",
  BeeSchema
);
function index() {
  return BeeModel.find();
}
var bee_svc_default = { index };
