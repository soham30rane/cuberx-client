import { useEffect, useState } from "react"
import axiosInstance from "../config/axiosInstance"

const useAxiosGet = (routeUrl) => {
    const [ error , setError ] = useState(null)
    const [ loading , setLoading] = useState(true)
    const [ data , setData ] = useState(null)

    useEffect(()=>{
        const getData = async () =>{
            axiosInstance.get(`${routeUrl}`)
            .then((response)=>{
                setData(response.data)
                setLoading(false)
                setError(null)
            })
            .catch((err)=>{
                setError(err)
                setLoading(false)
            })
        }
        getData()
    },[routeUrl])

    return { data , error , loading }
}

export default useAxiosGet