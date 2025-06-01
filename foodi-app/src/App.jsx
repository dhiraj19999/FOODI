import "./App.css";
import React, { useContext, useEffect } from "react";
import axios from "axios";
import AuthProvider, { AuthContext } from "./contexts/AuthProvider.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./router/Router.jsx";

function App() {
  const { user, setUserInfo, setCartcount, cartcount } = useContext(AuthContext);

  const getCartData = async () => {
    if (user && user.email) {
      try {
        const resUser = await axios.get(
          `https://foodi-server-t8gj.onrender.com/users/singleuser?email=${user.email}`
        );
        setUserInfo({
          name: resUser?.data.user.name,
          email: resUser?.data.user.email,
          url: resUser?.data.user.photoURL,
          role: resUser?.data.user.role,
          city: resUser?.data.user.city,
          pin: resUser?.data.user.pin,
          local: resUser?.data.user.local,
          id: resUser?.data.user._id,
          uid: resUser?.data.user.uid,
        });

        const resCart = await axios.get(
          `https://foodi-server-t8gj.onrender.com/cart?email=${user.email}`
        );
        setCartcount(resCart.data.length);
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    getCartData();
  }, [user]);

  // Move this inside useEffect to avoid state update during render
  useEffect(() => {
    if (!user) {
      setCartcount(0);
    }
  }, [user]);

  return <RouterProvider router={router} />;
}

export default App;
