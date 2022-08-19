import Card from './Components/Card';
import Score from './Components/Score';
import Instructions from './Components/Instructions';
import Gameover from './Components/Gameover';
import Stats from './Components/Stats';
import './App.css';
import { useEffect, useState } from 'react';

// Random words api info - https://www.npmjs.com/package/random-words

const App = () => {
  // Global variables for difficulty
  const EASY = 2
  const MEDIUM = 3
  const HARD = 20
  const IMPOSSIBLE = 50

  // Initialize local storage
  const [bestScore, setBestScore] = useState(0)
  const [local, setLocal] = useState({'bestScore': 0, 'easyWins': 0, 'mediumWins': 0, 'hardWins': 0})
  useEffect(() => {
    if(!localStorage.getItem("memory")) {
      localStorage.setItem('memory', JSON.stringify(local))
    }
    else {
      setLocal(JSON.parse(localStorage.getItem('memory')))
    }
    setBestScore(local.bestScore)
  }, [])
  

  // npm random-words. Used to get x amount of random words
  const [amountWords, setAmountWords] = useState(EASY)
  const randomWords = require('random-words');
  let wordsToUse = randomWords({min: 5, max: 10, exactly: amountWords})

  // Declaring everything now that set up is done
  const gameoverScreen = document.querySelector(".gameover")
  const [words, setWords] = useState(wordsToUse)
  const [clickedWords, setClickedWords] = useState([])
  const [score, setScore] = useState(0)
  const [prevBest, setPrevBest] = useState(bestScore)
  const [amountConfetti, setConfetti] = useState(0)
   
  
  // Used for gameover screen and chang in difficulty to set everything back to 0 and get new words
  const reset = (x) => {
    // x is the number of new words to get.
    if (gameoverScreen && gameoverScreen.style.display !== "none") {
      gameoverScreen.style.display = "none"
    }
    if(!x) {x = EASY}
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
      setLocal(prevState => ({...prevState, bestScore: score}))
      localStorage.setItem("memory", JSON.stringify(local))
      setConfetti(10)
    }

    // if winner
    if (score === words.length) {
      setScore(score - 1)
      setConfetti(200)
      let copy = local
      // Determine difficulty and update wins
      switch(words.length) {
        case EASY:
          copy.easyWins += 1
          break;
        case MEDIUM:
          copy.mediumWins += 1
          break;
        case HARD: 
          copy.hardWins += 1
          break;
        default:
          break;
      }
      // Save updated wins
      setLocal(copy)
      localStorage.setItem("memory", JSON.stringify(copy))
      // Show gameover screen
      gameoverScreen.style.display = "block"
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
      <Stats bestScore={prevBest} setBestScore={setBestScore} local={local} setLocal={setLocal} reset={reset}/>
      <Gameover score={score} reset={reset} bestScore={prevBest} words={words} amountConfetti={amountConfetti} local={local}/>
    </div>
  );
}

export default App;
