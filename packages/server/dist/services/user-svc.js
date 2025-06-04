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
var user_svc_exports = {};
__export(user_svc_exports, {
  default: () => user_svc_default
});
module.exports = __toCommonJS(user_svc_exports);
var import_mongoose = require("mongoose");
const UserSchema = new import_mongoose.Schema(
  {
    userid: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    nickname: { type: String, trim: true },
    level: Number,
    color: String,
    profilePicture: {
      data: Buffer,
      contentType: String
    }
  },
  { collection: "User" }
);
const UserModel = (0, import_mongoose.model)(
  "User",
  UserSchema
);
function index() {
  return UserModel.find();
}
function get(userid) {
  return UserModel.find({ userid }).then((list) => list[0]).catch(() => {
    throw `${userid} Not Found`;
  });
}
function update(userid, user) {
  return UserModel.findOneAndUpdate({ userid }, user, {
    new: true
  }).then((updated) => {
    if (!updated) throw `${userid} not found`;
    else return updated;
  });
}
function create(user) {
  const p = new UserModel(user);
  return p.save();
}
function remove(userid) {
  return UserModel.findOneAndDelete({ userid }).then((deleted) => {
    if (!deleted) throw `${userid} not deleted`;
  });
}
var user_svc_default = { index, get, update, create, remove };
