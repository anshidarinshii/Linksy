const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  resourceId: { type: mongoose.Schema.Types.ObjectId, ref: "Resource" },
  comment: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Feedback", feedbackSchema);