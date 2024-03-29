import { CardElement } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { FaPaypal } from "react-icons/fa";
import { useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";
const CheckoutForm = ({ price, cartcount, name, email }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [data, setData] = useState([]);
  const [carderror, setCarderror] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { setCartcount } = useContext(AuthContext);
  const getCartData = async () => {
    await axios
      .get(`https://foodi-server-t8gj.onrender.com/cart?email=${email}`)
      .then((res) => {
        //  console.log("cartdata", res.data);
        setData(res.data);
      })

      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCartData();
    axios
      .post("https://foodi-server-t8gj.onrender.com/create-payment-intent", {
        price,
      })
      .then(
        (res) => setClientSecret(res.data.clientSecret)
        //console.log(clientSecret)
      )
      .catch((err) => console.log(err));
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }
    let card = elements.getElement(CardElement);

    //console.log(card);
    if (card == null) {
      setLoading(false);
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      //console.log("[error]", error);
      setCarderror(error.message);
      setLoading(false);
    } else {
      // setCarderror("success");
      //  console.log("[paymentmethod]", paymentMethod);
    }
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,

          billing_details: {
            name: name,
            email: email,
          },
        },
      });
    if (confirmError) {
      // console.log(confirmError);
      setLoading(false);
    }
    if (paymentIntent.status == "succeeded") {
      // console.log(paymentIntent);
      setLoading(false);
      setCarderror(
        `Your transction is success and transction  id is ${paymentIntent.id}`
      );
      axios
        .post(`https://foodi-server-t8gj.onrender.com/orders/add`, {
          email: email,
          price: price,
          status: "Pending",
          TransctionId: paymentIntent.id,
          ordrDate: new Date().toUTCString().slice(5, 16),
          items: data?.map((item) => item),
        })
        .then(
          (res) => setLoading(false),
          axios
            .post(
              `https://foodi-server-t8gj.onrender.com/cart/deleteAll?email=${email}`
            )
            .then((res) => setCartcount(0))
            .then(() =>
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Transaction successfully done!",
                showConfirmButton: false,
                timer: 3000,
              })
            )
            .then(() => navigate("/orders"))
        );
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-start items-start gap-8">
      {/*  left side */}
      <div className="md:w-1/2 w-full space-y-3">
        <h4 className="text-lg font-semibold">Order Summary</h4>
        <p>Total Price: ₹ {price}</p>
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
            {loading ? (
              <span className="loading loading-infinity loading-lg text-neutral"></span>
            ) : (
              "Pay"
            )}
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
