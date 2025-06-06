import { Schema, model } from "mongoose";
import { Egg } from "../models/egg";

const EggSchema = new Schema<Egg>(
    {
        eggname: String,
        cost: String,
        imgsrc: String,
        rarity: [Number]
    },
    { collection: "Egg" }
);

const EggModel = model<Egg>(
    "Egg",
    EggSchema
);

function index(): Promise<Egg[]> {
    return EggModel.find().sort({ eggname: 1 });
}

export default { index };
