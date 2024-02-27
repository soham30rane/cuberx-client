import { useState } from "react"

const useToken = () => {
    const [ token , setToken ] = useState()
    const saveToken = (userToken) => {
        localStorage.setItem('token',userToken)
    }
    const getToken = () => {
        var value = localStorage.getItem('token')
        return value
    }
    return {
        token,
        setToken,
        saveToken,
        getToken
    }
}

export default useToken