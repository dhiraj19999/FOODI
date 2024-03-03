import "./App.css";
import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import { useContext, useEffect } from "react";
import AuthProvider from "./contexts/AuthProvider.jsx";
import { AuthContext } from "../src/contexts/AuthProvider.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/Router.jsx";

import Navbar from "./components/Navbar.jsx";
function App() {
  const { user, updateCartcount } = useContext(AuthContext);
  if (!user) {
    localStorage.removeItem("count");
  }

  const getCartData = async () => {
    if (user && user?.email) {
      await axios
        .post(`http://localhost:4000/cartItem?email=${user.email}`)
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
