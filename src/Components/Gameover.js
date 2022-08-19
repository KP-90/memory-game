import { useEffect } from "react"
import {useWindowSize} from '@react-hook/window-size'
import Confetti from 'react-confetti'

const Gameover = (props) =>{
    let {local} = props

    // For use with Confetti
    const [width, height] = useWindowSize()

    let message = "Game Over"
    if (props.score + 1 === props.words.length) {
        message = "You Won!"
    }

    // Updates the page when the Play Again button is pressed
    useEffect(() => {
        const handleClick = () => {
            props.reset(5)
        }
        let btn = document.querySelector("#againBtn")
        btn.addEventListener("click", handleClick)
        return() => {
            btn.removeEventListener("click", handleClick)
        }
    })

    return (
        <div className="gameover">
            <Confetti width={width} height={height} numberOfPieces={props.amountConfetti} />
            <h1>{message}</h1>
            {props.score + 1 > props.bestScore && 
                <h2>New High Score</h2>
            }
            <h3>Score: {props.score + 1}</h3>
            <button id="againBtn">Play Again</button>
        </div>
    )
}

export default Gameover