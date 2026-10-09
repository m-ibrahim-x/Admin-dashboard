import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react"
import { AuthContext } from "../context/Authcontext"
import Loading from "../components/Loading"

const ProtectedRoute = () => {
    const {token, loading } = useContext(AuthContext)
    const location = useLocation()
    
    if(loading){
        return <Loading/>
    }

    if(!token){
        return  <Navigate to="/login" replace state={{from : location}}/>
    }

    return <Outlet/>
}

export default ProtectedRoute