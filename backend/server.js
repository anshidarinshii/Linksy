const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); // only if you're using MongoDB
const connectDB = require("./db");
const resourceRoutes = require("./Routes/resourceRoutes");
const authRoutes = require("./Routes/authRoutes");
const profileRoutes = require("./Routes/profileRoutes");
const categoryRoutes = require("./Routes/categoryRoutes");
const adminRoutes = require("./Routes/adminRoutes");
const contributionRoutes = require("./Routes/contributionRoutes");
const feedbackRoutes = require("./Routes/feedbackRoutes");
const path = require("path");

console.log("✅ Loaded authRoutes from ./Routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // allow all origins for now
app.use(express.json()); // required for POST body parsing
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// Routes

app.use("/api/resources", resourceRoutes);  // ✅ this line connects routes
app.use("/api/auth", authRoutes); 
app.use("/api/profile", profileRoutes); 
app.use("/api/categories", categoryRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contributions", contributionRoutes); // contribution logs
app.use("/api/feedbacks", feedbackRoutes);    // feedback system


async function startServer() {
  try {
    console.log("📡 Starting server...");
    await connectDB(); // 👈 this actually connects to MongoDB
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Could not connect to MongoDB:", err.message);
    process.exit(1); // stop server if DB connection fails
  }
}

startServer();