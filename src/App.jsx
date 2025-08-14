import { useState } from 'react'
import './App.css'
import Sidebar from './Components/Sidebar'
import Player from './Components/Player'
import Navbar from './Components/Navbar'
import Music from './Components/Music'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import AlbumDetails from './Components/AlbumDetails';
import PlaylistDetails from './Components/PlaylistDetails';
import TopMusic from './Components/TopMusic';
import Podcasts from './Components/Podcasts';
import TopArtistDetails from './Components/TopArtistDetails';
import LoginPage from './Components/LoginPage';
import SignUp from './Components/SignUp';
import { useEffect, useRef } from 'react';

function AppLayout({ currentSongId, setCurrentSongId }) {
  return (
    <div className='h-screen flex flex-col bg-black'>
      <div className='h-[88%] flex text-white'>
        <Sidebar className='w-[20%]' />
        <div className='w-full flex flex-col mt-2'>
          <h1 className='flex justify-center font-bold text-4xl'>Spotify Clone</h1>
          <div className='mt-3 w-full '>
            <Navbar />
          </div>
          <Routes>
            <Route path="/" element={<Music onsongSelect={setCurrentSongId} />} />
            <Route path="/album/:albumid" element={<AlbumDetails />} />
            <Route path='/playlist/:playlistid' element={<PlaylistDetails />} />
            <Route path='/TopMusic' element={<TopMusic />} />
            <Route path="/Podcasts" element={<Podcasts />} />
            <Route path="/Player/:id" element={<Player />} />
            <Route path='/TopArtists/:id' element={<TopArtistDetails />} />
            {/* Add more routes here as needed */}
          </Routes>
        </div>
      </div>
      <Player id={currentSongId} />
    </div>
  )
}

function AuthLayout() {
  return (
    <div className='h-screen flex flex-col bg-black'>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

function App() {
  const [currentSongId, setCurrentSongId] = useState(null);

  // React Router hooks only work inside Router, so we need this layout trick:
  function Main() {
    const location = useLocation();
    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
    return (
      isAuthPage
        ? <AuthLayout />
        : <AppLayout currentSongId={currentSongId} setCurrentSongId={setCurrentSongId} />
    );
  }

  return (
    <Router>
      <Main />
    </Router>
  );
}

export default App;