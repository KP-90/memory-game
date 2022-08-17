import '../styles/stats.css'

const Stats = () => {
    return(
        <div className="stats">
            <div className="grid-view">
                <p>Best Score:</p>
                <p>0</p>
            </div>
            <div className="grid-view">
                <p>Easy wins:</p>
                <p>0</p>
            </div>
            <div className="grid-view">
                <p>Medium wins:</p>
                <p>0</p>
            </div>
            <div className="grid-view">
                <p>Hard wins:</p>
                <p>0</p>
            </div>
            <button>Reset Stats</button>
        </div>
    )
}

export default Stats