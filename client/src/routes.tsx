import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import ProductPage from "./pages/ProductPage";
import SignUp from "./pages/SignUp";
import Checkout from "./pages/CheckoutPage";
import AdministrationPage from "./pages/AdministrationPage";
import OrdersHistory from "./pages/OrdersHistory";

const router = createBrowserRouter([
  {
    element: <Login />,
    path: "/login",
  },
  {
    element: <SignUp />,
    path: "/register",
  },
  {
    element: <Layout />,
    path: "/home",
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "products/:id",
        element: <ProductPage />,
      },
      {
        path: "orderHistory",
        element: <OrdersHistory />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "administration",
        element: <AdministrationPage />,
      },
    ],
  },
]);

export default router;
