import { useWindowSize } from "@uidotdev/usehooks"
import { nanoid } from 'nanoid'
import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import { useStopwatch } from 'react-timer-hook'
import './App.css'
import Die from './Die'

function App() {

  const [tenzies, setTenzies] = useState(false)
  const [finalTime, setFinalTime] = useState(null)
  const [dice, setDice] = useState([0,0,0,0,0,0,0,0,0,0])
  const [numberOfRolls, setNumberOfRolls] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  const { width, height } = useWindowSize()

  const {
    totalSeconds,
    minutes,
    seconds,
    start,
    pause,
    reset
  } = useStopwatch()

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstVale = dice[0].value
    const allSameValue = dice.every(die => die.value === firstVale)
    if(allHeld && allSameValue) {
      setTenzies(true)
      pause()
      setIsRunning(false)
      setFinalTime(totalSeconds)
    }
  }, [dice])

  function createDice () {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = []
    for(let i = 0; i < 10; i++) {
      newDice.push(createDice())
    }
    return newDice
  }
  
  function rollDice() {
    if(tenzies) {
      setDice(allNewDice()) 
    } else {
      setDice(oldDice => oldDice.map(dice => {
        return dice.isHeld ?
          dice :
          createDice()
      }))
      setNumberOfRolls(prevNumber => prevNumber + 1)
    }
  }

  function startGame() {
    reset()
    setTimeout(() => {
      start()
      setNumberOfRolls(0)
      setTenzies(false)
      setDice(allNewDice())
      setIsRunning(true)
      setFinalTime(0)
    }, 1000)
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(dice => {
      return dice.id === id ?
          {...dice, isHeld: !dice.isHeld} :
          dice
    }))
  }

  const diceElements = dice.map(({value, isHeld, id}) => 
    <Die 
         key={id} 
         holdDice={() => holdDice(id)} 
         id={id} 
         isHeld={isHeld} 
         value={value}
         isRunning={isRunning}
     />)

  return (
    <>
      <section>
        <div className='game'>
          {tenzies && <Confetti width={width} height={height} />}
          <h1 className='title'>Tenzies</h1>
          <p className='instructions'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className='container'>
            {diceElements}
          </div>
          {
            isRunning ?
            <button onClick={rollDice} className='btn'>Roll</button>
            :
            <button onClick={startGame} className='btn'>New Game</button>
          }
          <p className='timer'>{tenzies ? `It took you ${numberOfRolls} rolls and ${finalTime} seconds to win!` : `${seconds} seconds`}</p>
        </div>
      </section>
    </>
  )
}

export default App
