import { useEffect } from "react"

const Gameover = (props) =>{
    let message = "Game Over"
    if (props.score === props.words.length) {
        message = "You Won!"
    }
    useEffect(() => {
        const handleClick = () => {
            props.reset()
        }
        let btn = document.querySelector("button")
        btn.addEventListener("click", handleClick)
        return() => {
            btn.removeEventListener("click", handleClick)
        }
    })
    return (
        <div className="gameover">
            <h1>{message}</h1>
            {props.score > props.prevBest && 
                <h2>New High Score</h2>
            }
            <h3>Score: {props.score}</h3>
            <button>Play Again</button>
        </div>
    )
}

export default Gameover