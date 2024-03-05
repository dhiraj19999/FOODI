import jwt from "jsonwebtoken";

const CheckAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const verify = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (verify) {
      next();
    }
    //next();
  } catch (error) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};
