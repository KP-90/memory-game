import Card from './Components/Card';
import Score from './Components/Score';
import Gameover from './Components/Gameover';
import './App.css';
import { useEffect, useState } from 'react';

// Random words api info - https://www.npmjs.com/package/random-words

const App = () => {

  let gameoverScreen = document.querySelector(".gameover")

  // npm random-words. Used to get x amount of random words
  let randomWords = require('random-words');
  let wordsToUse = randomWords({min: 5, max: 10, exactly: 20}) 

  // Declaring everything
  const [words, setWords] = useState(wordsToUse)
  const [clickedWords, setClickedWords] = useState([])
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [prevBest, setPrevBest] = useState(bestScore)

  // Used for gameover screen to set everything back to 0
  const reset = () => {
    gameoverScreen.style.display = 'none'
    setClickedWords([])
    setScore(0)
    setPrevBest(bestScore)
    setWords(wordsToUse)
  }

  useEffect(() => {
    
    const handleClick = (e) => {
      let shuffle = words.slice()
      if (clickedWords.includes(e.target.innerText)) {
        if (score > bestScore) {
          setPrevBest(bestScore)
          setBestScore(score)
        }
        gameoverScreen.style.display = "block"
      }
      else {
        setScore(score + 1)
        let foo = clickedWords.concat(e.target.innerText)
        setClickedWords(foo)
        shuffle = shuffle.sort(() => Math.random() - 0.5)
        setWords(shuffle)
      }
    }

    // Updates bestscore in realtime
    if (score > bestScore) {
      setPrevBest(bestScore)
      setBestScore(score)
    }

    // Check for win
    if (score === words.length) {
      gameoverScreen.style.display = 'block'
    }

    // Add event listeners
    let allP = document.querySelectorAll("p")
    allP.forEach(p => {
      p.addEventListener("click", handleClick)
    })
    
    return() => {
      allP.forEach(p => {
        p.removeEventListener("click", handleClick)
      })
    }
  }, [words, score, bestScore, clickedWords])

  return (
    <div className='App'>
      <Score score={score} bestScore={bestScore}/>
      <Card wordArray={words} />
      <Gameover score={score} reset={reset} bestScore={prevBest} words={words} />
    </div>
  );
}

export default App;
