import mongoose from "mongoose";

const Schema = mongoose.Schema;
const daily_schema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
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
});

export const Contribution =
  mongoose.models["Contributions"] ||
  mongoose.model("Contributions", daily_schema);
