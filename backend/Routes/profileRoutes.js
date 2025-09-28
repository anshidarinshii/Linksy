// routes/profileRoutes.js
const express = require("express");
const bcrypt = require("bcryptjs");
const Profile = require("../models/Profile");
const Contribution = require("../models/Contributions");
const Feedback = require("../models/Feedback");
const Resource = require("../models/Resource");
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Get full profile (bio + stats + resources + feedbacks)
router.get("/:userId", protect, async (req, res) => {
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

// ✅ Update profile info (bio, pic, name, password)
router.put("/:userId", protect, async (req, res) => {
  try {
    const { bio, profilePicture, name, password } = req.body;

    // update Profile fields
    const profile = await Profile.findOneAndUpdate(
      { user: req.params.userId },
      { bio, profilePicture },
      { new: true }
    ).populate("user", "-password");

    // update User fields
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (name) user.name = name;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    await user.save();

    res.json({
      message: "Profile updated successfully",
      profile,
      user: { _id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get contributions separately
router.get("/:userId/contributions", protect, async (req, res) => {
  try {
    const contributions = await Contribution.find({ userId: req.params.userId })
      .populate("resourceId");
    res.json(contributions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get feedbacks separately
router.get("/:userId/feedbacks", protect, async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ userId: req.params.userId })
      .populate("resourceId");
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
