import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Contact } from "../models/Contact.models.js";
import mongoose, { isValidObjectId } from "mongoose";

const createContact = asyncHandler(async (req, res) => {
  try {
    const { name, email, group } = req.body;
    if (!name || !email) {
      throw new ApiError(400, "Name and email are required");
    }
    const existedContact = await Contact.findOne({ email });
    if (!existedContact) {
      const contact = await Contact.create({
        name,
        email,
        group,
      });
      return res
        .status(201)
        .json(new ApiResponse(201, contact, "Contact created successfully"));
    } else {
      throw new ApiError(400, "Contact already exists");
    }
  } catch (error) {
    throw new ApiError(500, error?.message);
  }
});

const findContactById = asyncHandler(async (req, res) => {
  try {
    const { contactId } = req.params;
    if (!isValidObjectId(contactId)) {
      throw new ApiError(400, "Invalid contact id");
    }
    const contact = await Contact.findById(contactId);
    if (!contact) {
      throw new ApiError(404, "Contact not found");
    }
    return res.status(200).json(new ApiResponse(200, contact, "Contact found"));
  } catch (error) {
    throw new ApiError(500, error?.message);
  }
});

const findContact = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw new ApiError(400, "Email required");
    }
    const contact = await Contact.findOne({ email });
    if (!contact) {
      throw new ApiError(404, "Contact not found");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, contact, "Contact found successfully"));
  } catch (error) {
    throw new ApiError(500, error?.message);
  }
});

const updateContact = asyncHandler(async (req, res) => {
  try {
    const { contactId } = req.params;
    if (!isValidObjectId(contactId)) {
      throw new ApiError(400, "Invalid contact id");
    }
    const contact = await Contact.findById(contactId);
    if (!contact) {
      throw new ApiError(404, "Contact not found");
    }
    const { name, email, group } = req.body;
    if (!name || !email) {
      throw new ApiError(400, "Name and email are required");
    }
    if (contact.owner.toString() !== req.user?._id.toString()) {
      throw new ApiError(403, "You are not authorized to update this contact");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      {
        $set: {
          name: name.trim(),
          email: email.trim(),
          group,
        },
      },
      { new: true }
    ).populate("owner", "name email -password");
    return res
      .status(200)
      .json(
        new ApiResponse(200, updatedContact, "Contact updated successfully")
      );
  } catch (error) {
    throw new ApiError(500, error?.message);
  }
});
export { createContact, findContactById, findContact, updateContact };
