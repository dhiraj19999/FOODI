import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import React, { useEffect, useState, useContext } from "react";
import { FaPaypal } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";

const CheckoutForm = ({ price, cartcount, name, email }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { setCartcount } = useContext(AuthContext);

  const [data, setData] = useState([]);
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch cart data
  const getCartData = async () => {
    try {
      const res = await axios.get(`https://foodi-server-t8gj.onrender.com/cart?email=${email}`);
      setData(res.data);
    } catch (err) {
      console.error("Failed to fetch cart data:", err);
    }
  };

  // Create payment intent on price change
  useEffect(() => {
    getCartData();

    const createPaymentIntent = async () => {
      try {
        const res = await axios.post("https://foodi-server-t8gj.onrender.com/create-payment-intent", { price });
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.error("Failed to create payment intent:", err);
      }
    };

    if (price > 0) {
      createPaymentIntent();
    }
  }, [price, email]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setCardError("");

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setLoading(false);
      return;
    }

    try {
      // Create payment method
      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (paymentMethodError) {
        setCardError(paymentMethodError.message);
        setLoading(false);
        return;
      }

      // Confirm card payment
      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: { name, email },
        },
      });

      if (confirmError) {
        setCardError(confirmError.message);
        setLoading(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === "succeeded") {
        // Payment succeeded, save order and clear cart
        await axios.post(`https://foodi-server-t8gj.onrender.com/orders/add`, {
          email,
          price,
          status: "Pending",
          TransctionId: paymentIntent.id,
          ordrDate: new Date().toUTCString().slice(5, 16),
          items: data,
        });

        await axios.post(`https://foodi-server-t8gj.onrender.com/cart/deleteAll?email=${email}`);
        setCartcount(0);

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Transaction successfully done!",
          showConfirmButton: false,
          timer: 3000,
        });

        navigate("/orders");
      }
    } catch (err) {
      console.error("Payment processing error:", err);
      setCardError("Something went wrong during payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-start items-start gap-8">
      {/* Left side */}
      <div className="md:w-1/2 w-full space-y-3">
        <h4 className="text-lg font-semibold">Order Summary</h4>
        <p>Total Price: ₹ {price}</p>
        <p>Number of Items: {cartcount}</p>
      </div>

      {/* Right Side */}
      <div className="md:w-1/3 w-full space-y-5 card shrink-0 max-w-sm shadow-2xl bg-base-100 px-4 py-8">
        <h4 className="text-lg font-semibold">Process Your Payment</h4>
        <h5 className="font-medium">Credit/Debit Card</h5>

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
            className="btn btn-sm mt-5 bg-primary w-full text-white"
            type="submit"
            disabled={!stripe || loading}
          >
            {loading ? (
              <span className="loading loading-infinity loading-lg text-neutral"></span>
            ) : (
              "Pay"
            )}
          </button>
        </form>

        {cardError && <p className="text-red-600 italic text-sm mt-2">{cardError}</p>}

        <div className="mt-5 text-center">
          <hr />
          <button type="button" className="btn btn-sm mt-5 bg-primary text-white">
            <FaPaypal /> Pay with Paypal
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
