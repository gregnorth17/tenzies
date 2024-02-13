import './App.css'

const Die = ({handleClick, value, isHeld}) => {

  // const getStyle = isHeld => isHeld ? {background: '#59E391'} : {background: '#FFFFFF'}

  const style = {
    background: isHeld ? '#59E391' : '#FFFFFF'
  }

  return (
    <div onClick={() => handleClick()} className='die' style={style}>
      {value}
    </div>
  )
}

export default Die