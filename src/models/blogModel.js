import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    content: {
      type: String,
      required: [true, "description is required"],
    },
    imageUrl: {
      type: String,
      required: [true, "Image Url is required"],
    },
    userId: {
      type: mongoose.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const BlogModel =
  mongoose.models.blogs || mongoose.model("blogs", BlogSchema);
