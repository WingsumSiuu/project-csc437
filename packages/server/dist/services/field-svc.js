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
var field_svc_exports = {};
__export(field_svc_exports, {
  default: () => field_svc_default
});
module.exports = __toCommonJS(field_svc_exports);
var import_mongoose = require("mongoose");
const MobSchema = new import_mongoose.Schema(
  {
    mobname: String,
    level: Number,
    image: String,
    stats: {
      type: Map,
      of: Number
    }
  },
  { _id: false }
);
const FieldSchema = new import_mongoose.Schema(
  {
    fieldname: String,
    desc: String,
    image: String,
    mobs: [MobSchema],
    flowers: [String]
  },
  { collection: "Field" }
);
const FieldModel = (0, import_mongoose.model)(
  "Field",
  FieldSchema
);
function index() {
  return FieldModel.find();
}
function get(name) {
  return FieldModel.findOne({ fieldname: name }).then((field) => {
    if (!field) {
      throw new Error(`${name} not found`);
    }
    return field;
  }).catch((err) => {
    throw err.message;
  });
}
var field_svc_default = { index, get };
