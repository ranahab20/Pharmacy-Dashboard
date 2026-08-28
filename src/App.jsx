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
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import AddProduct from "./pages/AddProduct/AddProduct";
import OrderDetails from "./pages/OrderDetails/OrderDetails";
import AddDriver from "./pages/AddDriver/AddDriver";
import { Toaster } from "react-hot-toast";
import NotFound from "./pages/NotFound/NotFound";

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
        }
       
      ],
    },
     {
      path: "*",
      element: <NotFound />,
    }
  ]);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <RouterProvider router={router} />
    </>
  );
}

export default App;
