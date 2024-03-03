import express from "express";
const app = express();
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import mongodb, { ObjectId } from "mongodb";
import { Menu } from "./model/menu.model.js";
import { Cart } from "./model/cart.model.js";
dotenv.config();
const port = process.env.PORT || 6000;
app.use(cors());
app.use(express.json());
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`
    );
    console.log(
      `\n MongoDB connectd !! DB HOST:${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection error", error);
    process.exit(1);
  }
};
connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to home page");
});
// all item menu
app.get("/menu", async (req, res) => {
  const menu = await Menu.find();
  res.send(menu);
});
// add to cart item//
app.post("/carts", async (req, res) => {
  const cartItem = req.body;
  const { menuItemId, email } = cartItem;
  const itemExist = await Cart.findOne({ menuItemId, email });
  console.log(itemExist);
  if (itemExist) {
    /*await Cart.findOneAndUpdate(
      { menuItemId },
      { quantity: itemExist.quantity + 1 }
    );*/
    res.json({ message: "Item Already in the cart" });
  } else {
    const result = await Cart.insertMany(cartItem);
    res.json({ message: "Item Added to cart successfully" });
  }
});

//  get all cart items
app.post("/cartItem", async (req, res) => {
  const email = req.query.email;
  const resp = await Cart.find({ email: email });

  res.send(resp);
});

// delete items
app.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };

    const result = await Cart.deleteOne(filter);
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.send(error);
  }
});
//  update quantity
app.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const { quantity, action } = req.body;
  const filter = { _id: new ObjectId(id) };
  const itemExist = await Cart.findOne(filter);
  if (action == "INC") {
    await Cart.findByIdAndUpdate(filter, {
      quantity: itemExist.quantity + 1,
      price: (itemExist.price / itemExist.quantity) * (itemExist.quantity + 1),
    });
    res.json({ message: "updated" });
  } else if (action == "DEC") {
    await Cart.findByIdAndUpdate(filter, {
      quantity: itemExist.quantity - 1,
      price: (itemExist.price / itemExist.quantity) * (itemExist.quantity - 1),
    });
    res.json({ message: "updated" });
  }
});

app.listen(port, () => {
  console.log(`Server running on PORT:${port}`);
});
