import { useState } from "react";
import "./App.css";
import Splash from "./pages/Splash/Splash";
import Login from "./pages/Login/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import Home from "./pages/Home/Home";
import Categories from "./pages/Categories/Categories";
import Products from "./pages/Products/Products";
import Drivers from "./pages/Drivers/Drivers";
import Customers from "./pages/Customers/Customers";
import Orders from "./pages/Orders/Orders";
import Profile from "./pages/Profile/Profile";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import AddProduct from "./pages/AddProduct/AddProduct";
import OrderDetails from "./pages/OrderDetails/OrderDetails";
import AddDriver from "./pages/AddDriver/AddDriver";

function App() {
  const router = createBrowserRouter([
    {
      path: "/Pharmacy",
      element: <Splash />,
    },
    {
      path: "/Pharmacy/login",
      element: <Login />,
    },
    {
      path: "Pharmacy/home",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "categories",
          element: <Categories />,
        },
        {
          path: "products",
          element: <Products />,
        },
         {
          path: "products/:productId",
          element: <ProductDetails />,
        },
        {
          path: "addProduct/",
          element: <AddProduct />,
        },
        {
          path: "orders",
          element: <Orders />,
        },
        {
          path: "orders/:order_id",
          element: <OrderDetails />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "customers",
          element: <Customers />,
        },
        {
          path: "drivers",
          element: <Drivers />,
        },
         {
          path: "addDriver/",
          element: <AddDriver />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
