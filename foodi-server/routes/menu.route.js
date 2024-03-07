import express from "express";
import {
  addToMenu,
  getMenu,
  deleteMenuItem,
  SingleMenuItem,
  UpdateMenuItem,
} from "../controllers/menu.controller.js";
import { CheckAdmin } from "../middelware/CheckAdmin.js";
const router = express.Router();

router.get("/", getMenu);
router.post("/add", CheckAdmin, addToMenu);
router.delete("/:id", CheckAdmin, deleteMenuItem);
router.get("/:id", CheckAdmin, SingleMenuItem);
router.patch("/:id", CheckAdmin, UpdateMenuItem);
export default router;
