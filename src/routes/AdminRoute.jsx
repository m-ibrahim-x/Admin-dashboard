import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/Authcontext";

const AdminRoute = () => {
    const { user } = useContext(AuthContext);

    if (!user || user.role !== "admin") {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};

export default AdminRoute;
