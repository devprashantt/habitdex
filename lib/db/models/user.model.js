import mongoose from "mongoose";

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  primary_email: {
    type: String,
    required: true,
    unique: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: false,
  },
  clerk_user_id: {
    type: String,
    required: true,
    unique: true,
  },
  bio: {
    type: String,
    required: false,
  },
  habits: [
    {
      type: Schema.Types.ObjectId,
      ref: "Habits",
    },
  ],
});

export const User =
  mongoose.models["Users"] || mongoose.model("Users", UserSchema);
