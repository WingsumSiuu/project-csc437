import { Schema, model } from "mongoose";
import { Bear, Quest } from "../models/bear";

const QuestSchema = new Schema<Quest>(
    {
        title: String,
        tasks: [String],
        reward: String,
    },
    { _id: false }
);

const BearSchema = new Schema<Bear>(
    {
        bearname: String,
        desc: String,
        image: String,
        quests: [QuestSchema],
    },
    { collection: "Bear" }
);


const BearModel = model<Bear>(
    "Bear",
    BearSchema
);

function index(): Promise<Bear[]> {
    return BearModel.find();
}

function get(name: String): Promise<Bear> {
    return BearModel.findOne({ bearname: name })
        .then((bear) => {
            if (!bear) {
                throw new Error(`${name} not found`);
            }
            return bear;
        })
        .catch((err) => {
            throw err.message;
        });

}

export default { index, get };
