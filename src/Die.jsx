import './App.css'

const Die = ({holdDice, value, isHeld}) => {

  const style = {
    background: isHeld ? '#59E391' : '#FFFFFF'
  }

  return (
    <div onClick={holdDice} className='die' style={style}>
      {value}
    </div>
  )
}

export default Die