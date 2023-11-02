import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    profilePic: {
      type: String,
      required: [true, "Profile picture is required"],
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const userModel =
  mongoose.models.users || mongoose.model("users", userSchema);
