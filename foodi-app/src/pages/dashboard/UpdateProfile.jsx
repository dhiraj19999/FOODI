import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
const UpdateProfile = () => {
  const { updateUserProfile, userInfo, user, setUserInfo } =
    useContext(AuthContext);
  const [photo, setPhoto] = useState("");
  const [url, setUrl] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  //console.log(userInfo, "user");

  console.log(userInfo);

  useEffect(() => {}, []);

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

  const onSubmit = async (data) => {
    const name = data.name != "" ? data.name : userInfo.name;
    const photoURL = data.photoURL;
    const city = data.city != "" ? data.city : userInfo.city;
    const pin = data.pin != "" ? data.pin : userInfo.pin;
    const loca = data.local != "" ? data.local : userInfo.local;
    sendImage().then((res) => {
      const updateuser = {
        name: name,
        photoURL: res.data.url,

        city: city,
        pin: pin,
        local: loca,
      };
      axios
        .post(
          `http://localhost:4000/users/userUpdate/${userInfo.id}`,
          updateuser
        )
        .then((res) =>
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
        )
        .then(() =>
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Profile updated successfully!",
            showConfirmButton: false,
            timer: 1500,
          })
        )
        .then(() => navigate("/"))
        .catch((err) => console.log(err));
    });
  };
  // console.log(userInfo);
  return (
    <div className="flex items-center justify-center h-screen mt-[120px] mb-[60px]">
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold">Update Your Profile</h3>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>

            <input
              type="email"
              value={userInfo.email}
              readOnly
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              {...register("name")}
              type="text"
              placeholder="your name"
              defaultValue={userInfo.name}
              className="input input-bordered"
              required
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
              defaultValue={userInfo.city}
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
              defaultValue={userInfo.pin}
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
              defaultValue={userInfo.local}
              className="input input-bordered"
              {...register("local")}
            />
          </div>
          <div className="form-control mt-6">
            <input
              type="submit"
              value="Update"
              className="btn bg-green text-white"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
