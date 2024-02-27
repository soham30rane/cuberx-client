import axios from "axios";
import { useContext, useState } from "react";
import TokenContext from "../../contexts/tokenContext";
import { Link } from "react-router-dom";
import './register.css'

const registerUser = async (credentials) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/register`,credentials)
        const userToken = response.data.token
        return userToken
    } catch(err) {
        console.log(err)
        return null
    }
}

function Register() {
    const [ email, setEmail ] = useState("")
    const  [ password , setPassword ] = useState("")
    const [ isRegisterd , setIsRegistered ] = useState(false)
    const { setToken , saveToken } = useContext(TokenContext)

    const handleSubmit = async () => {
        const userToken =  await registerUser({
            email : email,
            password : password
        })
        if(userToken){
            saveToken(userToken)
            setToken(userToken)
            setIsRegistered(true)
        }
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
            </form>
            {isRegisterd ? (
                <p className='message'>You are now registered in... <Link to="/">Home</Link></p>
            ): (
                <p className='message' > Unable to register </p>
            )}
        </div>
     );
}

export default Register;