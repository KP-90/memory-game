import { useEffect } from "react"

const Gameover = (props) =>{
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
            <h1>Game Over</h1>
            <h3>Score: {props.score}</h3>
            {props.score > props.bestScore && 
                <h2>New High Score</h2>
            }
            <button>Play Again</button>
        </div>
    )
}

export default Gameover