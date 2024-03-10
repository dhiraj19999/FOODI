import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/shop/Menu";
import Signup from "../components/Signup";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import CartPage from "../pages/shop/CartPage";

import DashbordLayout from "../layout/DashbordLayout";
import Dashbord from "../pages/dashboard/admin/Dashbord";
import Users from "../pages/dashboard/admin/Users";
import AddMenu from "../pages/dashboard/admin/AddMenu";
import ManageMenu from "../pages/dashboard/admin/ManageMenu";
import UpdateMenu from "../pages/dashboard/admin/UpdateMenu";
import Payment from "../pages/shop/Payment";
import Orders from "../pages/shop/Orders";
import Order from "../pages/dashboard/Order";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: (
          <PrivateRouter>
            <Menu />
          </PrivateRouter>
        ),
      },
      {
        path: "/orders",
        element: (
          <PrivateRouter>
            <Orders />
          </PrivateRouter>
        ),
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/update-profile",
        element: (
          <PrivateRouter>
            {" "}
            <UpdateProfile />
          </PrivateRouter>
        ),
      },
      {
        path: "/cart/:email",
        element: (
          <PrivateRouter>
            <CartPage />
          </PrivateRouter>
        ),
      },
      {
        path: "/process-checkout",
        element: (
          <PrivateRouter>
            {" "}
            <Payment />
          </PrivateRouter>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashbordLayout />,
    children: [
      {
        path: "",
        element: (
          <PrivateRouter>
            <Dashbord />{" "}
          </PrivateRouter>
        ),
      },
      {
        path: "mangeOrders",
        element: (
          <PrivateRouter>
            <Order />{" "}
          </PrivateRouter>
        ),
      },
      {
        path: "users",
        element: (
          <PrivateRouter>
            <Users />{" "}
          </PrivateRouter>
        ),
      },
      {
        path: "addmenu",
        element: (
          <PrivateRouter>
            <AddMenu />{" "}
          </PrivateRouter>
        ),
      },
      {
        path: "manage-items",
        element: (
          <PrivateRouter>
            {" "}
            <ManageMenu />{" "}
          </PrivateRouter>
        ),
      },
      {
        path: "update-menu/:id",
        element: (
          <PrivateRouter>
            <UpdateMenu />{" "}
          </PrivateRouter>
        ),
      },
    ],
  },
]);

export default router;
