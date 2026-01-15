import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; // Remember the .js extension // Remember the .js extension
import authRoutes from "./routes/authRoutes.js"; // Remember the .js extension
import cors from "cors";
import menuRoutes from "./routes/menuRoutes.js";
import tableRoutes from "./routes/tableRoutes.js";
import orderItemRoutes from "./routes/orderItemRoutes.js";
import "./models/categoriesModel.js";
import orderRoutes from "./routes/orderRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import billRoutes from "./routes/billRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import "./models/categoriesModel.js";

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
app.use("/api/tables", tableRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/order-items", orderItemRoutes);
app.use("/api/orders", orderRoutes);

app.use("/api/categories", categoryRoutes);
app.use("/api/bills", billRoutes);
app.use("/api/notifications", notificationRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
