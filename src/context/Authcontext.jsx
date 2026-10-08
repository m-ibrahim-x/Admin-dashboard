import { createContext, useState, useEffect } from "react";
import { login as loginApi, logout as logoutApi, authMe } from "../api/authApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(
        localStorage.getItem("token")
    );
    const [loading, setLoading] = useState(true);

    // Verify the stored token and restore the authenticated user on initial load.
    useEffect(()=>{
        const fetchUser= async () =>{
            if (token) {
                try{
                    const response = await authMe()
                    setUser(response.data.user)
                } catch{
                    localStorage.removeItem("token")
                    setToken(null)
                    setUser(null)
                } finally{
                    setLoading(false)
                }
            } else{
                setLoading(false)
            }
        }

        fetchUser()
    }, [token])

    // Authenticate the user and store the token and user data.
    const login= async (email, password) =>{
        const response = await loginApi({email, password})

        localStorage.setItem("token", response.data.token)

        setToken(response.data.token)
        setUser(response.data.user)

        return response.data
    }

    // Log out the user and clear the authentication state.
    const logout= async () =>{
        try{
            await logoutApi()
        } catch(error){
            console.error(error);
        } finally{
            localStorage.removeItem("token")
            setToken(null)
            setUser(null)
        }
    }

    return (
        <AuthContext.Provider value={{user, token, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    )
};