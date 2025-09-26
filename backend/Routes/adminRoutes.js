const express = require("express");
const User = require("../models/User");
const Resource = require("../models/Resource");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// Get dashboard stats
router.get("/stats", protect, adminOnly, async (req, res) => {
  try {
    const pendingResources = await Resource.countDocuments({ status: "pending" });
    const totalUsers = await User.countDocuments();
    const activeModerators = await User.countDocuments({ role: "moderator" });
    res.json({ pendingResources, totalUsers, activeModerators });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get pending resources
router.get("/pending-resources", protect, adminOnly, async (req, res) => {
  try {
    const pending = await Resource.find({ status: "pending" })
      .populate("submittedBy", "name email");
    res.json(pending);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Approve resource
router.patch("/resources/:id/approve", protect, adminOnly, async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );
    res.json(resource);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Reject resource
router.patch("/resources/:id/reject", protect, adminOnly, async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );
    res.json(resource);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
