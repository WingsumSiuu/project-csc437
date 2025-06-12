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
    nickname: { type: String, trim: true },
    level: Number,
    color: String,
    profilePicture: String,
    pollen: Number
  },
  { collection: "user_profiles" }
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
function update(userid, profile) {
  return UserModel.findOne({ userid }).then((found) => {
    if (!found) throw `${userid} Not Found`;
    else
      return UserModel.findByIdAndUpdate(
        found._id,
        profile,
        {
          new: true
        }
      );
  }).then((updated) => {
    if (!updated) throw `${userid} not updated`;
    else return updated;
  });
}
function updatePollen(userid, newpollen) {
  return UserModel.findOneAndUpdate(
    { userid },
    { $set: { pollen: newpollen } },
    { new: true }
  ).then((updated) => {
    if (!updated) throw `${userid}'s pollen not updated`;
    else return updated;
  });
}
function create(profile) {
  const p = new UserModel(profile);
  return p.save();
}
function remove(userid) {
  return UserModel.findOneAndDelete({ userid }).then(
    (deleted) => {
      if (!deleted) throw `${userid} not deleted`;
    }
  );
}
var user_svc_default = { index, get, update, updatePollen, create, remove };
