// db.js
require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;
console.log("🔑 Loaded MONGO_URI from .env:", uri ? "YES" : "NO");

const client = new MongoClient(uri);
let db;

async function connectDB() {
  if (db) {
    console.log("⚡ Reusing existing MongoDB connection");
    return db;
  }

  try {
    console.log("⏳ Connecting to MongoDB Atlas...");
    await client.connect();
    db = client.db("Linksy");
    console.log("✅ Connected to MongoDB Atlas (Linksy DB)");
    return db;
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    throw err;
  }
}

module.exports = connectDB;