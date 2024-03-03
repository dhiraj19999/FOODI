import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  menuItemId: {
    type: String,
    required: true,
  },

  image: {
    type: String, // cloudinary url
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

export const Cart = mongoose.model("Cart", cartSchema);
