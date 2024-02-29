import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import './register.css'
import { useAuth } from "../../providers/authProvider";
import axiosInstance from "../../config/axiosInstance";

function Register() {
    const [ email, setEmail ] = useState("")
    const  [ password , setPassword ] = useState("")
    const [ isRegisterd , setIsRegistered ] = useState(false)
    const { token , saveToken } = useAuth()
    const [ errorMsg, setErrorMsg ] = useState(null)

    const registerUser = async (credentials) => {
        try {
            const response = await axiosInstance.post(`/register`,credentials)
            const userToken = response.data.token
            return userToken
        } catch(err) {
            console.log(err)
            handleError(err)
            return null
        }
    }

    const handleError = (error) => {
        if(error){
            try {
                setErrorMsg(`${error.response.data.message}...`)
            } catch(err) {
                setErrorMsg("Server unreachable...")
            }
        }
    }

    const handleSubmit = async () => {
        const userToken =  await registerUser({
            email : email,
            password : password
        })
        if(userToken){
            saveToken(userToken)
            setIsRegistered(true)
        }
    }

    const handleLogout = () => {
        saveToken()
    }

    if(isRegisterd){
        return <Navigate to='/' />
    }

    if(token){
        return (
            <>
            <p>You are already Logged in.... Click here to logout</p>
            <button onClick={handleLogout} id='logout-btn'>Logout</button>
            </>
        )
    }

    return ( 
        <div className="login-container">
            <h2>Register</h2>
            <form className="login-form" onSubmit={e => e.preventDefault()} >
                <div className="form-group">
                    <input type="text" id="username" name="username" placeholder="Username" className="form-input" required 
                    onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <input type="password" id="password" name="password" placeholder="Password" className="form-input" required 
                    onChange={e => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn-login" onClick={handleSubmit}>Register</button>
                <div className="msg">{(errorMsg?<p>{errorMsg}</p>:<p></p>)} </div>
                <p className="login-link"><Link to="/login" >login</Link></p>
            </form>
        </div>
     );
}

export default Register;