import mongoose from "mongoose";

const Schema = mongoose.Schema;

const IntegrationSchema = new Schema({
  integration_name: {
    type: String,
    required: true,
    unique: true,
  },
  integration_type: {
    type: String,
    required: true,
  },
  integration_url: {
    type: String,
    required: true,
  },
  habit_id: {
    type: Schema.Types.ObjectId,
    ref: "Habits",
    required: true,
  },
});

export const Integration =
  mongoose.models["Integration"] ||
  mongoose.model("Integration", IntegrationSchema);
