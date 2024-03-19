import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ChartSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: false,
    default: "",
  },
  contributions_per_day: {
    type: Number,
    required: true,
  },
  contributions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Contribution",
    },
  ],
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  color: {
    type: String,
  },
});

export const Chart =
  mongoose.models["Charts"] || mongoose.model("Charts", ChartSchema);
