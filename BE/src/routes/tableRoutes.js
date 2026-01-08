import express from "express";
import * as tableController from "../controllers/tableController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔒 PROTECTED
router.post("/", protect, tableController.create);
router.get("/", protect, tableController.getAll);
router.get("/:id", protect, tableController.getDetail);
router.put("/:id", protect, tableController.update);
router.delete("/:id", protect, tableController.remove);

export default router;