import React, { useState } from "react";
import { FaUtensils } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../contexts/AuthProvider";
import { useContext } from "react";
import axios from "axios";
const AddMenu = () => {
  const { user, userInfo } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const [photo, setPhoto] = useState("");
  //console.log(data.image[0].name
  const onSubmit = (dat) => {
    sendImage().then(
      (res) => (
        (dat.image = res.data.url),
        console.log("dat.image", dat.image),
        axios
          .post("http://localhost:4000/menu/add", {
            name: dat.name,
            recipe: dat.recipe,
            image: res.data.url,
            category: dat.category,
            price: dat.price,
            email: userInfo.email,
          })
          .then((res) => console.log(res.data))
      )
    );
  };
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
  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Upload A New <span className="text-green">Menu Item</span>
      </h2>
      {/*  form here*/}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Recipe Name*</span>
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Recipe Name"
              className="input input-bordered w-full "
            />
          </div>
          {/*  select category */}
          <div className="flex items-center gap-4">
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              <select
                {...register("category", { required: true })}
                className="select select-bordered"
                defaultValue={"default"}
              >
                <option disabled value={"default"}>
                  Select a category
                </option>
                <option value={"salad"}>Salad</option>
                <option value={"pizza"}>Pizza</option>
                <option value={"soup"}>Soup</option>
                <option value={"dessert"}>Dessert</option>
                <option value={"drinks"}>Drinks</option>
                <option value={"popular"}>Popular</option>
              </select>
            </div>
            {/*  prices */}

            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Price*</span>
              </label>
              <input
                type="number"
                {...register("price", { required: true })}
                placeholder="Price"
                className="input input-bordered w-full "
              />
            </div>
          </div>

          {/* text area */}
          <div className="form-control ">
            <label className="label">
              <span className="label-text">Recipe Detail</span>
            </label>
            <textarea
              {...register("recipe", { required: true })}
              className="textarea textarea-bordered h-24"
              placeholder="Recipe Description"
            ></textarea>
          </div>
          {/*  file select */}
          <div className="form-control w-full my-6">
            <input
              type="file"
              {...register("image", { required: true })}
              onChange={(e) => setPhoto(e.target.files[0])}
              className="file-input  w-full max-w-xs"
            />
          </div>
          <button className="btn bg-green text-white px-6">
            {" "}
            Add Item <FaUtensils />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMenu;
