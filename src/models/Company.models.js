import mongoose, { Schema, model } from "mongoose";

const companySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Company = model("Company", companySchema);
