const express = require("express");
const Contribution = require("../models/Contributions");
const authMiddleware = require("../middleware/authMiddleware").protect;

const router = express.Router();

/**
 * ➕ Add a new contribution
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { resourceId, action } = req.body;
    const contribution = new Contribution({
      userId: req.user.id,
      resourceId,
      action,
    });
    await contribution.save();
    res.status(201).json(contribution);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * 📥 Get all contributions of a user
 */
router.get("/user/:userId", async (req, res) => {
  try {
    const contributions = await Contribution.find({ userId: req.params.userId })
      .populate("resourceId")
      .sort({ createdAt: -1 });
    res.json(contributions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * 📊 Get contribution stats for a user
 */
router.get("/stats/user/:userId", async (req, res) => {
  try {
    const total = await Contribution.countDocuments({ userId: req.params.userId });
    const verified = await Contribution.countDocuments({
      userId: req.params.userId,
      action: "verify",
    });
    res.json({ total, verified });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * 🏆 Leaderboard (top contributors)
 */
router.get("/stats/leaderboard", async (req, res) => {
  try {
    const leaderboard = await Contribution.aggregate([
      { $group: { _id: "$userId", total: { $sum: 1 } } },
      { $sort: { total: -1 } },
      { $limit: 10 },
    ]);
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * 📈 Action distribution (add/edit/verify)
 */
router.get("/stats/actions", async (req, res) => {
  try {
    const actions = await Contribution.aggregate([
      { $group: { _id: "$action", total: { $sum: 1 } } },
    ]);
    res.json(actions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
