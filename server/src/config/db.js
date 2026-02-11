import mongoose from "mongoose";
import { MONGO_URI } from "./env.js";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      dbName: "test",              // 🔥 MUST MATCH ATLAS
      autoIndex: true
    });

    console.log("✅ MongoDB connected to DB: test");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
