const express = require("express");
const Feedback = require("../models/Feedback");
const authMiddleware = require("../middleware/authMiddleware").protect;

const router = express.Router();

/**
 * ➕ Add feedback to a resource
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { resourceId, comment } = req.body;
    if (!comment) {
      return res.status(400).json({ error: "Comment is required" });
    }

    const feedback = new Feedback({
      userId: req.user.id,
      resourceId,
      comment,
    });

    await feedback.save();
    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * 📥 Get all feedbacks for a resource
 */
router.get("/resource/:resourceId", async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ resourceId: req.params.resourceId })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * 👤 Get all feedbacks by a user
 */
router.get("/user/:userId", async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ userId: req.params.userId })
      .populate("resourceId", "name category")
      .sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * ✏️ Update feedback (only owner)
 */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) return res.status(404).json({ error: "Feedback not found" });

    if (feedback.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not authorized" });
    }

    feedback.comment = req.body.comment || feedback.comment;
    await feedback.save();

    res.json(feedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * 🗑️ Delete feedback (only owner or admin)
 */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) return res.status(404).json({ error: "Feedback not found" });

    if (feedback.userId.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ error: "Not authorized" });
    }

    await feedback.deleteOne();
    res.json({ message: "Feedback deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
