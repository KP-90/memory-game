import '../styles/stats.css'

const Stats = (props) => {

    let {wins} = props

    const handleReset = () => {
        console.log("PLEASE IMPLENT RESET PROCESS....")
        let newStorage = {"bestScore": 0, "wins": {
            "easy": 0,
            "medium": 0,
            "hard": 0
          }}
          localStorage.setItem("memStats", JSON.stringify(newStorage))
          // trigger State change to update somehow
    }

    return(
        <div className="stats">
            <div className="grid-view">
                <p>Best Score:</p>
                <p>{props.bestScore}</p>
            </div>
            <div className="grid-view">
                <p>Easy wins:</p>
                <p>{wins.easy}</p>
            </div>
            <div className="grid-view">
                <p>Medium wins:</p>
                <p>{wins.medium}</p>
            </div>
            <div className="grid-view">
                <p>Hard wins:</p>
                <p>{wins.hard}</p>
            </div>
            <button id='resetBtn' onClick={handleReset}>Reset Stats</button>
        </div>
    )
}

export default Stats