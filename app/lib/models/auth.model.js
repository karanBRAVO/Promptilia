import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: [true, "Email already exists."],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      trim: true,
    },
    username: {
      type: String,
      required: [true, "Username is required."],
      trim: true,
    },
    image: {
      type: String,
      default: "https://next-auth.js.org/img/logo/logo-sm.png",
    },
  },
  { timestamps: true }
);

export const authModel =
  mongoose.models["user"] || new mongoose.model("user", authSchema);
