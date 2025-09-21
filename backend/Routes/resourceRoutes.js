// backend/Routes/resourceRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Resource = require("../models/Resource");


// GET /api/resources - list with simple filters + pagination
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 12, q = "", category = "", verified = "" } = req.query;

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, Math.min(50, parseInt(limit, 10) || 12));

    const filter = {};
    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { address: { $regex: q, $options: "i" } }
      ];
    }
    if (category) {
      filter.category = category;
    }
    if (verified === "true") filter.verified = true;

    const [data, total] = await Promise.all([
      Resource.find(filter)
        .select("name category verified address") // Select only needed fields
        .populate("category", "name"),           // Populate only category name
      Resource.countDocuments(filter)
    ]);

    res.json({ data, total, page: pageNum, limit: limitNum });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch resources" });
  }
});


// GET /api/resources/:id - single resource
router.get("/:id", async (req, res) => {
  try {
    const resource = await Resource.findById(
      req.params.id,
      "name category verified address image description phone mail availableAt"
    );
    if (!resource) return res.status(404).json({ error: "Resource not found" });
    res.status(200).json(resource);
  } catch {
    res.status(400).json({ error: "Invalid resource ID format" });
  }
});



// POST /api/resources - only logged-in users can add
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, category } = req.body;
    if (!name || !category) {
      return res.status(400).json({ error: "Name and category are required" });
    }

    const newResource = new Resource({
      ...req.body,
      createdBy: req.user.id,  // 👈 store user ID from JWT
    });

    await newResource.save();
    res.status(201).json({ message: "Resource added", resource: newResource });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


// PATCH /api/resources/:id/verify
router.patch("/:id/verify", async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(
      req.params.id, { verified: true }, { new: true, fields: "name verified" }
    );
    if (!resource) return res.status(404).json({ error: "Resource not found" });
    res.status(200).json({ message: "Resource verified", resource });
  } catch {
    res.status(400).json({ error: "Invalid resource ID format" });
  }
});

// PATCH /api/resources/:id/flag
router.patch("/:id/flag", async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(
      req.params.id, { flagged: true }, { new: true, fields: "name flagged" }
    );
    if (!resource) return res.status(404).json({ error: "Resource not found" });
    res.status(200).json({ message: "Resource flagged", resource });
  } catch {
    res.status(400).json({ error: "Invalid resource ID format" });
  }
});

// DELETE /api/resources/:id
router.delete("/:id", async (req, res) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) return res.status(404).json({ error: "Resource not found" });
    res.status(200).json({ message: "Resource deleted successfully" });
  } catch {
    res.status(400).json({ error: "Invalid resource ID format" });
  }
});

module.exports = router;