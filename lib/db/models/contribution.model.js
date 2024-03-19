import mongoose from "mongoose";

const Schema = mongoose.Schema;
const daily_schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

export const Contribution =
  mongoose.models["Contributions"] ||
  mongoose.model("Contributions", daily_schema);
