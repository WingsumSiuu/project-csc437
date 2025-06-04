import { Schema, model } from "mongoose";
import { Bee } from "../models/bee";

const BeeSchema = new Schema<Bee>(
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

const BeeModel = model<Bee>(
    "Bee",
    BeeSchema
);

function index(): Promise<Bee[]> {
        return BeeModel.find();
}

export default { index };
