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
          path: "orders",
          element: <Orders />,
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
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
