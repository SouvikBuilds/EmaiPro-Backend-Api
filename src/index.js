import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants.js";
// import express from "express";

import { connectDB } from "./configs/index.js";
import app from "./app.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(
        `App is Listening on: http://localhost:${process.env.PORT || 8000}`
      );
    });
  })
  .catch((error) => {
    console.log("Mongodb connection failed", error);
    throw new Error(error);
  });
