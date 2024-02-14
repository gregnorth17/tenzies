import { nanoid } from 'nanoid'
import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import './App.css'
import Die from './Die'

function App() {
  // const { width, height } = useWindowSize()
  const [tenzies, setTenzies] = useState(false)
  const [dice, setDice] = useState(allNewDice())

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstVale = dice[0].value
    const allSameValue = dice.every(die => die.value === firstVale)

    if(allHeld && allSameValue) {
      setTenzies(true)
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
      setTenzies(false)
    } else {
      setDice(oldDice => oldDice.map(dice => {
        return dice.isHeld ?
          dice :
          createDice()
      }))
    }
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(dice => {
      return dice.id === id ?
          {...dice, isHeld: !dice.isHeld} :
          dice
    }))
  }

  const diceElements = dice.map(({value, isHeld, id}) => 
    <Die holdDice={() => holdDice(id)} 
         key={id} 
         id={id} 
         isHeld={isHeld} 
         value={value} 
     />)

  return (
    <>
      <main>
        {tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='container'>
          {diceElements}
        </div>
        <button onClick={rollDice} className='btn'>{tenzies ? 'New Game' : 'Roll'}</button>
      </main>
    </>
  )
}

export default App
