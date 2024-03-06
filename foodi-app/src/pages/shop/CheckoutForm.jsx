import { CardElement } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { FaPaypal } from "react-icons/fa";
import { useElements } from "@stripe/react-stripe-js";
const CheckoutForm = ({ price, cartcount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [carderror, setCarderror] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      //console.log("[error]", error);
      setCarderror(error.message);
    } else {
      console.log("[paymentmethod]", paymentMethod);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-start items-start gap-8">
      {/*  left side */}
      <div className="md:w-1/2 w-full space-y-3">
        <h4 className="text-lg font-semibold">Order Summary</h4>
        <p>Total Price: $ {price}</p>
        <p>Number of Items:{cartcount}</p>
      </div>

      {/*  Right Side */}
      <div className="md:w-1/3 w-full space-y-5 card shrink-0 max-w-sm shadow-2xl bg-base-100 px-4 py-8">
        <h4 className="text-lg font-semibold">Process Your Payment</h4>
        <h5 className="font-medium">Credit/Debit Card</h5>
        {/* Stripe form */}
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": { color: "#aab7c4" },
                },
                invalid: { color: "#9e2146" },
              },
            }}
          />
          <button
            className="btn btn-sm mt-5  bg-primary w-full text-white"
            type="submit"
            disabled={!stripe}
          >
            Pay
          </button>
        </form>
        {carderror ? (
          <p className="text-red italic text-sm">{carderror}</p>
        ) : (
          ""
        )}
        <div className="mt-5 text-center">
          <hr />
          <button
            type="submit"
            className="btn btn-sm mt-5 bg-primary text-white"
          >
            <FaPaypal /> Pay with Paypal
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
