import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Link, Navigate } from "react-router-dom";
import Swal from "sweetalert2";
const Profile = ({ user }) => {
  let use = localStorage.getItem("userData");

  let userData = JSON.parse(use);

  // console.log("data", userData.url);
  const {
    logOut,
    setUserInfo,
    userInfo,

    cartcount,
    setCartcount,
    updateCartcount,
  } = useContext(AuthContext);
  const handleLogout = () => {
    logOut()
      .then(() => {
        // Sign-out successful.
        // localStorage.removeItem("userData");
        setCartcount(0);
        setUserInfo("");
        // alert("Succesfully logout");
        Swal.fire({
          title: "Succesfully Logout",

          icon: "success",
          // showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.removeItem("count");
            setCartcount(0);
            setUserInfo("");
            <Navigate to={"/"} />;
            // window.location.reload();
          }
        });
      })
      .catch((error) => {
        // console.log(error);
      });
  };
  return (
    <div>
      <div className="drawer drawer-end z-50">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full  ">
              {userInfo?.url ? (
                <img src={userInfo?.url} />
              ) : (
                //<img alt="user" src="" />
                ""
              )}
            </div>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <a href="/update-profile">Profile</a>
            </li>
            <li>
              <Link to={"/orders"}>Orders</Link>
            </li>
            {userInfo.role == "admin" ? (
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            ) : (
              ""
            )}
            {userInfo ? (
              <li>
                <Link to={user ? `/cart/${user.email}` : "/"}>Cart </Link>
              </li>
            ) : (
              ""
            )}

            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
