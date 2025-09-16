const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    mail: { type: String, trim: true },
    phone: { type: String, trim: true },
    address: { type: String, trim: true },
    availableAt: { type: String, trim: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    image: { type: String, trim: true },
    verified: { type: Boolean, default: false },
    flagged: { type: Boolean, default: false },
    contributedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resource", resourceSchema);
