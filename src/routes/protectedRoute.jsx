import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../providers/authProvider";
import { Navigate, Outlet } from "react-router-dom";
import axiosInstance from "../config/axiosInstance";

const ProtectedRoute = () => {
    const { token } = useAuth()
    const [ gotVerified , setGotVerified ] = useState(false)
    const [ gotUnVerified , setGotUnVerified ] = useState(false) 

    const verifyToken = useCallback(()=>{
        if(token){
            axiosInstance.get('/verifyToken')
            .then((r)=>{
                setGotVerified(true)
            })
            .catch((er)=>{
                setGotUnVerified(true)
            })
        }
    },[token])

    useEffect(()=>{
        const verifyTimeout = setTimeout(()=>{
            verifyToken()
        },100)
        return () =>{
            clearTimeout(verifyTimeout)
        }
    },[verifyToken])

    if(gotUnVerified){
        return <Navigate to={`/login`}/>
    }

    if(!token){
        return <Navigate to={`/login`}/>
    }

    return ( 
        <>
            {(gotVerified ? <Outlet /> : <p>Loading...</p>)}
        </>
     );
}

export default ProtectedRoute;