import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log(
      "Mongodb connected.Connection Host: ",
      connectionInstance.connection.host
    );
  } catch (error) {
    console.log("Error Connecting Database", error);
    process.exit(1);
  }
};

export { connectDB };
