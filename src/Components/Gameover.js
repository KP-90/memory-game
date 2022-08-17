import { useEffect } from "react"
import {useWindowSize} from '@react-hook/window-size'
import Confetti from 'react-confetti'

const Gameover = (props) =>{
    let {local} = props

    // For use with Confetti
    const [width, height] = useWindowSize()

    let message = "Game Over"
    if (props.score === props.words.length) {
        local.easyWins += 1
        localStorage.setItem('memory', JSON.stringify(local))
        message = "You Won!"
    }

    // Updates the page when the Play Again button is pressed
    useEffect(() => {
        const handleClick = () => {
            props.reset(5)
        }
        let btn = document.querySelector("button")
        btn.addEventListener("click", handleClick)
        return() => {
            btn.removeEventListener("click", handleClick)
        }
    })

    return (
        <div className="gameover">
            <Confetti width={width} height={height} numberOfPieces={props.amountConfetti} />
            <h1>{message}</h1>
            {props.score > props.bestScore && 
                <h2>New High Score</h2>
            }
            <h3>Score: {props.score}</h3>
            <button>Play Again</button>
        </div>
    )
}

export default Gameover