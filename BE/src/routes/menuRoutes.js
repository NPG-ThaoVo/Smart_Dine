import express from "express";
import * as menuController from "../controllers/menuController.js";

const router = express.Router();

router.post("/", menuController.createMenuItem);
router.get("/", menuController.getAllMenuItems);
router.get("/:menuItemId", menuController.getMenuItemById);
router.put("/:menuItemId", menuController.updateMenuItemById);
router.delete("/:menuItemId", menuController.deleteMenuItemById);

export default router;