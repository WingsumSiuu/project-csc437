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

// oops index does the exact thing
// function get(): Promise<Egg[]> {
//     return EggModel.find().sort({ eggname: 1 })
//         .then((eggs: Egg[]) => {
//             //console.log(eggs);
//             return eggs;
//         })
//         .catch((err) => {
//             throw `eggs not found`;
//         });
// }

export default { index };
