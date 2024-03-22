import mongoose from "mongoose";

const Schema = mongoose.Schema;
const DailySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  habit_id: {
    type: Schema.Types.ObjectId,
    ref: "Charts",
  },
});

export const Contribution =
  mongoose.models["Contributions"] ||
  mongoose.model("Contributions", DailySchema);
