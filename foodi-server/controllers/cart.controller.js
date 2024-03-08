import { ObjectId } from "mongodb";
import { Cart } from "../model/cart.model.js";

export const getAllCartItem = async (req, res) => {
  try {
    const email = req.query.email;
    const resp = await Cart.find({ email: email });
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const addToCart = async (req, res) => {
  try {
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
      res.status(200).json({ message: "Item Added to cart successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteCartItem = async (req, res) => {
  try {
    const id = req.params.id;
    // const filter = { _id: new ObjectId(id) };

    // const result = await Cart.deleteOne(filter);
    const result = await Cart.findByIdAndDelete(id);

    if (result) {
      res.status(200).json({ message: "Item deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const id = req.params.id;

    const { quantity, action } = req.body;
    //  const filter = { _id: new ObjectId(id) };
    // const itemExist = await Cart.findOne(filter);
    const itemExist = await Cart.findById(id);

    console.log("updateid", itemExist);
    //return res.status(200).json({ message: "ok" });

    if (action == "INC") {
      await Cart.findByIdAndUpdate(id, {
        quantity: itemExist.quantity + 1,
        price:
          (itemExist.price / itemExist.quantity) * (itemExist.quantity + 1),
      });
      return res.json({ message: "updated" });
    } else if (action == "DEC") {
      await Cart.findByIdAndUpdate(id, {
        quantity: itemExist.quantity - 1,
        price:
          (itemExist.price / itemExist.quantity) * (itemExist.quantity - 1),
      });
      return res.json({ message: "updated" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

//   delete all cart items//

export const DeleteAll = async (req, res) => {
  const email = req.query.email;
  try {
    const resp = await Cart.find({ email: email });
    const itemid = await resp.map((id) => new ObjectId(id));
    const deleteCartreq = await Cart.deleteMany({ _id: { $in: itemid } });
    res.status(200).json({ deleteCartreq, message: "deletd Successfully" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
