import express from "express";
import * as menuController from "../controllers/menuController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, menuController.createMenuItem);
router.get("/", menuController.getAllMenuItems);
router.get("/:menuItemId", menuController.getMenuItemById);
router.put("/:menuItemId", protect, menuController.updateMenuItemById);
router.delete("/:menuItemId", protect, menuController.deleteMenuItemById);

export default router;