import { Navigate, createBrowserRouter } from "react-router-dom";
// import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
// import ProductPage from "./pages/ProductPage";
import SignUp from "./pages/SignUp";
// import Checkout from "./pages/Checkout";
// import InsertProduct from "./pages/InsertProduct";

const router = createBrowserRouter([
  {
    element: <Navigate to="/login" />,
    path: "/",
  },
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
    // children: [
    //   { index: true, element: <HomePage /> },
    //   {
    //     path: "products/:id",
    //     element: <ProductPage />,
    //   },
    //   {
    //     path: "checkout",
    //     element: <Checkout />,
    //   },
    //   {
    //     path: "insert-product",
    //     element: <InsertProduct />,
    //   },
    // ],
  },
]);

export default router;
