const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  mail: String,
  phone: String,
  address: String,
  availableAt: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  image: String,
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  verified: { type: Boolean, default: false },
  contributedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("Resource", resourceSchema);