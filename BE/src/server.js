import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; // Remember the .js extension
import userRoutes from "./routes/userRoutes.js"; // Remember the .js extension
import cors from "cors";

// Load environment variables
dotenv.config();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
const app = express();
// Important middleware: Helps Express understand JSON data
// If this line is missing, req.body will be undefined
app.use(express.json());

// Connect to Database
connectDB();

// Root route
// All requests starting with /api/users will go to userRoutes
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
