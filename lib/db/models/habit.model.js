import mongoose from "mongoose";

const Schema = mongoose.Schema;
const HabitSchema = new Schema({
  habit_name: {
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
  color_theme: {
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
  mongoose.models["Habits"] || mongoose.model("Habits", HabitSchema);
