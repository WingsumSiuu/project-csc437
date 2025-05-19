"use strict";
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
  "egg",
  EggSchema
);
const BeeSchema = new import_mongoose.Schema(
  {
    beename: String,
    rarity: String,
    desc: String,
    ability: String,
    imgsrc: String,
    stats: [String]
  },
  { collection: "bee" }
);
const BeeModel = (0, import_mongoose.model)(
  "bee",
  BeeSchema
);
