import express from "express";
import { Order } from "../model/order.model.js";
import {
  createorder,
  deleteOrderItem,
  getAllorder,
  getOrders,
  updatestatus,
} from "../controllers/order.controller.js";
import { CheckAdmin } from "../middelware/CheckAdmin.js";

const router = express.Router();
// get all orders
router.get("/", getAllorder); // done
router.get("/getuserorder", getOrders);

//  add to order item
router.post("/add", createorder);

router.patch("/:id", CheckAdmin, updatestatus); // done
export default router;
router.delete("/:id", deleteOrderItem); //done
