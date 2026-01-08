import express from "express";
import * as tableController from "../controllers/tableController.js";

const router = express.Router();

router.post("/", tableController.create);
router.get("/", tableController.getAll);
router.get("/:id", tableController.getDetail);
router.put("/:id", tableController.update);
router.delete("/:id", tableController.remove);

export default router;