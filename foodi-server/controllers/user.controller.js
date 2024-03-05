import { User } from "../model/User.model.js";
import jwt from "jsonwebtoken";
export const getAlluser = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
export const getUser = async (req, res) => {
  const email = req.query.email;
  try {
    const user = await User.findOne({ email: email });
    res.status(200).json({ user: user });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
export const createUser = async (req, res) => {
  const user = req.body;
  const query = { email: user.email };
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10d",
  });
  try {
    const existUser = await User.findOne({ query });
    if (existUser) {
      return res.status(302).json({ message: "User already exists" });
    }
    const result = await User.create(user);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const deleteuser = await User.findByIdAndDelete(userId);
    if (!deleteuser) {
      return res.status(404).json({ message: "User Not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getAdmin = async (req, res) => {
  const email = req.params.email;
  const query = { email: email };
  try {
    const user = await User.findOne(query);
    if (email !== req.decoded.email) {
      return res.status(403).json({ message: "Forbidden access" });
    }
    let admin = false;
    if (user) {
      admin = user?.role === "admin";
    }
    res.status(200).json({ admin });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// make admin to user
export const makeAdmin = async (req, res) => {
  const userId = req.params.id;
  const { name, email, photoURL, role } = req.body;
  try {
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { role: "admin" },
      { new: true, runValidators: true }
    );
    if (!updateUser) {
      return res.status(404).json({ message: "User Not found" });
    }
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
