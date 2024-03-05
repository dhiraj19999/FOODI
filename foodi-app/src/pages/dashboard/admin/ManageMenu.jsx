import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
const ManageMenu = () => {
  const [menu, setMenu] = useState([]);

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
          .delete(`http://localhost:4000/menu/${item._id}`)
          .then((res) => fetchData())
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

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:4000/menu");
      const data = await response.json();
      setMenu(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Fetch data from the backend

    fetchData();
  }, []);
  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Manage All <span className="text-green">Menu Items</span>
      </h2>
      {/*  menu item table */}
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
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {menu.map((el, ind) => (
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
                    <Link to={`/dashboard/update-menu/${el._id}`}>
                      {" "}
                      <button className="btn btn-xs bg-orange-400 text-white">
                        <FaEdit />
                      </button>
                    </Link>
                  </td>
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageMenu;
