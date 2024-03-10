import React, { useContext, useState } from "react";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";
const Modal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    signUpWithGmail,
    login,
    user,
    updateCartcount,
    setCartcount,
    setUserInfo,
    userInfo,
  } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // redirecting to home page or specifig page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    setLoading(true);
    const email = data.email;
    const password = data.password;
    // console.log(email, password)
    login(email, password)
      .then((result) => {
        // const user = result.user;
        setLoading(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login Successful!",
          showConfirmButton: false,
          timer: 1500,
        });
        if (user && user?.email) {
          axios
            .get(`http://localhost:4000/cart?email=${user.email}`)
            .then((res) => {
              setCartcount(res.data.length);
              //localStorage.setItem("count", Number(res.data.length));
              axios
                .get(
                  `http://localhost:4000/users/singleuser?email=${user.email}`
                )
                .then(
                  (res) =>
                    localStorage.setItem(
                      "userData",
                      JSON.stringify({
                        name: res.data.user.name,
                        url: res.data.user.photoURL,
                        role: res.data.user.role,
                        email: res.data.user.email,
                        city: res.data.user.city,
                        pin: res.data.user.pin,
                        local: res.data.user.local,
                        id: res.data.user._id,
                      })
                    ),
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
            })
            .catch((err) => setLoading(false));
        }

        document.getElementById("my_modal_5").close();
        navigate("/");
        // window.location.reload();
      })
      .catch((error) => {
        const errorMessage = error.message;
        setLoading(false);
        setErrorMessage("Provide a correct email and password!");
      });
  };

  // google signin
  const handleLogin = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        // alert("Login successfull!");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login Succesful!",
          showConfirmButton: false,
          timer: 1500,
        });
        document.getElementById("my_modal_5").close();

        navigate(from, { replace: true });
      })
      .catch((error) => console.log(error));
  };
  return (
    <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
      <div className="modal-box">
        <div className="modal-action flex flex-col justify-center mt-0">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card-body"
            method="dialog"
          >
            <h3 className="font-bold text-lg">Please Login!</h3>

            {/* email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email")}
              />
            </div>

            {/* password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register("password")}
              />
              <label className="label mt-1">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>

            {/* error */}
            {errorMessage ? (
              <p className="text-red text-xs italic">{errorMessage}</p>
            ) : (
              ""
            )}

            {/* login btn */}
            <div className="form-control mt-4">
              <button
                type="submit"
                value="Login"
                className="btn bg-green text-white "
              >
                {loading ? (
                  <span className="loading loading-infinity loading-lg text-neutral"></span>
                ) : (
                  "Login"
                )}
              </button>
            </div>

            <p className="text-center my-2">
              Donot have an account?{" "}
              <Link
                to="/signup"
                className="underline text-red ml-1"
                onClick={() => document.getElementById("my_modal_5").close()}
              >
                Signup Now
              </Link>{" "}
            </p>
            <button
              htmlFor="my_modal_5"
              onClick={() => document.getElementById("my_modal_5").close()}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
