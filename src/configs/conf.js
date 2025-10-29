import dotenv from "dotenv";
dotenv.config();
import { DB_NAME } from "../constants.js";

const config = {
  PORT: process.env.PORT || 8000,
  MONGODB_URL: process.env.MONGODB_URL,
  DB_NAME: DB_NAME,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY,
};

export default config;
