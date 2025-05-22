import { useState } from 'react'
import './App.css'
import Sidebar from './Components/Sidebar'
import Player from './Components/Player'
import Navbar from './Components/Navbar'
import Music from './Components/Music'

function App() {
return(
  <div className='h-screen bg-black'>
      <div className='h-[90%] flex text-white'>
      <Sidebar className='w-[20%]'></Sidebar>
      <div className='w-full flex flex-col  mt-2'>
            <h1 className='flex justify-center font-bold text-4xl'>Spotify Clone</h1>
            <div className='mt-3 w-full '>
            <Navbar />
            </div>
            <Music />
      </div>
      </div>
       <Player></Player>
  </div>
)
}

export default App
