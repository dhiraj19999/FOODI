import express from "express";
const app = express();
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import mongodb, { ObjectId } from "mongodb";
import { Menu } from "./model/menu.model.js";
import { Cart } from "./model/cart.model.js";
import menuRouter from "./routes/menu.route.js";
import cartRouter from "./routes/cart.router.js";
dotenv.config();
const port = process.env.PORT || 6000;
app.use(cors());
app.use(express.json());
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`
    );
    console.log(
      `\n MongoDB connectd !! DB HOST:${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection error", error);
    process.exit(1);
  }
};
connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to home page");
});

app.use("/menu", menuRouter);

app.use("/cart", cartRouter);

app.listen(port, () => {
  console.log(`Server running on PORT:${port}`);
});
