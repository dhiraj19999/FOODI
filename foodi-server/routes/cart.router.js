import express from "express";
import { Cart } from "../model/cart.model.js";
const router = express.Router();
import {
  getAllCartItem,
  addToCart,
  deleteCartItem,
  updateCartItem,
} from "../controllers/cart.controller.js";
// get all cart items
router.get("/", getAllCartItem);

//  add to cart item
router.post("/add", addToCart);

// delete item from cart
router.delete("/:id", deleteCartItem);

// update item from cart

router.put("/:id", updateCartItem);

export default router;
