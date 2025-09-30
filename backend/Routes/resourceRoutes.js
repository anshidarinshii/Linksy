const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const Resource = require("../models/Resource");
const Category = require("../models/Category");

// ----------------------------
// GET /api/resources
// Public - list with simple filters + pagination
// ----------------------------
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 12, q = "", category = "", verified = "", contributedBy = "" } = req.query;

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
    if (category) filter.category = category;
    if (verified === "true") filter.verified = true;
    if (contributedBy) filter.contributedBy = contributedBy;

    const [data, total] = await Promise.all([
      Resource.find(filter)
        .select("name category verified address contributedBy")
        .populate("category", "name"),
      Resource.countDocuments(filter)
    ]);

    res.json({ data, total, page: pageNum, limit: limitNum });
  } catch (err) {
    console.error("❌ Error fetching resources:", err.message);
    res.status(500).json({ error: "Failed to fetch resources" });
  }
});


//search resources

router.get("/search", async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) return res.json([]);

    const resources = await Resource.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { address: { $regex: query, $options: "i" } },
      ],
    }).populate("category", "name");

    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/resources/:id
router.get("/:id", async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id)
      .populate("category", "name") // ✅ only category name
      .populate("contributedBy", "name"); // ✅ user info

    if (!resource) return res.status(404).json({ error: "Resource not found" });

    res.status(200).json(resource);
  } catch {
    res.status(400).json({ error: "Invalid resource ID format" });
  }
});





// ----------------------------
// POST /api/resources
// Private - only logged-in users
// ----------------------------
router.post("/", protect, async (req, res) => {
  try {
    const { name, category, description, mail, phone, address, availableAt, image } = req.body;
    if (!name || !category) {
      return res.status(400).json({ error: "Name and category are required" });
    }

    // 🔑 Find category by name, or create new if it doesn't exist
    let categoryDoc = await Category.findOne({ name: category });
    if (!categoryDoc) {
      categoryDoc = new Category({ name: category });
      await categoryDoc.save();
    }

    const newResource = new Resource({
      name,
      description,
      mail,
      phone,
      address,
      availableAt,
      category: categoryDoc._id, // ✅ store ObjectId
      image,
      contributedBy: req.user.id, // from JWT
    });

    await newResource.save();

    // populate category for response
    const populatedResource = await Resource.findById(newResource._id).populate("category", "name");

    res.status(201).json({ message: "Resource added", resource: populatedResource });
  } catch (err) {
    console.error("❌ Error creating resource:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});


// ----------------------------
// PATCH /api/resources/:id/verify
// Private - admin only
// ----------------------------
router.patch("/:id/verify", protect, adminOnly, async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(
      req.params.id,
      { verified: true },
      { new: true, fields: "name verified" }
    );
    if (!resource) return res.status(404).json({ error: "Resource not found" });
    res.status(200).json({ message: "Resource verified", resource });
  } catch {
    res.status(400).json({ error: "Invalid resource ID format" });
  }
});

// ----------------------------
// PATCH /api/resources/:id/flag
// Private - any logged-in user
// ----------------------------
router.patch("/:id/flag", protect, async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(
      req.params.id,
      { flagged: true },
      { new: true, fields: "name flagged" }
    );
    if (!resource) return res.status(404).json({ error: "Resource not found" });
    res.status(200).json({ message: "Resource flagged", resource });
  } catch {
    res.status(400).json({ error: "Invalid resource ID format" });
  }
});

// ----------------------------
// DELETE /api/resources/:id
// Private - admin only
// ----------------------------
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) return res.status(404).json({ error: "Resource not found" });
    res.status(200).json({ message: "Resource deleted successfully" });
  } catch {
    res.status(400).json({ error: "Invalid resource ID format" });
  }
});

module.exports = router;
