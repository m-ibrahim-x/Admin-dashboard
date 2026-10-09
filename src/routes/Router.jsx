import { createBrowserRouter } from "react-router-dom";
import Unauthorized from "../pages/unauthorized";

import Login from "../pages/login";
import DashboardLayout from "../layouts/dashboard-layout";
import Dashboard from "../pages/dashboard";
import Users from "../pages/users";
import Products from "../pages/products";
import AddProduct from "../pages/add-product";
import ProductView from "../pages/product-view";
import EditProductPage from "../pages/edit-product";
import Orders from "../pages/orders";
import Carts from "../pages/carts";
import Settings from "../pages/settings";
import AdminProfile from "../pages/admin-profile";
import Wishlist from "../pages/wishlist";
import ProtectedRoute from "./protected-route";
import AdminRoute from "./admin-route";

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


