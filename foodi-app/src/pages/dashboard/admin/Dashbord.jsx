import React from "react";
import Chart from "chart.js/auto";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";

const Dashbord = () => {
  const { user } = useContext(AuthContext);

  const [total, setTotal] = useState(0);
  const [salad, setSalad] = useState(0);
  const [pizza, setPizza] = useState(0);
  const [desert, setDesert] = useState(0);
  const [soup, setSoup] = useState(0);
  const [drink, setDrink] = useState(0);
  const [saladstock, setSaladstock] = useState(0);
  const [pizzstock, setPizzastock] = useState(0);
  const [soupstock, setSoupstock] = useState(0);
  const [desertstock, setDesertstock] = useState(0);
  const [drinkstock, setDrinkstock] = useState(0);
  let tot = 0;
  let drnk = 0;
  let sou = 0;
  let deser = 0;
  let sala = 0;
  let pizz = 0;
  const dashCalculation = async (dat) => {
    console.log("dashCalculation");

    await dat?.map((el) => {
      totalCal(el.items);
    });

    console.log(tot);
  };

  const getOrders = async () => {
    await axios.get("http://localhost:4000/orders").then((res) => {
      dashCalculation(res.data);
    });
  };

  const totalCal = (item) => {
    console.log("totalCal");
    item.map((el) => {
      tot = tot + el.quantity;

      if (el.category == "drinks") {
        drnk = drnk + el.quantity;
      }
      if (el.category == "pizza") {
        pizz = pizz + el.quantity;
      }
      if (el.category == "dessert") {
        deser = deser + el.quantity;
      }
      if (el.category == "soup") {
        sou = sou + el.quantity;
      }
      if (el.category == "salad") {
        sala = sala + el.quantity;
      }
    });
    setTotal(tot);
    setDrink(Number((drnk / tot) * 100).toFixed(0));
    setDesert(Number((deser / tot) * 100).toFixed(0));
    setPizza(Number((pizz / tot) * 100).toFixed(0));
    setSalad(Number((sala / tot) * 100).toFixed(0));
    setSoup(Number((sou / tot) * 100).toFixed(0));
  };

  const fetchData = async () => {
    await axios.get("http://localhost:4000/menu").then((res) => {
      stock(res.data);
    });
  };

  const stock = (data) => {
    data.map((el) => {
      if (el.category == "salad") {
        setSaladstock((prev) => prev + 1);
      }
      if (el.category == "pizza") {
        setPizzastock((prev) => prev + 1);
      }
      if (el.category == "soup") {
        setSoupstock((prev) => prev + 1);
      }
      if (el.category == "dessert") {
        setDesertstock((prev) => prev + 1);
      }
      if (el.category == "drinks") {
        setDrinkstock((prev) => prev + 1);
      }
    });
  };

  useEffect(() => {
    getOrders();
    fetchData();
  }, []);
  const data = {
    labels: ["Salad", "Pizza", "Soup", "Drinks", "Dessert"],

    datasets: [
      {
        data: [salad, pizza, soup, drink, desert],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255,20,147)",
          "rgb(255,127,80)",
          "rgb(0,128,128)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  const menudata = {
    labels: ["Salad", "Pizza", "Soup", "Drinks", "Dessert"],

    datasets: [
      {
        data: [saladstock, pizzstock, soupstock, drinkstock, desertstock],
        backgroundColor: [
          "#cc2b5e",
          "#eb3349",
          "#ef629f",
          "#06beb6",
          "#7b4397",
        ],
        hoverOffset: 4,
      },
    ],
  };
  return (
    <div className="flex  flex-col sm:flex-row gap-32 items-center">
      <div className="mt-5 ">
        <h4 className="md:text-2xl text-md font-bold md:leading-snug leading-snug text-green">
          Items People
          <span className="ml-3 text-rose-500">Loves Most</span>
        </h4>
        <div className="mt-5">
          <Doughnut data={data} />
        </div>
      </div>
      <div className="mt-5">
        <h4 className="md:text-2xl text-md font-bold md:leading-snug leading-snug text-green">
          Items
          <span className="ml-3 text-rose-500">In Stock</span>
        </h4>
        <div className="mt-5">
          <Doughnut data={menudata} />
        </div>
      </div>
    </div>
  );
};

export default Dashbord;
