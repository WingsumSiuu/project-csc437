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
var bear_svc_exports = {};
__export(bear_svc_exports, {
  default: () => bear_svc_default
});
module.exports = __toCommonJS(bear_svc_exports);
var import_mongoose = require("mongoose");
const QuestSchema = new import_mongoose.Schema(
  {
    title: String,
    tasks: [String],
    reward: String
  },
  { _id: false }
);
const BearSchema = new import_mongoose.Schema(
  {
    bearname: String,
    desc: String,
    image: String,
    quests: [QuestSchema]
  },
  { collection: "Bear" }
);
const BearModel = (0, import_mongoose.model)(
  "Bear",
  BearSchema
);
function index() {
  return BearModel.find();
}
function get(name) {
  return BearModel.findOne({ bearname: name }).then((bear) => {
    if (!bear) {
      throw new Error(`${name} not found`);
    }
    return bear;
  }).catch((err) => {
    throw err.message;
  });
}
var bear_svc_default = { index, get };
