import { Schema, model } from "mongoose";
import { Field, Mob } from "../models/field";

const MobSchema = new Schema<Mob>(
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

const FieldSchema = new Schema<Field>(
    {
        fieldname: String,
        desc: String,
        image: String,
        mobs: [MobSchema],
        flowers: [String]
    },
    { collection: "Field" }
);


const FieldModel = model<Field>(
    "Field",
    FieldSchema
);

function index(): Promise<Field[]> {
    return FieldModel.find();
}

function get(name: String): Promise<Field> {
    return FieldModel.findOne({ fieldname: name })
        .then((field) => {
            if (!field) {
                throw new Error(`${name} not found`);
            }
            return field;
        })
        .catch((err) => {
            throw err.message;
        });

}

export default { index, get };
