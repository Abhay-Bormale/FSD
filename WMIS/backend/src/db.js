const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('Missing environment variable MONGODB_URI');
  }

  mongoose.set('strictQuery', true);
  await mongoose.connect(uri, {});
}

module.exports = { connectDB };

