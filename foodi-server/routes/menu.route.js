import express from "express";
import {
  addToMenu,
  getMenu,
  deleteMenuItem,
  SingleMenuItem,
  UpdateMenuItem,
} from "../controllers/menu.controller.js";
const router = express.Router();

router.get("/", getMenu);
router.post("/add", addToMenu);
router.delete("/:id", deleteMenuItem);
router.get("/:id", SingleMenuItem);
router.patch("/:id", UpdateMenuItem);
export default router;
