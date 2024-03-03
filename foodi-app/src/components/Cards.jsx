import React, { useContext, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
const Cards = ({ item }) => {
  // console.log(item)
  const { name, image, price, recipe, _id } = item;
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const { user, updateCartcount, cartcount } = useContext(AuthContext);

  console.log(cartcount);
  let update;
  const addToCart = async (item) => {
    //console.log("button is clicked", item);
    if (user && user?.email) {
      const cartItem = {
        menuItemId: _id,
        name,
        quantity: 1,
        image,
        price,
        email: user.email,
      };

      try {
        await axios
          .post("http://localhost:4000/carts", cartItem)
          .then((res) => {
            console.log(res.data.message);

            Swal.fire({
              position: "center",
              icon: "success",
              title: `${res.data.message}`,
              showConfirmButton: true,
              // timer: 1500,
            }).then((re) => {
              if (
                re.isConfirmed &&
                res.data.message != "Item Already in the cart"
              ) {
                update = Number(Number(cartcount) + 1);
                updateCartcount(update);
                console.log(cartcount);
              }
            });
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };
  return (
    <div
      to={`/menu/${item._id}`}
      className="card shadow-xl relative mr-5 md:my-5"
    >
      <div
        className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-green ${
          isHeartFilled ? "text-rose-500" : "text-white"
        }`}
        onClick={handleHeartClick}
      >
        <FaHeart className="w-5 h-5 cursor-pointer" />
      </div>
      <Link to={`/menu/${item._id}`}>
        <figure>
          <img
            src={item.image}
            alt="Shoes"
            className="hover:scale-105 transition-all duration-300 md:h-72"
          />
        </figure>
      </Link>
      <div className="card-body">
        <Link to={`/menu/${item._id}`}>
          <h2 className="card-title">{item.name}!</h2>
        </Link>
        <p>Description of the item</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            <span className="text-sm text-red">$ </span> {item.price}
          </h5>
          <button
            className="btn bg-green text-white  hover:bg-black hover:text-rose-300"
            onClick={() => addToCart(item)}
          >
            Add to Cart{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
