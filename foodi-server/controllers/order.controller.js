import { Order } from "../model/order.model.js";

/* route for user*/

export const getOrders = async (req, res) => {
  try {
    const email = req.query.email;
    const resp = await Order.find({ email: email });
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

/* route for user*/
export const createorder = async (req, res) => {
  const order = req.body;

  try {
    const result = await Order.create(order);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

/* route for admin*/
export const getAllorder = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
/* route for admin*/
export const updatestatus = async (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;
  try {
    const updateorder = await Order.findByIdAndUpdate(
      orderId,
      { status: status },
      { new: true, runValidators: true }
    );
    if (!updateorder) {
      return res.status(404).json({ message: "order Not found" });
    }
    res.status(200).json({ message: "Order status update successfullys" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

/*route for admin delete*/
export const deleteOrderItem = async (req, res) => {
  try {
    const id = req.params.id;
    // const filter = { _id: new ObjectId(id) };

    // const result = await Cart.deleteOne(filter);
    const prod = await Order.findById(id);
    console.log("result", prod);
    const result = await Order.findByIdAndDelete(id);

    if (result) {
      res.status(200).json({ message: "Item deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
};
