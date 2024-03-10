import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { Link, useParams } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
const CartPage = () => {
  const [data, setData] = useState([]);
  const [tot, setTot] = useState(0);
  const {
    user,
    updateCartcount,
    userInfo,
    cartcount,
    cartPrice,
    setCartPrice,
  } = useContext(AuthContext);
  console.log(user.email);
  const { email } = useParams();
  console.log("cartdata", data);
  const getCartData = async () => {
    if (user && user?.email) {
      await axios
        .get(`http://localhost:4000/cart?email=${email}`)
        .then((res) => {
          console.log("cartdata", res.data);
          setData(res.data);
          totalPrice(res.data);
          updateCartcount(res.data.length);
        })

        .catch((err) => console.log(err));
    }
  };

  const handleDelete = async (item) => {
    const { _id, email } = item;
    console.log("itemdelet", item._id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:4000/cart/${item._id}`)
          .then((res) => getCartData())
          .then((res) => {
            Swal.fire({
              title: "Deleted!",
              text: "Your Item has been deleted.",
              icon: "success",
            });
          })

          .catch((err) => {
            Swal.fire({
              title: "Error",
              text: "Something went wrong",
              icon: "warning",
            });
          });
      }
    });
  };

  const handleINC = async (item) => {
    let quantity = 1;
    let action = "INC";
    if (item.quantity <= 4) {
      await axios
        .put(`http://localhost:4000/cart/${item._id}`, {
          quantity,
          action,
        })
        .then((res) => getCartData());
    }
  };

  const handleDEC = async (item) => {
    let quantity = 1;
    let action = "DEC";
    if (item.quantity > 1) {
      await axios
        .put(`http://localhost:4000/cart/${item._id}`, {
          quantity,
          action,
        })
        .then((res) => getCartData());
    }
  };

  useEffect(() => {
    getCartData();
  }, [user, updateCartcount]);

  const totalPrice = (dat) => {
    let total = 0;
    dat.forEach((el) => {
      total = total + el.price;
    });
    let roundFig = total.toFixed(0);
    console.log(roundFig);
    localStorage.setItem("cartPrice", roundFig);

    setCartPrice(localStorage.getItem("cartPrice"));
    setTot(roundFig);
    // console.log("cartPrice", cartPrice);
    //return roundFig;
  };

  return (
    <div className="section-container">
      {/* banner*/}
      <div className=" bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="py-28 flex flex-col  items-center justify-center gap-8">
          {/* texts */}
          <div className=" px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Items Added to The
              <span className="text-green ml-3">CART</span>
            </h2>
          </div>
        </div>
      </div>

      {/*  table for the cart items*/}
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-green text-white rounded-sm">
              <tr>
                <th>#</th>
                <th>Food</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {data.map((el, ind) => {
                return (
                  <tr key={ind}>
                    <td>{ind + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={el.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="font-medium">{el.name}</td>
                    <td>
                      <button
                        className="btn btn-xs bg-green text-white"
                        onClick={() => handleDEC(el)}
                        disabled={el.quantity == 1}
                      >
                        -
                      </button>
                      <input
                        className="w-10 mx-2 text-center overflow-hidden appearance-none"
                        type="Number"
                        value={el.quantity}
                        readOnly
                      />
                      <button
                        className="btn btn-xs  bg-green text-white"
                        disabled={el.quantity == 4}
                        onClick={() => handleINC(el)}
                      >
                        +
                      </button>
                    </td>
                    <td>₹{el.price}</td>
                    <th>
                      <button
                        className="btn btn-ghost btn-xs bg-rose-400 text-white"
                        onClick={() => handleDelete(el)}
                      >
                        <FaTrash /> Delete
                      </button>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/*customer details   */}
      <div className="my-12 flex flex-col md:flex-row justify-between items-start  ">
        <div className="md:w-1/2 space-y-3 mb-5">
          <h3 className="font-medium">Customer Details</h3>
          <p>Name:{userInfo.name}</p>
          <p>email:{user.email}</p>
          <p>User_id:{user.uid}</p>
        </div>
        {/*   Adress detail */}
        <div className="md:w-1/2 space-y-3 mb-5">
          <h3 className="font-medium"> Address Details</h3>
          <p>City:{userInfo.city}</p>
          <p>Pin Code:{userInfo.pin}</p>
          <p>Local :{userInfo.local}</p>
        </div>
        <div className="md:w-1/2 space-y-3 ">
          <h3 className="font-medium">Shopping Details</h3>
          <p>Total Items: {cartcount}</p>
          <p>Total Price: ₹{tot}</p>

          {cartcount > 0 ? (
            <Link to={"/process-checkout"}>
              <button className="btn bg-green text-white mt-5">
                Procced Checkout
              </button>
            </Link>
          ) : (
            <Link to={"/menu"}>
              <button className="btn bg-green text-white mt-5">
                Back to Menu
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
