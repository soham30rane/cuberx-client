import "./statsBrief.css"
import useAxiosGet from "../../hooks/useAxiosGet"
import { useContext, useEffect } from "react";
import TokenContext from "../../contexts/tokenContext";
import { Link } from "react-router-dom";

// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjVkYWViYTdlYzc3NTk1YzA0ZjExZWM3IiwiZW1haWwiOiJzaHVibWFuZ2lsbEBleGFtcGxlLmNvbSIsImlhdCI6MTcwODg3NDI0NCwiZXhwIjoxNzA4ODg1MDQ0fQ.KAi2516p__h2Hl7a4qI5F3mkK5CPqy62d1hFo1sLEpA"
function StatsBrief({ todaySolves, bestSolve , avgSolve }) {
    const { token,setToken,getToken } = useContext(TokenContext)
    console.log(`token from statsbrief: ${token}`)

    const { data , error , loading } = useAxiosGet("",token)

    useEffect(()=>{
        setToken(getToken())
    },[setToken,getToken])

    if(error){
        if(error.response.status === 401 || error.response.status === 403){
            return (
                <div className="api-error">
                    <p>Please  <Link to="/login">login</Link> to see your stats</p>
                </div>
            )
        } else {
            console.log(error)
            return (
                <div className="api-error">
                    <p>Error loading the data</p>
                </div>
            )
        }
    }

    return ( 
        <>
        <div className="statistics-section">
                <div className="stats-numbers">
                    <div className="statistic-today">
                        <div className="statistic-label">Today's Solves</div>
                        <div className="stats-today-values">
                            {todaySolves.map((item,i)=>(
                                <div className="statistic-value" key={i}>{item}</div>    
                            ))}
                        </div>
                    </div>
                    <div className="statistic-imp">
                        <div className="stat-item-imp">
                            <div className="statistic-label">Best Solve</div>
                            <div className="statistic-value">{bestSolve}</div>
                        </div>
                        <div className="stat-item-imp">
                            <div className="statistic-label">Average Solve</div>
                            <div className="statistic-value">{avgSolve}</div>
                        </div>
                    </div>
                </div>
                <div className="detailed-stats-link">
                    <a href="/">View Detailed Stats</a>
                </div>
                <div className="stats-graph">

                </div>
            </div>
        </>
     );
}

export default StatsBrief;