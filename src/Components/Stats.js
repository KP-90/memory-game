import '../styles/stats.css'

const Stats = (props) => {
    console.log("PROPS: ", props)
    let {local} = props
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