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
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/update-profile",
        element: <UpdateProfile />,
      },
      {
        path: "/cart/:email",
        element: (
          <PrivateRouter>
            <CartPage />
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
        element: <Dashbord />,
      },
      {
        path: "users",
        element: <Users />,
      },
    ],
  },
]);

export default router;
