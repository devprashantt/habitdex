import mongoose from "mongoose";

const Schema = mongoose.Schema;
const HabitSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: false,
  },
  color: {
    type: String,
    required: false,
  },
  contributions_per_day: {
    type: Number,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Habit =
  mongoose.models["Charts"] || mongoose.model("Charts", HabitSchema);
