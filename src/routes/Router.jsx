/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import DashboardLayout from "../layout/DashboardLayout";
import PageFallback from "../components/PageFallback";

// Lazy-loaded pages
const Unauthorized = lazy(() => import("../pages/unauthorized"));
const Login = lazy(() => import("../pages/Login"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Users = lazy(() => import("../pages/Users"));
const Products = lazy(() => import("../pages/Products"));
const AddProduct = lazy(() => import("../pages/AddProduct"));
const ProductView = lazy(() => import("../pages/ProductView"));
const EditProductPage = lazy(() => import("../pages/EditProductPage"));
const Orders = lazy(() => import("../pages/Orders"));
const Carts = lazy(() => import("../pages/Carts"));
const Settings = lazy(() => import("../pages/Settings"));
const AdminProfile = lazy(() => import("../pages/AdminProfile"));

// Wrap standalone lazy-loaded routes with Suspense
const withSuspense = (element) => (
    <Suspense fallback={<PageFallback />}>
        {element}
    </Suspense>
);

export const router = createBrowserRouter([
    {
        path: "/login",
        element: withSuspense(<Login />),
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
                            }
                        ],
                    },
                ],
            },
        ],
    },
    {
        path: "/unauthorized",
        element: withSuspense(<Unauthorized />),
    },
]);
