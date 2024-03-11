import "./App.css";
import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import { useContext, useEffect } from "react";
import AuthProvider from "./contexts/AuthProvider.jsx";
import { AuthContext } from "../src/contexts/AuthProvider.jsx";
import "./index.css";
import { RouterProvider, json } from "react-router-dom";
import router from "./router/Router.jsx";

import Navbar from "./components/Navbar.jsx";
function App() {
  const {
    user,
    updateCartcount,
    setUserInfo,
    userInfo,
    setCartcount,
    cartcount,
  } = useContext(AuthContext);
  if (!user) {
    setCartcount(0);
  }

  const getCartData = async () => {
    if (user && user?.email) {
      // console.log("email", user.email);
      await axios
        .get(
          `https://foodi-server-t8gj.onrender.com/users/singleuser?email=${user.email}`
        )
        .then((res) =>
          /* localStorage.setItem(
            "userData",
            JSON.stringify({
              name: res.data.user.name,
              url: res.data.user.photoURL,
              role: res.data.user.role,
            })
          ),*/

          setUserInfo({
            name: res.data.user.name,
            email: res.data.user.email,
            url: res.data.user.photoURL,
            role: res.data.user.role,
            city: res.data.user.city,
            pin: res.data.user.pin,
            local: res.data.user.local,
            id: res.data.user._id,
          })
        );
      await axios
        .get(`https://foodi-server-t8gj.onrender.com/cart?email=${user.email}`)
        .then((res) => {
          // console.log(res.data);

          setCartcount(res.data.length);
        })
        .catch((err) => console.log(err));
    }
  };
  useEffect(() => {
    getCartData();

    if (!user) {
      // localStorage.removeItem("count");
      setCartcount(0);
    }
  }, [user, cartcount]);
  // console.log(userInfo);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
