import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import Alert from "../components/Alert";
import Swal from "sweetalert2";

const AdminRouter = ({ children }) => {
  const { user, userInfo, loading } = useContext(AuthContext);
  const location = useLocation();
  /*if (loading) {
    return <LoadingSpinner />;
  }*/
  if (userInfo.role == "admin") {
    return children;
  } else {
    // localStorage.removeItem("count");
    Swal.fire({
      title: "Unathorised",
      text: "Your not admin",
      icon: "warning",
    });
    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
  }
};

export default AdminRouter;
