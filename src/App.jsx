import { useState } from 'react'
import './App.css'
import Die from './Die'

function App() {

  
  const allNewDice = () => {
    const newDice = []
    for(let i = 0; i < 10; i++) {
      let num = Math.ceil(Math.random() * 6)
      newDice.push(num)
    }
    return newDice
  }

  const [die, setDie] = useState(allNewDice())

  // eslint-disable-next-line react/jsx-key
  const dieElements = die.map(dice => <Die value={dice} />)

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
