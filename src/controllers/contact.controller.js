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
        owner: req.user?._id,
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
    ).populate("owner", "name email ");
    return res
      .status(200)
      .json(
        new ApiResponse(200, updatedContact, "Contact updated successfully")
      );
  } catch (error) {
    throw new ApiError(500, error?.message);
  }
});

const deleteContact = asyncHandler(async (req, res) => {
  try {
    const { contactId } = req.params;
    if (!isValidObjectId(contactId)) {
      throw new ApiError(400, "Invalid Contact Id");
    }
    const contact = await Contact.findById(contactId);
    if (!contact) {
      throw new ApiError(404, "Contact not found");
    }
    if (contact.owner.toString() !== req.user?._id.toString()) {
      throw new ApiError(403, "You are not authorized to delete this contact");
    }
    await Contact.findByIdAndDelete(contactId);
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Contact deleted successfully"));
  } catch (error) {
    throw new ApiError(500, error?.message);
  }
});

const getAllContacts = asyncHandler(async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortType = "desc",
      userId,
    } = req.query;

    // Convert page and limit to numbers
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    // Basic filter (you can expand later)
    const filter = { contact: { $exists: true, $ne: null } };

    // If you want to show contacts of a specific user
    if (userId) {
      filter.owner = userId;
    } else if (req.user?._id) {
      filter.owner = req.user._id;
    }

    // Sorting logic
    const sortOrder = sortType === "asc" ? 1 : -1;
    const sortOption = { [sortBy]: sortOrder };

    // Fetch contacts
    const contacts = await Contact.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNumber);

    const totalContacts = await Contact.countDocuments(filter);
    const totalPages = Math.ceil(totalContacts / limitNumber);

    if (!contacts || contacts.length === 0) {
      throw new ApiError(404, "No contacts found");
    }

    // Response
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          contacts,
          pagination: {
            currentPage: pageNumber,
            totalPages,
            totalContacts,
            limit: limitNumber,
          },
          sorting: {
            sortBy,
            sortType,
          },
        },
        "Contacts fetched successfully"
      )
    );
  } catch (error) {
    throw new ApiError(500, error?.message || "Failed to fetch contacts");
  }
});

export {
  createContact,
  findContactById,
  findContact,
  updateContact,
  deleteContact,
  getAllContacts,
};
