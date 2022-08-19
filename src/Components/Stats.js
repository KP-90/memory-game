import '../styles/stats.css'

const Stats = (props) => {
    let {local} = props
    
    const handleReset = () => {
        console.log("CLICK")
        let resetStats = {'bestScore': 0, 'easyWins': 0, 'mediumWins': 0, 'hardWins': 0}
        localStorage.setItem('memory', JSON.stringify(resetStats))
        props.setBestScore(0)
        props.reset()
        props.setLocal(resetStats)
        
    }

    return(
        <div className="stats">
            <div className="grid-view">
                <p>Best Score:</p>
                <p>{props.bestScore}</p>
            </div>
            <div className="grid-view">
                <p>Easy wins:</p>
                <p>{local.easyWins}</p>
            </div>
            <div className="grid-view">
                <p>Medium wins:</p>
                <p>{local.mediumWins}</p>
            </div>
            <div className="grid-view">
                <p>Hard wins:</p>
                <p>{local.hardWins}</p>
            </div>
            <button id='resetBtn' onClick={handleReset}>Reset Stats</button>
        </div>
    )
}

export default Stats