// routes/profileRoutes.js
const express = require("express");
const Profile = require("../models/Profile");
const Contribution = require("../models/Contributions");
const Feedback = require("../models/Feedback");
const Resource = require("../models/Resource");

const router = express.Router();

// ✅ Get full profile (bio + stats + resources + feedbacks)
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const profile = await Profile.findOne({ user: userId }).populate("user", "-password");
    if (!profile) return res.status(404).json({ error: "Profile not found" });

    const contributions = await Contribution.find({ userId }).populate("resourceId");
    const feedbacks = await Feedback.find({ userId }).populate("resourceId");

    const verifiedEntriesCount = contributions.filter(c => c.action === "verify").length;

    res.json({
      profile,
      stats: {
        contributionsCount: contributions.length,
        verifiedEntriesCount
      },
      contributions,
      feedbacks
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update profile info
router.put("/:userId", async (req, res) => {
  try {
    const { bio, profilePicture } = req.body;
    const updated = await Profile.findOneAndUpdate(
      { user: req.params.userId },
      { bio, profilePicture },
      { new: true }
    ).populate("user", "-password");

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get contributions separately
router.get("/:userId/contributions", async (req, res) => {
  try {
    const contributions = await Contribution.find({ userId: req.params.userId })
      .populate("resourceId");
    res.json(contributions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get feedbacks separately
router.get("/:userId/feedbacks", async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ userId: req.params.userId })
      .populate("resourceId");
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;