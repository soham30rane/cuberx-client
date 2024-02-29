import "./statsBrief.css"
import useAxiosGet from "../../hooks/useAxiosGet"
import { useAuth } from "../../providers/authProvider";

function StatsBrief({ todaySolves, bestSolve , avgSolve }) {
    const { token } = useAuth()
    const { data , error , loading } = useAxiosGet("/")

    if(!token){
        return (
            <div className="api-error">
                {/* Cant use Link tag here because the content router is not accessible from here */}
                <p>Please  <a href="/login">login</a> or <a href="/register">register</a> to see your stats</p> 
            </div>
        )
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