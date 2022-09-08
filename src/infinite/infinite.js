import { useState, useEffect } from 'react';
import Gameover from './components/Gameover';
import './infinite.css';

let randomWords = require('random-words');

const Infinite = () => {
  
  const [oldWords, setOldWords] = useState([])
  const [score, setScore] = useState(0)
  const [newWord, setNewWord] = useState(randomWords(1)[0])

  // Handles deciding whether a new word or an old word is chosen to display
  const determineTest = () => {
    // 50/50 chance of old vs new
    let test = Math.random() < 0.5
    if(test && oldWords.length > 1) {
      //return word from oldWords
      return oldWords[Math.floor(Math.random()*oldWords.length)]
    }
    return randomWords(1)[0]
  }

  useEffect(() => {
    const appSelector = document.querySelector(".word")
    const gameover = document.querySelector(".modal")

    const checkGuess = (x) => {
      // Return true if guess is correct
      switch(x) {
        case "seen":
          if(oldWords.includes(newWord)) {
            return true
          }
          return false
        case "new":
          if(oldWords.includes(newWord)) {
            return false;
          }
          return true;
          break;
        default:
          break;
      }
    }

    const handleGuess = (e) => {
      console.log(oldWords, newWord, e.target)
      if(checkGuess(e.target.value)){
        //if true, continue game
        setScore(score + 1)
        //copy word into array 
        let copy = oldWords
        copy.push(newWord)
        setOldWords(copy)
        //Apply styling
        appSelector.classList.add('guess')
        // Don't allow the same word to appear twice in a row
        let prevWord = newWord
        let grabWord
        while(prevWord === newWord) {
          console.log(prevWord, newWord)
          grabWord = determineTest()
          prevWord = grabWord
        }
        setNewWord(grabWord)
        setTimeout(() => {appSelector.classList.remove('guess')}, 1000)
      }
      else {
        console.log("GAME OVER")
        gameover.style.display = "block"
      }  
    }

    document.querySelectorAll('button').forEach(btn => {
      btn.addEventListener("click", handleGuess)
    })
  
    return () => {
      document.querySelectorAll('button').forEach(btn => {
        btn.removeEventListener("click", handleGuess)
      })
    }
  }, [newWord])
  
  return (
    <div className="Infinite-app">
      <Gameover score={score} oldWords={oldWords} />
      <div className='word'>
        <p>{newWord}</p>
      </div>
      <p>score: {score}</p>
      <div className='btnGroup'>
        <button value='seen' >Seen</button>
        <button value='new'>New</button>
      </div>
    </div>
  );
}

export default Infinite;