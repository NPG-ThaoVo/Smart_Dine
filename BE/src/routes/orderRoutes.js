import express from "express";
import {
  create,
  getAll,
  getDetail,
  updateStatus,
  getByTable,
} from "../controllers/ordersController.js";

const router = express.Router();

router.post("/", create);
router.get("/", getAll);
router.get("/:id", getDetail);
router.patch("/:id/status", updateStatus);
router.get("/table/:tableId", getByTable);

export default router;
