import { createBrowserRouter } from "react-router";
import Home from "../components/Homes/Home/Home";
import MainLayout from "../layout/MainLayout";
import Login from "../pages/Login";
import Register from "../pages/Register/Register";
import Payment from "../pages/Payment/Payment";
import PaymentSuccess from "../pages/PaymentSucess/PaymentSuccess";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/payment",
        Component: Payment,
      },
      {
        path: "/success",
        Component: PaymentSuccess,
      },
    ],
  },
]);

export default router;
