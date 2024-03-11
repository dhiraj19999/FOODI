import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { useContext } from "react";
const Orders = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const getOrders = async () => {
    await axios
      .get(
        `https://foodi-server-t8gj.onrender.com/orders/getuserorder?email=${user.email}`
      )
      .then((res) => setData(res.data));
  };
  // console.log(data);
  useEffect(() => {
    getOrders();
  }, []);
  let x = 0;
  const ren = (item) => {
    return item.map((el, ind) => {
      x = x + 1;
      // console.log("x", x);
      return (
        <tr key={ind}>
          <th>{x}</th>
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
          <td> ₹{el.price}</td>
          <td>{el.quantity}</td>
        </tr>
      );
    });
  };

  return (
    <div className="w-full md:w-[870px] px-4 mx-auto mt-[150px]">
      <h2 className="text-2xl font-semibold my-4">
        Your <span className="text-green">Orders</span>
      </h2>
      {/* first table */}

      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>TransctionID</th>
                <th>Price</th>
                <th>Status</th>
                <th>Order Date</th>
              </tr>
            </thead>
            {data.map((el, ind) => (
              <tbody key={el._id}>
                <tr>
                  <th> {ind + 1}</th>
                  <td>{el.email}</td>
                  <td>{el.TransctionId}</td>
                  <td> ₹{el.price}</td>
                  <td>{el.status}</td>
                  <td>{el.ordrDate}</td>
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
      <h2 className="text-2xl font-semibold my-4 mt-6">
        Your <span className="text-green">Orderd Items</span>
      </h2>

      {/*   Second table */}
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>{data.map((el, ind) => ren(el.items))}</tbody>

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

export default Orders;
