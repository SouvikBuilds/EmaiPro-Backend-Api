import mongoose, { Schema, model } from "mongoose";

const groupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);
groupSchema.index({ name: "text", slug: "text" });

groupSchema.pre("save", async function (next) {
  this.slug = this.name.toLowerCase().replace(/\s+/g, "-");
  next();
});

export const Group = model("Group", groupSchema);
