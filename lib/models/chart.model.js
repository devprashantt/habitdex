import { connectDB } from "../db/configs/connection";
import mongoose from "mongoose";

connectDB();

const Schema = mongoose.Schema;

const ChartSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    contributions_per_day: [
        {
            type: Number,
            required: true
        }
    ],
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "Teams"
    }
})

export const Individual = mongoose.models["Charts"] || mongoose.model("Charts", ChartSchema);
