import mongoose from "mongoose";

export const MONGO_DB_URL = process.env.MONGO_DB_URL as string;

if (!MONGO_DB_URL) {
  throw new Error("MongoDB URL not found in .env");
}

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
};

// Mongoose connection setup
export async function connectMongoose() {
  try {
    await mongoose.connect(MONGO_DB_URL, {
      ...mongooseOptions,
      dbName: "summaries",
    });
    console.log("Mongoose connected successfully");
  } catch (err) {
    console.error("Mongoose connection error:", err);
  }
}