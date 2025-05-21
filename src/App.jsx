import { useState } from 'react'
import './App.css'
import Sidebar from './Components/Sidebar'
import Player from './Components/Player'

function App() {
return(
  <div className='h-screen bg-black'>
      <div className='h-[90%] flex'>
      <Sidebar></Sidebar>
      </div>
       <Player></Player>
  </div>
)
}

export default App
