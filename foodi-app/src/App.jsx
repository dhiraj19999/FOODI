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
  const { user, updateCartcount, setUserInfo } = useContext(AuthContext);
  if (!user) {
    localStorage.removeItem("count");
    localStorage.removeItem("userData");
  }

  const getCartData = async () => {
    if (user && user?.email) {
      console.log("email", user.email);
      await axios
        .get(`http://localhost:4000/users/singleuser?email=${user.email}`)
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
            url: res.data.user.photoURL,
            role: res.data.user.role,
          })
        );
      await axios
        .get(`http://localhost:4000/cart?email=${user.email}`)
        .then((res) => {
          console.log(res.data);

          updateCartcount(res.data.length);
        })
        .catch((err) => console.log(err));
    }
  };
  useEffect(() => {
    getCartData();

    if (!user) {
      localStorage.removeItem("count");
    }
  }, [user, updateCartcount]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
