import { useState } from 'react'
import './App.css'
import Sidebar from './Components/Sidebar'
import Player from './Components/Player'

function App() {
return(
  <div className='h-screen bg-black'>
      <div className='h-[90%] flex text-white'>
      <Sidebar className='w-[20%]'></Sidebar>
      <div className='w-[80%] flex justify-center mt-2'>
      <h1 className='font-bold text-4xl'>Spotify Clone</h1>
      </div>
      </div>
       <Player></Player>
  </div>
)
}

export default App
