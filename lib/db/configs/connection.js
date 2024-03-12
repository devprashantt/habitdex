import mongoose from "mongoose";

const DATABASE_URL = process.env.MONGODB_URI;

if (!DATABASE_URL) {
  console.info("database url not provided or wrong");
  process.exit(1);
}

let cached = { connection: null, promise: null };

/**
 * Connects to MongoDB database.
 *
 * Checks if a cached connection exists and returns it if so.
 * If no cached connection, creates a new connection using the DATABASE_URL.
 * Caches the connection for future calls.
 *
 * @returns {Promise} The MongoDB connection object.
 */
async function connectDB() {
  if (cached.connection) {
    return cached.connection;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
    };

    cached.promise = mongoose.createConnection(DATABASE_URL, opts);
    await cached.promise;
  }
  cached.connection = cached.promise;
  return cached.connection;
}

export { connectDB };
