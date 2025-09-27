const mongoose = require("mongoose");

const contributionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  resourceId: { type: mongoose.Schema.Types.ObjectId, ref: "Resource" },
  action: { type: String, enum: ["add", "edit", "verify"], default: "add" }
}, { timestamps: true });

module.exports = mongoose.model("Contribution", contributionSchema);