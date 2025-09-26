const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  bio: { type: String, trim: true },
  profilePicture: { type: String, trim: true }
}, { timestamps: true });

module.exports = mongoose.model("Profile", profileSchema);