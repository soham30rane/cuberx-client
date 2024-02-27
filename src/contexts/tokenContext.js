import { createContext } from "react";

const TokenContext = createContext({
    token : "",
    setToken : () => {},
    saveToken : () => {},
    getToken : () => {}
})

export default TokenContext