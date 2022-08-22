import Card from './Components/Card';
import Score from './Components/Score';
import Instructions from './Components/Instructions';
import Gameover from './Components/Gameover';
import Stats from './Components/Stats';
import './App.css';
import { useEffect, useState } from 'react';

// Random words api info - https://www.npmjs.com/package/random-words

const App = () => {

  // Declare global difficulties
  const EASY = 5
  const MEDIUM = 10
  const HARD = 20

  // Initialize local storage if there isn't one yet
  if(!localStorage.getItem("memStats")) {
    let newStorage = {"bestScore": 0, "wins": {
      "easy": 0,
      "medium": 0,
      "hard": 0
    }}
    localStorage.setItem("memStats", JSON.stringify(newStorage))
  }

  // npm random-words. Used to get x amount of random words
  const [amountWords, setAmountWords] = useState(EASY)
  const randomWords = require('random-words');
  let wordsToUse = randomWords({min: 5, max: 10, exactly: amountWords})

  

  // Declaring everything
  let gameoverScreen = document.querySelector(".gameover")
  const [words, setWords] = useState(wordsToUse)
  const [clickedWords, setClickedWords] = useState([])
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(() => {
    let storage = JSON.parse(localStorage.getItem("memStats"))
    return storage.bestScore
  })
  const [wins, setWins] = useState(() => {
    let storage = JSON.parse(localStorage.getItem("memStats"))
    return storage.wins
  })
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

  // Handles clicking on the words and what to do from there (ie. continue the game or show the gameover screen)
  useEffect(() => {
    const handleClick = (e) => {
      let shuffle = words.slice()
      if (clickedWords.includes(e.target.innerText)) {
        if (score > bestScore) {
          setPrevBest(bestScore)
          setBestScore(score)
          let copy = JSON.parse(localStorage.getItem("memStats"))
          console.log(copy)
          copy.bestScore = score
          localStorage.setItem("memStats", JSON.stringify(copy))
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
      let copy = JSON.parse(localStorage.getItem("memStats"))
      copy.bestScore = score
      localStorage.setItem("memStats", JSON.stringify(copy))
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
      // Determine win type
      let copy = JSON.parse(localStorage.getItem("memStats"))
      switch (words.length) {
        case EASY:
          copy.wins.easy += 1
          break;
        case MEDIUM:
          copy.wins.medium += 1
          break;
        case HARD:
          copy.wins.hard += 1
          break;
        default:
          break;
      }
      // Save new copy to local storage
      setWins(copy.wins)
      localStorage.setItem("memStats", JSON.stringify(copy))
    }
  }, [score])

  // Handling the change in difficulty
  const handleChange = (e) => {
    switch(e.target.value) {
      case "easy":
        reset(EASY)
        break;
      case "medium":
        reset(MEDIUM)
        break;
      case "hard":
        reset(HARD)
        break;
      default:
        reset(EASY)
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
      <Score score={score} bestScore={bestScore} />
      <Card wordArray={words} />
      <Instructions />
      <Stats bestScore={bestScore} wins={wins} />
      <Gameover score={score} reset={reset} bestScore={prevBest} words={words} amountConfetti={amountConfetti}/>
    </div>
  );
}

export default App;
