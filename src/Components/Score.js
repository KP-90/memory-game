const Score = (props) => {
    return (
        <div className="score">
            <p>Score: {props.score} | Best: {props.bestScore}</p>
        </div>
    )
}

export default Score