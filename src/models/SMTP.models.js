import mongoose, { Schema, model } from "mongoose";

const smtpSchema = new Schema(
  {
    provider: {
      type: String,
      required: true,
    },
    host: {
      type: String,
      required: true,
    },
    port: {
      type: Number,
      required: true,
    },
    secure: {
      type: Boolean,
      default: false,
    },
    smtpUsername: {
      type: String,
      required: true,
    },
    smtpPassword: {
      type: String,
      required: true,
    },
    fromName: {
      type: String,
      required: true,
    },
    fromEmail: {
      type: String,
      required: true,
      validate: {
        validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message: "{VALUE} is not a valid email address.",
      },
    },
    repltToEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },
    rateLimit: {
      type: Number, // Emails per minute
      default: 50, // Gmail’s recommended limit for bulk sending
    },
  },
  { timestamps: true }
);

module.exports = model("SMTP", smtpSchema);
