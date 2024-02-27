import axios from "axios"
import { useEffect, useState } from "react"

const useAxiosGet = (routeUrl,token) => {
    const [ error , setError ] = useState(null)
    const [ loading , setLoading] = useState(true)
    const [ data , setData ] = useState(null)

    useEffect(()=>{
        const options = {
            headers : {
                token : token
            }
        }
        var endpoint = `${process.env.REACT_APP_API_BASE_URL}`
        console.log(process.env.REACT_APP_API_BASE_URL)
        if(routeUrl){
            endpoint += `/${routeUrl}`
        }
        console.log(`endpoint  : ${endpoint}`)

        axios.get(endpoint,options)
        .then((response)=>{
            setData(response.data)
            setLoading(false)
            setError(null)
        })
        .catch((err)=>{
            setError(err)
            setLoading(false)
        })
    },[routeUrl,token])

    return { data , error , loading }
}

export default useAxiosGet