import axios from 'axios';
import './login.css'
import { useContext, useState } from 'react';
import TokenContext from '../../contexts/tokenContext';
import { Link } from 'react-router-dom';

const loginUser = async (credentials) => {
    try {
        const response  = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/login`,credentials)
        const userToken = response.data.token
        return userToken
    } catch(err){
        console.log(err)
        return null
    }
}

function Login({updateContentBg}) {
    const { setToken,saveToken } = useContext(TokenContext)
    const [ loggedIn , setLoggedIn ] = useState(false)
    const [ email, setEmail ] = useState("")
    const  [ password , setPassword ] = useState("")

    const handleSubmit = async () => {
        const userToken = await loginUser({
            email : email,
            password : password
        })
        if(userToken){
            saveToken(userToken)
            setToken(userToken)
            setLoggedIn(true)
        }
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
            </form>
            {loggedIn ? (
                <p className='message'>You are now logged in... <Link to="/">Home</Link></p>
            ): (
                <p className='message' >You are not logged in</p>
            )}
        </div>
     );
}

export default Login;