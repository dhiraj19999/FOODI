import jwt from "jsonwebtoken";
import { User } from "../model/User.model.js";

export const CheckAdmin = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(401).json({ msg: "unauthorised" });
    }

    const userExist = await User.findOne({ email: email });
    if (!userExist || userExist.role != "admin") {
      return res.status(401).json({ msg: "unauthorised" });
    }

    console.log("admin", userExist);
    next();
  } catch (error) {
    return res.status(500).json({ msg: "internal server error" });
  }
};
