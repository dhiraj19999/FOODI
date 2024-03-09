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
router.post("/add", CheckAdmin, addToMenu); // done
router.delete("/:id", deleteMenuItem); // done
router.get("/:id", SingleMenuItem);
router.patch("/:id", CheckAdmin, UpdateMenuItem); // done
export default router;
