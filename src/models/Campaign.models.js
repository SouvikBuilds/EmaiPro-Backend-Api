import mongoose, { Schema, model } from "mongoose";
const campaignSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      minlength: 5,
      maxlength: 1000,
    },
    image: {
      type: String,
      required: true,
    },
    template: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Template",
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed", "failed"],
      default: "pending",
    },
    scheduledTime: {
      type: Date,
    },
    sentCount: {
      type: Number,
      default: 0,
    },
    failedCount: {
      type: Number,
      default: 0,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Campaign = model("Campaign", campaignSchema);
