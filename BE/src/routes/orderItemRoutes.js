import express from "express";
import {
  addOrderItems,
  getByOrder,
  getByTable,
  updateStatus,
} from "../controllers/orderItemController.js";

const router = express.Router();

router.get("/order/:orderId", getByOrder);
router.get("/table/:tableId", getByTable);
router.patch("/:id/status", updateStatus);
router.post("/", addOrderItems);

export default router;
