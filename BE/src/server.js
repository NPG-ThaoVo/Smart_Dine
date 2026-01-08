import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; // Remember the .js extension // Remember the .js extension
import authRoutes from "./routes/authRoutes.js"; // Remember the .js extension
import cors from "cors";
import tableRoutes from "./routes/tableRoutes.js";
import sessionsRoutes from "./routes/sessionsRoutes.js";


// Load environment variables
dotenv.config();
const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
// Important middleware: Helps Express understand JSON data
// If this line is missing, req.body will be undefined
app.use(express.json());

// Connect to Database
connectDB();

// Root route
// All requests starting with /api/users will go to userRoutes
app.use("/api/auth", authRoutes);
app.use("/api/table", tableRoutes);
app.use("/api/session", sessionsRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
