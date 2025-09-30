const express = require("express");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const Profile = require("../models/Profile");
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// ⚡ Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ✅ Update profile (bio, pic, name, password)
router.put("/:userId", protect, upload.single("profilePicture"), async (req, res) => {
  try {
    const { bio, name, password } = req.body;
    let profilePictureUrl;

    if (req.file) {
      profilePictureUrl = `/uploads/${req.file.filename}`;
    }

    // update profile
    let profile = await Profile.findOneAndUpdate(
      { user: req.params.userId },
      { bio, ...(profilePictureUrl && { profilePicture: profilePictureUrl }) },
      { new: true, upsert: true }
    ).populate("user", "-password");

    // update user fields
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
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("❌ Error updating profile:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get profile by user ID
router.get("/:userId", protect, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.userId }).populate("user", "-password");
    if (!profile) return res.status(404).json({ error: "Profile not found" });

    res.json({ profile });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
