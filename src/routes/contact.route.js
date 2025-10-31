import express from "express";
import { Router } from "express";
const router = Router();
import {
  createContact,
  findContactById,
  findContact,
  updateContact,
} from "../controllers/contact.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

router.use(verifyJWT);
router.route("/").post(createContact);
router.route("/:contactId").get(findContactById);
router.route("/find").post(findContact);
router.route("/:contactId").patch(updateContact);

export default router;
