import express from "express";
import * as billController from "../controllers/billController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, billController.createBill);
router.get("/", protect, billController.getAllBills);
router.get("/stats", protect, billController.getBillStats);
router.get("/:id", protect, billController.getBillById);
router.patch("/:id/pay", billController.payBill);

export default router;
