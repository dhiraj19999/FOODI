import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },

  ordrDate: {
    type: String,
    required: true,
  },
  TransctionId: {
    type: String,
    require: true,
  },

  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Shipped", "Delivered"],
    default: "Pending",
  },
  items: Array,
});

export const Order = mongoose.model("Order", orderSchema);
