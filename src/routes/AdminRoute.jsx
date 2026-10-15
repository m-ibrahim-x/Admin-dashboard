import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/Authcontext";
import  Loading from "../components/Loading"

const AdminRoute = () => {
    const { loading, user } = useContext(AuthContext);

    if (loading) {
        return <Loading />;
    }

    if (!user || user.role !== "admin") {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};

export default AdminRoute;
