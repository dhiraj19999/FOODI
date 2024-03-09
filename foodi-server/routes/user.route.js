import express from "express";
import { verifyToken } from "../middelware/verifyToken.js";
import {
  getAlluser,
  createUser,
  deleteUser,
  getAdmin,
  makeAdmin,
  getUser,
  updateUser,
} from "../controllers/user.controller.js";
import { CheckAdmin } from "../middelware/CheckAdmin.js";
const router = express.Router();

router.get("/", getAlluser); // done
router.post("/", createUser);
router.delete("/:id", deleteUser); // done
router.patch("/admin/:id", CheckAdmin, makeAdmin); // done
router.get("/singleuser", getUser);
router.post("/userUpdate/:id", updateUser);

router.get("/admin:email", getAdmin);
export default router;
