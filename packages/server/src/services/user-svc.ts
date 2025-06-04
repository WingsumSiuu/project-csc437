import { Schema, model } from "mongoose";
import { User } from "../models/user";

const UserSchema = new Schema<User>(
    {
        userid: { type: String, required: true, trim: true },
        name: { type: String, required: true, trim: true },
        nickname: { type: String, trim: true },
        level: Number,
        color: String,
        profilePicture: {
            data: Buffer,
            contentType: String
        },
    },
    { collection: "User" }
);

const UserModel = model<User>(
    "User",
    UserSchema
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
    user: User
): Promise<User> {
    return UserModel.findOneAndUpdate({ userid }, user, {
        new: true
    }).then((updated) => {
        if (!updated) throw `${userid} not found`;
        else return updated as User;
    });
}

function create(user: User): Promise<User> {
    const p = new UserModel(user);
    return p.save();
}

function remove(userid: String): Promise<void> {
    return UserModel
        .findOneAndDelete({ userid })
        .then((deleted) => {
            if (!deleted) throw `${userid} not deleted`;
        });
}

export default { index, get, update, create, remove };
