import express from "express";
const app = express();
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import menuRouter from "./routes/menu.route.js";
import cartRouter from "./routes/cart.router.js";
import userRouter from "./routes/user.route.js";
import orderRouter from "./routes/order.router.js";
import jwt, { decode } from "jsonwebtoken";
import Stripe from "stripe";

dotenv.config();
const port = process.env.PORT || 6000;

app.use(cors());
app.use(express.json());
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
console.log(process.env.STRIPE_SECRET_KEY);
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
app.post("/jwt", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15d",
  });
  res.send({ token });
});

app.get("/", (req, res) => {
  res.send("Welcome to home page");
});

app.use("/menu", menuRouter);

app.use("/cart", cartRouter);
app.use("/users", userRouter);
app.use("/orders", orderRouter);

app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;
  const total = price;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total * 100,
    currency: "inr",

    payment_method_types: ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});
app.listen(port, () => {
  console.log(`Server running on PORT:${port}`);
});
