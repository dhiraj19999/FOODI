import express from "express";
import { verifyToken } from "../middelware/verifyToken.js";
import {
  getAlluser,
  createUser,
  deleteUser,
  getAdmin,
  makeAdmin,
  getUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getAlluser);
router.post("/", createUser);
router.delete("/:id", deleteUser);
router.patch("/admin/:id", makeAdmin);
router.get("/singleuser", getUser);

router.get("/admin:email", getAdmin);
export default router;
