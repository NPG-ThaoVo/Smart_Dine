import express from "express";
import {
  getByOrder,
  updateStatus,
} from "../controllers/orderItemController.js";

const router = express.Router();

router.get("/order/:orderId", getByOrder);
router.patch("/:id/status", updateStatus);

export default router;
