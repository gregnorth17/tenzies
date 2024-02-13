import { nanoid } from 'nanoid'
import { useState } from 'react'
import './App.css'
import Die from './Die'

function App() {
  
  const allNewDice = () => {
    const newDice = []
    for(let i = 0; i < 10; i++) {
      
      let num = Math.ceil(Math.random() * 6)
      
      newDice.push({
        value: num,
        isHeld: false,
        id: nanoid()
      })
      
    }
    return newDice
  }

  const [dice, setDice] = useState(allNewDice())

  const holdDice = id => {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ?
        {...die, isHeld: !die.isHeld} :
        die
    }))
  }

  const dieElements = dice.map(({value, isHeld, id}) => <Die holdDice={() => holdDice(id)} key={id} id={id} isHeld={isHeld} value={value} />)

  return (
    <>
      <main>
        <div className='container'>
          {dieElements}
        </div>
        <button onClick={() => setDice(allNewDice())} className='btn'>Roll</button>
      </main>
    </>
  )
}

export default App
