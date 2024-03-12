import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import Swal from "sweetalert2";
const Order = () => {
  const [data, setData] = useState([]);
  const { user, userInfo } = useContext(AuthContext);
  console.log(userInfo.email);
  const getOrders = async () => {
    await axios
      .get("https://foodi-server-t8gj.onrender.com/orders", user.email)
      .then((res) => setData(res.data));
  };
  const handleDelete = async (item) => {
    const { _id, email } = item;
    // console.log("itemdelet", item._id);
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
          .delete(`https://foodi-server-t8gj.onrender.com/orders/${item._id}`, {
            email: userInfo.email,
          })
          .then((res) => getOrders())
          .then((res) => {
            Swal.fire({
              title: "Deleted!",
              text: " Item has been deleted.",
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

  useEffect(() => {
    getOrders();
  }, []);

  const updateStat = async (stat, id) => {
    await axios
      .patch(`https://foodi-server-t8gj.onrender.com/orders/${id}`, {
        status: stat,
        email: userInfo.email,
      })
      .then((res) => getOrders());
  };

  return (
    <div className="w-full md:w-[870px] px-4 mx-auto mt-[150px] ">
      <h2 className="text-2xl font-semibold my-4">
        Manage <span className="text-green">Orders</span>
      </h2>
      {/* first table */}

      <div>
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>TransctionID</th>
                <th>Price</th>

                <th> Change Status</th>
                <th>Order Date</th>
                <th>Delete</th>
              </tr>
            </thead>
            {data.map((el, ind) => (
              <tbody key={el._id}>
                <tr>
                  <th> {ind + 1}</th>
                  <td>{el.email}</td>
                  <td>{el.TransctionId}</td>
                  <td> ₹{el.price}</td>

                  <td>
                    <select
                      className="select select-accent w-full max-w-xs border-none"
                      onChange={(e) => updateStat(e.target.value, el._id)}
                    >
                      <option disabled selected>
                        {el.status}
                      </option>
                      <option value={"Confirmed"}>Confirmed</option>
                      <option value={"Shipped"}>Shipped</option>
                      <option value={"Delivered"}>Delivered</option>
                    </select>
                  </td>

                  <td>{el.ordrDate}</td>
                  <td>
                    {" "}
                    <button
                      onClick={() => handleDelete(el)}
                      className="btn btn-xs bg-rose-500 text-white"
                    >
                      {" "}
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
            {/* row 1 */}
            {/*menu.map((el, ind) => (
            <tr key={ind}>
              <th>{ind + 1}</th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={el.image} alt="item_image" />
                    </div>
                  </div>
                </div>
              </td>
              <td>
                {el.name}
                <br />
              </td>
              <td>${el.price}</td>
              <td>
               
              </td>
              <td>
                {" "}
                
              </td>
            </tr>
          ))*/}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Order;
