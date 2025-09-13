// server.js
const express = require("express");
const connectDB = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

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