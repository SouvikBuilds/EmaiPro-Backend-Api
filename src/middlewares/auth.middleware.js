import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/User.models.js";
import config from "../configs/conf.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const accessToken =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    console.log("Request cookies: ", req.cookies);
    console.log("AccessToken: ", accessToken);
    if (!accessToken) {
      throw new ApiError(401, "Unauthorized access token");
    }
    const decodedAccessToken = jwt.verify(
      accessToken,
      config.ACCESS_TOKEN_SECRET
    );
    const user = await User.findById(decodedAccessToken?._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

export { verifyJWT };
