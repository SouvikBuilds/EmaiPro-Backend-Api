import mongoose, { Schema, model } from "mongoose";

const templateSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "done"],
      required: true,
      default: "done",
    },
    variables: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export const Template = model("Template", templateSchema);
