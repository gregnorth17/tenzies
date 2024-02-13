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

  const [die, setDie] = useState(allNewDice())

  const handleClick = () => {
    // keep prev state
    // map over it
    // change isHeld to it's opposite
   console.log('click')
   setDie(prevState => {
    return prevState.map(dice => dice.isHeld = !dice.isHeld)
   })
  }

  const dieElements = die.map(({value, isHeld, id}) => <Die handleClick={handleClick} key={id} isHeld={isHeld} value={value} />)

  return (
    <>
      <main>
        <div className='container'>
          {dieElements}
        </div>
        <button onClick={() => setDie(allNewDice())} className='btn'>Roll</button>
      </main>
    </>
  )
}

export default App
