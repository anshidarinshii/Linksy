console.log("✅ resourceRoutes.js loaded");

const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const Resource = require("../models/Resource");

// GET all resources under a specific category
router.get("/:id/resources", async (req, res) => {
  try {
    const { id } = req.params;

    const resources = await Resource.find({ category: id })
      .populate("category", "name description");

    res.status(200).json(resources);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET a single resource by ID (detailed fields)
router.get("/:id", async (req, res) => {
  try {
    const resource = await Resource.findById(
      req.params.id,
      "name category verified image description phone mail availableAt"
    ).populate("category", "name description"); // ✅ fetch category details

    if (!resource) {
      return res.status(404).json({ error: "Resource not found" });
    }
    res.status(200).json(resource);
  } catch (err) {
    res.status(400).json({ error: "Invalid resource ID format" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, description, mail, phone, address, availableAt, category, image } = req.body;

    // Validation: required fields
    if (!name || !category) {
      return res.status(400).json({ error: "Name and category are required" });
    }

    // ✅ Check if category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ error: "Invalid category ID" });
    }

    // Create new resource document
    const newResource = new Resource({
      name,
      description,
      mail,
      phone,
      address,
      availableAt,
      category, // ✅ safe to store, since it’s a valid ObjectId
      image
    });

    await newResource.save();

    res.status(201).json({
      message: "Resource created successfully",
      resource: newResource
    });
  } catch (err) {
    res.status(400).json({ error: err.message || "Failed to create resource" });
  }
});

// PATCH verify a resource
router.patch("/:id/verify", async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(
      req.params.id,
      { verified: true },
      { new: true, fields: "name verified" }
    );
    if (!resource) {
      return res.status(404).json({ error: "Resource not found" });
    }
    res.status(200).json({ message: "Resource verified", resource });
  } catch (err) {
    res.status(400).json({ error: "Invalid resource ID format" });
  }
});

// PATCH flag a resource
router.patch("/:id/flag", async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(
      req.params.id,
      { flagged: true },
      { new: true, fields: "name flagged" }
    );
    if (!resource) {
      return res.status(404).json({ error: "Resource not found" });
    }
    res.status(200).json({ message: "Resource flagged", resource });
  } catch (err) {
    res.status(400).json({ error: "Invalid resource ID format" });
  }
});

// DELETE a resource
router.delete("/:id", async (req, res) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) {
      return res.status(404).json({ error: "Resource not found" });
    }
    res.status(200).json({ message: "Resource deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Invalid resource ID format" });
  }
});

module.exports = router;