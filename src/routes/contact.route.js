import express from "express";
import { Router } from "express";
const router = Router();
import {
  createContact,
  findContactById,
  findContact,
  updateContact,
  deleteContact,
  getAllContacts,
} from "../controllers/contact.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

router.use(verifyJWT);
router.route("/").post(createContact);
router.route("/find/:contactId").get(findContactById);
router.route("/find").post(findContact);
router.route("/update/:contactId").patch(updateContact);
router.route("/delete/:contactId").delete(deleteContact);
router.route("/get/:userId").get(getAllContacts);

export default router;
