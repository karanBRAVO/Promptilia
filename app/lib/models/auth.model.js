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
      lowercase: true,
      required: [true, "Username is required."],
      trim: true,
    },
    image: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/5/50/User_icon-cp.svg",
    },
    method: {
      type: String,
      lowercase: true,
      enum: ["credentials", "oauthprovider"],
      trim: true,
      required: [true, "Method is required"],
    },
  },
  { timestamps: true }
);

export const authModel =
  mongoose.models["user"] || new mongoose.model("user", authSchema);
