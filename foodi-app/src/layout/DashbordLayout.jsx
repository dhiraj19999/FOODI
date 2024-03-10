import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FaLocationArrow, FaQuestionCircle, FaUsers } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { Navigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FaBagShopping, FaCirclePlus } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";
import { AuthContext } from "../contexts/AuthProvider";
import { useContext } from "react";
import { FaUserAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import logo from "/logo.png";
const sharedLinks = (
  <>
    <li className="mt-3">
      <Link to="/">
        <MdDashboard /> Home
      </Link>
    </li>
    <li>
      <Link to={"/menu"}>
        <FaBagShopping />
        Menu
      </Link>
    </li>
    <li>
      <Link to={"/menu"}>
        <FaLocationArrow />
        Order Tracking
      </Link>
    </li>
    <li>
      <Link to={"/menu"}>
        <FaQuestionCircle />
        Customer Support
      </Link>
    </li>
  </>
);
const DashbordLayout = () => {
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
            <Navigate to={"/"} />;
            // window.location.reload();
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="drawer sm:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
          {/* Page content here */}
          <div className="flex  items-center justify-between mx-4">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden"
            >
              <MdDashboardCustomize />
            </label>
            <button
              onClick={() => handleLogout()}
              className="btn flex items-center gap-2 rounded-full px-6 bg-green sm:hidden text-white"
            >
              <FaUserAlt /> Log Out
            </button>
          </div>
          <div className="mt-5 md:mt-2 mx-4">
            <Outlet />
          </div>
        </div>
        <div className="drawer-side ">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <Link to={"/dashboard"} className="flex justify-start mb-3">
                <img src={logo} className="w-20" />
                <span className="badge badge-primary ">Admin</span>
              </Link>
            </li>
            <hr />
            <li className="mt-3">
              <Link to={"/dashboard"}>
                <MdDashboard />
                Dashbord
              </Link>
            </li>
            <li>
              <Link to={"/dashboard/mangeOrders"}>
                {" "}
                <FaShoppingCart /> Manage Bookings
              </Link>
            </li>
            <li>
              <Link to={"/dashboard/addmenu"}>
                <FaCirclePlus />
                Add Menu
              </Link>
            </li>
            <li>
              <Link to={"/dashboard/manage-items"}>
                {" "}
                <FaEdit />
                Manage Items
              </Link>
            </li>
            <li className="mb-3">
              <Link to={"/dashboard/users"}>
                {" "}
                <FaUsers />
                All Users
              </Link>
            </li>
            <hr />
            {/* shareLinks */}
            {sharedLinks}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashbordLayout;
