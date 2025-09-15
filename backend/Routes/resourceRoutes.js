console.log("✅ resourceRoutes.js loaded");

const express = require("express");
const router = express.Router();
const Resource = require("../models/Resource");

// GET all resources (only name, category, address, verified)
router.get("/", async (req, res) => {
  try {
    const resources = await Resource.find({}, "name category address verified");
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
    );
    if (!resource) {
      return res.status(404).json({ error: "Resource not found" });
    }
    res.status(200).json(resource);
  } catch (err) {
    res.status(400).json({ error: "Invalid resource ID format" });
  }
});
// POST create a new resource
router.post("/", async (req, res) => {
  try {
    const { name, description, mail, phone, address, availableAt, category, image } = req.body;

    // Validation: required fields
    if (!name || !category) {
      return res.status(400).json({ error: "Name and category are required" });
    }

    // Create new resource document
    const newResource = new Resource({
      name,
      description,
      mail,
      phone,
      address,
      availableAt,
      category,
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