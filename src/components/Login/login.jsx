import './login.css'
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axiosInstance from '../../config/axiosInstance';
import { useAuth } from '../../providers/authProvider';

function Login() {
    const { token,saveToken } = useAuth()
    const [ loggedIn , setLoggedIn ] = useState(false)
    const [ email, setEmail ] = useState("")
    const  [ password , setPassword ] = useState("")
    const [ errorMsg, setErrorMsg ] = useState(null)

    const loginUser = async (credentials) => {
        try {
            const response  = await axiosInstance.post(`/login`,credentials)
            const userToken = response.data.token
            setErrorMsg(null)
            return userToken
        } catch(err){
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
        const userToken = await loginUser({
            email : email,
            password : password
        })
        if(userToken){
            saveToken(userToken)
            setLoggedIn(true)
        }
    }

    const handleLogout = () =>{
        saveToken()
    }

    if(loggedIn){
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
            <h2>Login</h2>
            <form className="login-form" onSubmit={e => e.preventDefault()} >
                <div className="form-group">
                    <input type="text" id="username" name="username" placeholder="Username" className="form-input" required 
                    onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <input type="password" id="password" name="password" placeholder="Password" className="form-input" required 
                    onChange={e => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn-login" onClick={handleSubmit}>Login</button>
                <div className="msg">{(errorMsg?<p>{errorMsg}</p>:<p></p>)} </div>
                <p className="register-link"><Link to="/register" >Register</Link></p>
            </form>
        </div>
     );
}

export default Login;