import { Schema, model } from "mongoose";
import { Egg } from "../models/egg";

const EggSchema = new Schema<Egg>(
    {
        eggname: String,
        cost: String,
        imgsrc: String,
        rarity: [Number]
    },
    { collection: "egg" }
);

const EggModel = model<Egg>(
    "Egg",
    EggSchema
);

function index(): Promise<Egg[]> {
    return EggModel.find();
}

function get(eggname: String): Promise<Egg> {
    return EggModel.find({ eggname })
        .then((list) => list[0])
        .catch((err) => {
            throw `${eggname} Not Found`;
        });
}

export default { index, get };
