import Card from './Components/Card';
import Score from './Components/Score';
import Instructions from './Components/Instructions';
import Gameover from './Components/Gameover';
import './App.css';
import { useEffect, useState } from 'react';

// Random words api info - https://www.npmjs.com/package/random-words

const App = () => {

  // npm random-words. Used to get x amount of random words
  const [amountWords, setAmountWords] = useState(5)
  const randomWords = require('random-words');
  let wordsToUse = randomWords({min: 5, max: 10, exactly: amountWords})

  let gameoverScreen = document.querySelector(".gameover")

  // Declaring everything
  const [words, setWords] = useState(wordsToUse)
  const [clickedWords, setClickedWords] = useState([])
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [prevBest, setPrevBest] = useState(bestScore)
  const [amountConfetti, setConfetti] = useState(0)

   
  
  // Used for gameover screen and chang in difficulty to set everything back to 0 and get new words
  const reset = (x) => {
    // x is the number of new words to get.
    if (gameoverScreen && gameoverScreen.style.display !== "none") {
      gameoverScreen.style.display = "none"
    }
    wordsToUse = randomWords({min: 5, max: 10, exactly: x})
    setClickedWords([])
    setScore(0)
    setPrevBest(bestScore)
    setWords(wordsToUse)
    setConfetti(0)
  }

  useEffect(() => {
    // Handles clicking on the words and what to do from there (ie. continue the game or showe the gameover screen)
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
        let newClickedWord = clickedWords.concat(e.target.innerText)
        setClickedWords(newClickedWord)
        shuffle = shuffle.sort(() => Math.random() - 0.5)
        setWords(shuffle)
      }
    }

    // Updates bestscore in realtime
    if (score > bestScore) {
      setPrevBest(bestScore)
      setBestScore(score)
      setConfetti(10)
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
  }, [words, score, bestScore, clickedWords, amountWords])

  // determines if the user has won the game
  useEffect(() => {
    if (score === words.length) {
      setConfetti(200)
      gameoverScreen.style.display = "block"
    }
  }, [score])

  // Handling the change in difficulty
  const handleChange = (e) => {
    switch(e.target.value) {
      case "easy":
        reset(5)
        break;
      case "medium":
        reset(10)
        break;
      case "hard":
        reset(15)
        break;
      default:
        reset(5)
    }
  }
  
  return (
    <div className='App'>
      <div className='banner'>
        <></>
        <h1 className='title'>Memory</h1>
        <select className='difficulty' id='difficulty' onChange={handleChange}>
          <option value="easy">easy</option>
          <option value="medium">medium</option> 
          <option value='hard'>hard</option>
        </select>
      </div>
      <Score score={score} bestScore={bestScore}/>
      <Card wordArray={words} />
      <Instructions />
      <Gameover score={score} reset={reset} bestScore={prevBest} words={words} amountConfetti={amountConfetti}/>
    </div>
  );
}

export default App;
