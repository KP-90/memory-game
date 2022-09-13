import Banner from './Components/Banner';
import BaseGame from './BaseGame';
import Infinite from './infinite/infinite'
import './App.css'

import { useEffect, useState } from 'react';
const App = () => {
  // Declare global difficulties
  const EASY = 5
  const MEDIUM = 10
  const HARD = 20

  const [difficulty, setDifficulty] = useState(EASY)

  let Game = () => {
    if(difficulty === 'infinite') {
      return (
        <Infinite />
      )
    }
    else {
      return (
        <BaseGame difficulty={difficulty}/>
      )
    }
  }
  
  const handleChange = (e) => {
    console.log(e.target.value)
    switch(e.target.value) {
      case "easy":
        console.log("test")
        setDifficulty(EASY)
        break;
      case "medium":
        console.log("test2")
        setDifficulty(MEDIUM)
        break;
      case "hard":
        console.log("test3")
        setDifficulty(HARD)
        break;
      case "infinite":
        console.log("test4")
        setDifficulty("infinite")
      default:
        console.log("DEFAULT")
        break;
    }
  } 

  useEffect(() => {
    
  }, [difficulty])

  
  
  return (
    <div className='App'>
      <Banner handleChange={handleChange}/>
      <Game />
    </div>
  );
}

export default App;
