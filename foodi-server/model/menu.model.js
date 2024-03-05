import mongoose, { Schema } from "mongoose";

const menuSchema = new Schema({
  name: {
    type: String,
    require: true,
  },

  recipe: {
    type: String,
    require: true,
  },

  image: {
    type: String,
    require: true, // cloudinary url
  },

  category: {
    type: String,
    require: true,
  },

  price: {
    type: Number,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Menu = mongoose.model("Menu", menuSchema);
