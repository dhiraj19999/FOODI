import express from "express";
import { Order } from "../model/order.model.js";
import {
  createorder,
  getAllorder,
  getOrders,
  updatestatus,
} from "../controllers/order.controller.js";

const router = express.Router();
// get all orders
router.get("/", getAllorder);
router.get("/getuserorder", getOrders);

//  add to order item
router.post("/add", createorder);

router.patch("/:id", updatestatus);
export default router;
