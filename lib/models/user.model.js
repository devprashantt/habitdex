import { connectDB } from "../db/configs/connection";
import mongoose from "mongoose";

connectDB();

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    clerk_user_id: {
        type: String,
        required: true,
        unique: true
    },
    bio: {
        type: String,
        required: false
    },
    charts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Charts"
        }
    ]
})

export const Individual = mongoose.models["Users"] || mongoose.model("Users",UserSchema);
