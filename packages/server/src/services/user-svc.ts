import { Schema, model } from "mongoose";
import { User } from "../models/user";

const UserSchema = new Schema<User>(
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

const UserModel = model<User>(
    "User", UserSchema
);

function index(): Promise<User[]> {
    return UserModel.find();
}

function get(userid: String): Promise<User> {
    return UserModel.find({ userid })
        .then((list) => list[0])
        .catch(() => {
            throw `${userid} Not Found`;
        });
}

function update(
    userid: String,
    profile: User
): Promise<User> {
    return UserModel.findOne({ userid })
        .then((found) => {
            if (!found) throw `${userid} Not Found`;
            else
                return UserModel.findByIdAndUpdate(
                    found._id,
                    profile,
                    {
                        new: true
                    }
                );
        })
        .then((updated) => {
            if (!updated) throw `${userid} not updated`;
            else return updated as User;
        });
}

function updatePollen(userid: string, newpollen: number): Promise<User> {
    return UserModel.findOneAndUpdate(
        { userid },
        { $set: { pollen: newpollen } },
        { new: true }
    )
    .then((updated) => {
        if (!updated) throw `${userid}'s pollen not updated`;
        else return updated as User;
    });
}

function create(profile: User): Promise<User> {
    const p = new UserModel(profile);
    return p.save();
}

function remove(userid: String): Promise<void> {
    return UserModel.findOneAndDelete({ userid }).then(
        (deleted) => {
            if (!deleted) throw `${userid} not deleted`;
        }
    );
}

export default { index, get, update, updatePollen, create, remove };
