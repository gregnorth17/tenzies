import './App.css'

const Die = ({isRunning, holdDice, value, isHeld}) => {

  const addClick = isRunning && 'addClick'

  const style = {
    background: isHeld ? '#59E391' : '#FFFFFF'
  }

  return (
    <div onClick={holdDice} 
         className={`die ${addClick}`}
         style={style}
    >
      {value}
    </div>
  )
}

export default Die