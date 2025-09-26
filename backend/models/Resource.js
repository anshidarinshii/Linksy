const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    address: { type: String, required: true },
    verified: { type: Boolean, default: false },
    description: { type: String },
    phone: { type: String },
    mail: { type: String },
    availableAt: { type: String },
    image: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resource", resourceSchema);
