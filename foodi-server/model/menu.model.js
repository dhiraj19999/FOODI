import mongoose, { Schema } from "mongoose";

const menuSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },

  recipe: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },

  image: {
    type: String, // cloudinary url
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
});

export const Menu = mongoose.model("Menu", menuSchema);
