const Gameover = (props) => {
    let length = props.oldWords.length

    const LeftSide = () => {
        return(
            <ol>
                {props.oldWords.map((word, i) => {
                    if(i >= length / 2) {return null}
                    return <li key={i}>{word}</li>
                })}
            </ol>
        )
    }

    const RightSide = () => {
        return(
            <ol start={1+length/2}>
                {props.oldWords.map((word, i) => {
                    if(i < length / 2) {return null}
                    return <li key={i}>{word}</li>
                })}
            </ol>
        )
    }
    
    return(
        <div className="modal">
            <h1>Game Over</h1>
            <h3>Score: {props.score}</h3>
            <div className="modal-words">
                <LeftSide />
                <RightSide />
            </div>
            <button className="playAgain" onClick={props.reset}>Play Again</button>
        </div>
    )
}

export default Gameover