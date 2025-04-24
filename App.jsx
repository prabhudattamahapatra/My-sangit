
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './components/sidebar'
import Player from './components/player'
import Display from './components/display'
import displayhome from './components/displayhome'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='h-screen bg-black'>
        <div className='h-[90%] flex'>
          <Sidebar/>
          <Display/>
        </div>
      <Player/>
      </div>
    </>
  )
}

export default App