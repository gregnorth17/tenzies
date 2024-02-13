import { nanoid } from 'nanoid'
import { useState } from 'react'
import './App.css'
import Die from './Die'

function App() {

  const allNewDice = () => {
    const newDice = []
    for(let i = 0; i < 10; i++) {
      newDice.push(createDice())
    }
    return newDice
  }
  
  const createDice = () => {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  const [dice, setDice] = useState(allNewDice())

  const rollDice = () => {
    setDice(oldDice => oldDice.map(dice => {
      return dice.isHeld ?
        dice :
        createDice()
    }))
  }

  const holdDice = id => {
    setDice(oldDice => oldDice.map(dice => {
      return dice.id === id ?
          {...dice, isHeld: !dice.isHeld} :
          dice
    }))
  }

  const diceElements = dice.map(({value, isHeld, id}) => <Die holdDice={() => holdDice(id)} key={id} id={id} isHeld={isHeld} value={value} />)

  return (
    <>
      <main>
        <div className='container'>
          {diceElements}
        </div>
        <button onClick={rollDice} className='btn'>Roll</button>
      </main>
    </>
  )
}

export default App
