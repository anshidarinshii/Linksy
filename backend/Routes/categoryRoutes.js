console.log("✅ categoryRoutes.js loaded");

const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const Resource = require("../models/Resource");

// ✅ GET all categories    
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find({}, "name description");
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET single category by ID
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id, "name description");
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json({ error: "Invalid category ID format" });
  }
});

// ✅ POST create category
router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });

    const newCategory = new Category({ name, description });
    await newCategory.save();

    res.status(201).json({
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (err) {
    res.status(400).json({ error: err.message || "Failed to create category" });
  }
});

// ✅ GET all resources under a specific category
router.get("/:id/resources", async (req, res) => {
  try {
    const { id } = req.params;

    // ❌ removed .populate()
    const resources = await Resource.find({ category: id });

    res.status(200).json(resources);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

