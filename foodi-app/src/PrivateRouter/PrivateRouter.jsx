import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import Alert from "../components/Alert";
import Swal from "sweetalert2";
const PrivateRouter = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return <p>Loading</p>;
  }
  if (user) {
    return children;
  } else {
    localStorage.removeItem("count");
    Swal.fire({
      title: "You are not logged in",
      text: "Please Login First",
      icon: "warning",
    });

    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
  }
};

export default PrivateRouter;
