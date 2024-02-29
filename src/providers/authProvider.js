import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axiosInstance from "../config/axiosInstance";

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [ token,setToken ] = useState(() => localStorage.getItem('token'))

    const saveToken = (newToken) => {
        setToken(newToken)
    }

    useEffect(()=>{
        if(token){
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
            localStorage.setItem('token',token)
        } else {
            delete axiosInstance.defaults.headers.common['Authorization']
            localStorage.removeItem('token')
        }
    },[token])

    const contextValue = useMemo(()=>({
        token,
        saveToken
    }),[token])


    return ( 
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
     );
}

export const useAuth = () => {
    return useContext(AuthContext)
}

export default AuthProvider;