import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    trim: true,
  },
  photoURL: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  city: {
    type: String,
  },
  pin: {
    type: String,
  },
  local: {
    type: String,
  },
  uid: {
    type: String,
  },
});

export const User = mongoose.model("User", userSchema);
