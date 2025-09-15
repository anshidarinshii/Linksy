require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;
console.log('🔑 Loaded MONGO_URI from .env:', uri ? 'YES' : 'NO');

async function connectDB() {
  if (!uri) {
    throw new Error('MONGO_URI environment variable is not set. Please check your .env file.');
  }

  try {
    console.log('⏳ Connecting to MongoDB Atlas...');
    await mongoose.connect(uri, {
      dbName: 'Linksy',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000  // Wait up to 30s for initial connection
    });
    console.log('✅ Connected to MongoDB Atlas (Linksy DB)');
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB:', err.message);
    throw err;
  }
}

module.exports = connectDB;
