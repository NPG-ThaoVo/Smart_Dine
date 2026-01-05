import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Connect to the database using the path from the .env file
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
    process.exit(1); // Exit the program if an error occurs
  }
};

export default connectDB;
