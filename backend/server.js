// server.js
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const resourceRoutes = require("./Routes/resourceRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Test route first
app.get("/", (req, res) => {
  console.log("Root route hit!");
  res.json({ message: "Linksy API is running!" });
});

// Test another simple route
app.get("/test", (req, res) => {
  console.log("Test route hit!");
  res.json({ message: "Test route working!" });
});

// Resource routes
app.use("/api/resources", resourceRoutes);

// Catch-all route for debugging (must be last)
app.use((req, res) => {
  console.log(`Catch-all route hit:${req.method} ${req.url}` );
  res.status(404).json({ 
    error: "Route not found", 
    method: req.method, 
    url: req.originalUrl,
    availableRoutes: ["GET /", "GET /test", "GET /api/resources", "POST /api/resources"]
  });
});

async function startServer() {
  try {
    console.log("📡 Starting server...");
    await connectDB(); // 👈 this actually connects to MongoDB
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📋 Available routes:`);
      console.log(`   GET  http://localhost:${PORT}/`);
      console.log(`   GET  http://localhost:${PORT}/test`);
      console.log(`   GET  http://localhost:${PORT}/api/resources`);
      console.log(`   POST http://localhost:${PORT}/api/resources`);
    });
  } catch (err) {
    console.error("❌ Could not connect to MongoDB:", err.message);
    process.exit(1); // stop server if DB connection fails
  }
}

startServer();