import { createBrowserRouter } from "react-router-dom";
import Unauthorized from "../pages/unauthorized";

import Login from "../pages/Login";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Products from "../pages/Products";
import AddProduct from "../pages/AddProduct";
import ProductView from "../pages/ProductView";
import EditProductPage from "../pages/EditProductPage";
import Orders from "../pages/Orders";
import Carts from "../pages/Carts";
import Settings from "../pages/Settings";
import AdminProfile from "../pages/AdminProfile";
import AdminRoute from "./AdminRoute";
import ProtectedRoute from "./ProtectedRoute";
import Wishlist from "../pages/Wishlist";
export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },

    {
        element: <ProtectedRoute />,
        children: [
        {
            element: <AdminRoute />,
            children: [
            {
                path: "/",
                element: <DashboardLayout />,
                children: [
                {
                    index: true,
                    element: <Dashboard />,
                },
                {
                    path: "users",
                    element: <Users />,
                },
                {
                    path: "products",
                    element: <Products />,
                },
                {
                    path: "add-product",
                    element: <AddProduct />,
                },
                {
                    path: "products/:id",
                    element: <ProductView />,
                },
                {
                    path: "products/edit/:id",
                    element: <EditProductPage />,
                },
                {
                    path: "orders",
                    element: <Orders />,
                },
                {
                    path: "carts",
                    element: <Carts />,
                },
                {
                    path: "settings",
                    element: <Settings />,
                },
                {
                    path: "adminProfile",
                    element: <AdminProfile />,
                },
                {
                    path: "wishlist",
                    element: <Wishlist />,
                },
                ],
            },
            ],
        },
        ],
    },

    {
        path: "/unauthorized",
        element: <Unauthorized/>
    },
]);


