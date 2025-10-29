import e from "express";
import { Schema, model } from "mongoose";

const auditSchema = new Schema(
  {
    action: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    type: {
      type: String,
      required: true,
      enum: ["created", "updated", "deleted"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Audit = model("Audit", auditSchema);
