import { useState } from 'react'
import './App.css'
import Sidebar from './Components/Sidebar'
import Player from './Components/Player'
import Navbar from './Components/Navbar'
import Music from './Components/Music'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AlbumDetails from './Components/AlbumDetails';
import PlaylistDetails from './Components/PlaylistDetails';
import TopMusic from './Components/TopMusic';
import Podcasts from './Components/Podcasts';
import songs from './assets/songs';
import TopArtistDetails from './Components/TopArtistDetails';
import LoginPage from './Components/LoginPage';
import SignUp from './Components/SignUp';
import { useEffect, useRef } from 'react';

function App() {
   const [currentSongId, setCurrentSongId] = useState(null);

  return(
  <div className='h-screen flex flex-col bg-black'>
    <Router>
      <div className='h-[88%] flex text-white'>
      <Sidebar className='w-[20%]'></Sidebar>
      <div className='w-full flex flex-col  mt-2'>
            <h1 className='flex justify-center font-bold text-4xl'>Spotify Clone</h1>
            <div className='mt-3 w-full '>
            <Navbar />
            </div>
            <Routes>
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path='/signup' element={<SignUp/>}></Route>
                <Route path="/" element={<Music onsongSelect={setCurrentSongId} />} />
                <Route path="/album/:albumid" element={<AlbumDetails></AlbumDetails>}></Route>
                <Route path='/playlist/:playlistid' element={<PlaylistDetails/>}></Route>
                <Route path='/TopMusic' element={<TopMusic/>}></Route>
                <Route path="/Podcasts" element={<Podcasts/>}></Route>
                <Route path="/Player/:id" element={<Player/>}></Route>
                <Route path='/TopArtists/:id' element={<TopArtistDetails/>}></Route>
                {/* Add more routes here as needed */}
            </Routes>
      </div>
      </div>
       <Player id={currentSongId}></Player>
   </Router>
  </div>
)
}

export default App
