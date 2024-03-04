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
});

export const User = mongoose.model("User", userSchema);
