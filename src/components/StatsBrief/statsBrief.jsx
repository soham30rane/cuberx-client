import "./statsBrief.css"

function StatsBrief() {

    return ( 
        <>
        <div className="statistics-section">
                <div className="stats-numbers">
                    <div className="statistic-today">
                        <div className="statistic-label">Today's Solves</div>
                        <div className="stats-today-values">
                            <div className="statistic-value">1:23.45</div>
                            <div className="statistic-value">0:45.67</div>
                            <div className="statistic-value">0:45.67</div>
                            <div className="statistic-value">0:45.67</div>
                            <div className="statistic-value">0:45.67</div>
                            <div className="statistic-value">0:45.67</div>
                            <div className="statistic-value">0:45.67</div>
                            <div className="statistic-value">0:45.67</div>
                            <div className="statistic-value">0:45.67</div>
                            <div className="statistic-value">0:45.67</div>
                        </div>
                    </div>
                    <div className="statistic-imp">
                        <div className="stat-item-imp">
                            <div className="statistic-label">Best Solve</div>
                            <div className="statistic-value">0:45.67</div>
                        </div>
                        <div className="stat-item-imp">
                            <div className="statistic-label">Average Solve</div>
                            <div className="statistic-value">0:45.67</div>
                        </div>
                    </div>
                </div>
                <div className="stats-graph">

                </div>
                <div className="detailed-stats-link">
                    <a href="/">View Detailed Stats</a>
                </div>
            </div>
        </>
     );
}

export default StatsBrief;