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
  contributions_per_day: [
    {
      type: Number,
      required: true,
    },
  ],
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "Teams",
  },
});

export const Charts =
  mongoose.models["Charts"] || mongoose.model("Charts", ChartSchema);
