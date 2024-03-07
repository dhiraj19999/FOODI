import React, { useContext, useState } from "react";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Modal from "./Model";
import { Cloudinary } from "@cloudinary/url-gen";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, login, setUserInfo } = useContext(AuthContext);
  // redirecting to home page or specifig page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const [photo, setPhoto] = useState("");
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    const city = data.city;
    const pin = data.pin;
    const local = data.local;
    const sendImage = async () => {
      const data = new FormData();
      data.append("file", photo);
      data.append("upload_preset", "FOODI-APP");
      data.append("cloud_name", "dp5yhq9kd");
      return await axios.post(
        "https://api.cloudinary.com/v1_1/dp5yhq9kd/image/upload",
        data
      );
    };
    createUser(email, password)
      .then((result) => {
        // Signed up

        console.log(result);

        const user = result.user;

        sendImage().then((res) => {
          const sendUsertoBackend = {
            email: data.email,
            name: name,
            photoURL: res.data.url,
            role: "user",
            city: city,
            pin: pin,
            local: local,
          };
          axios
            .post("http://localhost:4000/users", sendUsertoBackend)
            .then((res) =>
              /* localStorage.setItem(
                "userData",
                JSON.stringify({
                  name: res.data.name,
                  url: res.data.photoURL,
                  role: res.data.role,
                })
              )*/
              //  console.log("token", res.data.token, "name", res.data.user.name),
              setUserInfo({
                name: res.data.name,
                email: res.data.email,
                url: res.data.photoURL,
                role: res.data.role,
                city: res.data.city,
                pin: res.data.pin,
                local: res.data.local,
                id: res.data._id,

                // token: res.data.token,
              })
            );
        });
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Account creation successfully done!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => navigate("/"));

        document.getElementById("my_modal_5").close();

        //alert("Account creation successfully done!");

        navigate(from, { replace: true });

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  ///  image send to cloudinary

  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
      <div className="modal-action flex flex-col justify-center mt-0">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body"
          method="dialog"
        >
          <h3 className="font-bold text-lg">Create A Account!</h3>

          {/* name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="name"
              required
              className="input input-bordered"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {/* email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              required
              className="input input-bordered"
              {...register("email")}
            />
          </div>

          {/* photo */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo</span>
            </label>
            <input
              type="file"
              required
              onChange={(e) => setPhoto(e.target.files[0])}
              className="file-input file-input-bordered file-input-accent w-full max-w-xs"
            />
          </div>
          {/*   City */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">City</span>
            </label>
            <input
              type="text"
              placeholder="City"
              required
              className="input input-bordered"
              {...register("city")}
            />
          </div>
          {/*Pin code */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Pin Code</span>
            </label>
            <input
              type="number"
              placeholder="name"
              required
              className="input input-bordered"
              {...register("pin")}
            />
          </div>
          {/*  Local address  */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Local address</span>
            </label>
            <input
              type="text"
              placeholder="Local address"
              required
              className="input input-bordered"
              {...register("local")}
            />
          </div>
          {/* password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              required
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

          {/* login btn */}
          <div className="form-control mt-6">
            <input
              type="submit"
              value="Signup"
              className="btn bg-green text-white"
            />
          </div>

          <p className="text-center my-2">
            Have an account?{" "}
            <button
              className="underline text-red ml-1"
              onClick={() => document.getElementById("my_modal_5").showModal()}
            >
              Login
            </button>{" "}
          </p>

          <button
            onClick={() => navigate("/")}
            className="btn btn-sm btn-circle btn-ghost absolute right-9 top-2"
          >
            ✕
          </button>
        </form>

        {/* social sign in */}
        <div className="text-center space-x-3 mb-5">
          <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaGoogle />
          </button>
          <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaFacebookF />
          </button>
          <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaGithub />
          </button>
        </div>
      </div>
      <Modal />
    </div>
  );
};

export default Signup;
