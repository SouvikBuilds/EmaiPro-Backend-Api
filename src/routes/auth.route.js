import express from "express";
import { Router } from "express";
const router = Router();
import {
  createUser,
  generateAccessAndRefreshTokens,
  refreshAccessToken,
  loginUser,
  logOutUser,
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

router.route("/").post(createUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logOutUser);
router.route("/refresh-token").post(refreshAccessToken);
router
  .route("/generate-tokens")
  .post(verifyJWT, generateAccessAndRefreshTokens);

export default router;
