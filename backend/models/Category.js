// models/Category.js
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // ensures no duplicate category names
      trim: true,
    }, 
    description: {
      type: String,
      default: "",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // who created this category
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);