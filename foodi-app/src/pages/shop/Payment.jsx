import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
const stripPromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const Payment = () => {
  const { cartcount, cartPrice, userInfo, user } = useContext(AuthContext);
  console.log("price", cartPrice);
  console.log(cartcount, "cartcount");
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-28">
      <Elements stripe={stripPromise}>
        <CheckoutForm
          price={cartPrice}
          cartcount={cartcount}
          name={userInfo.name}
          email={user.email}
        />
      </Elements>
    </div>
  );
};

export default Payment;
