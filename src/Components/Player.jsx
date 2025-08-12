import React, { useRef, useState, useEffect } from "react";
import { FaShuffle, FaPlay, FaPause } from "react-icons/fa6";
import { MdSkipPrevious, MdSkipNext, MdAirplay } from "react-icons/md";
import { CiMinimize1 } from "react-icons/ci";
import { AiFillSound } from "react-icons/ai";
import { RiReplay10Line } from "react-icons/ri";
import songs from "../assets/songs";
import { useParams } from "react-router-dom";

const Player = ({id}) => {
    const [currentSongIdx, setCurrentSongIdx] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.5);
    const [isDragging, setIsDragging] = useState(false);
    const [playerData, setPlayerData] = useState(null);
    const [audioError, setAudioError] = useState(false);
    const audioRef = useRef(null);
    const progressBarRef = useRef(null);
   

    // Find the current song by id
    let song = null;
    if (id) {
        song = songs.find((s) => s.id === parseInt(id));
        // Update currentSongIdx to match the song found by id
        if (song) {
            const foundIndex = songs.findIndex((s) => s.id === parseInt(id));
            if (foundIndex !== -1 && foundIndex !== currentSongIdx) {
                setCurrentSongIdx(foundIndex);
            }
        }
    }
    
    // Fallback to currentSongIdx if no song found by id
    if (!song) {
        song = songs[currentSongIdx];
    }

    // Safety check - if still no song, use first song
    if (!song && songs.length > 0) {
        song = songs[0];
        setCurrentSongIdx(0);
    }

    // Use song duration from data if available, otherwise use a default
    const songDuration = song?.duration || 200;
    const progressPercent = duration ? (currentTime / duration) * 100 : 0;

    // Set initial audio source and volume
    useEffect(() => {
        if (audioRef.current && song) {
            // Check if song has audio URL, if not, create a dummy audio for demo
            if (song.audio) {
                audioRef.current.src = song.audio;
                audioRef.current.load();
            } else {
                // Create a dummy audio source for demo purposes
                // In a real app, you would have actual audio files
                setAudioError(true);
                // Set a dummy duration for demo progress bar
                setDuration(songDuration);
            }
            audioRef.current.volume = volume;
        }
    }, [song, volume, songDuration]);

    // Reset currentTime when song changes
    useEffect(() => {
        setCurrentTime(0);
        setDuration(0);
        setAudioError(false);
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
        }
    }, [currentSongIdx, id]);

    // Handle play/pause
    useEffect(() => {
        if (audioRef.current && !audioError) {
            if (isPlaying) {
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.log("Playback failed:", error);
                        setIsPlaying(false);
                        setAudioError(true);
                    });
                }
            } else {
                audioRef.current.pause();
            }
        } else if (audioError && isPlaying) {
            // Simulate playing for demo purposes
            const interval = setInterval(() => {
                setCurrentTime(prev => {
                    if (prev >= songDuration) {
                        setIsPlaying(false);
                        setCurrentTime(0);
                        return 0;
                    }
                    return prev + 1;
                });
            }, 1000);
            
            return () => clearInterval(interval);
        }
    }, [isPlaying, audioError, songDuration]);

    const handleTimeUpdate = () => {
        if (!isDragging && audioRef.current && !audioError) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current && !audioError) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleSeek = (e) => {
        if (!duration) return;
        
        const bar = e.target.getBoundingClientRect();
        const clickX = e.clientX - bar.left;
        const percent = clickX / bar.width;
        const seekTime = percent * duration;
        
        if (audioRef.current && !audioError) {
            audioRef.current.currentTime = seekTime;
        }
        setCurrentTime(seekTime);
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        handleSeek(e);
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            handleSeek(e);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            
            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isDragging]);

    const formatTime = (sec) => {
        if (!sec || isNaN(sec)) return "0:00";
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return `${m}:${s.toString().padStart(2, "0")}`;
    };

    const handleNext = () => {
        const nextIndex = (currentSongIdx + 1) % songs.length;
        setCurrentSongIdx(nextIndex);
        setCurrentTime(0);
        setDuration(0);
        setAudioError(false);
        // Auto-play the next song
        setIsPlaying(true);
    };

    const handlePrev = () => {
        const prevIndex = (currentSongIdx - 1 + songs.length) % songs.length;
        setCurrentSongIdx(prevIndex);
        setCurrentTime(0);
        setDuration(0);
        setAudioError(false);
        // Auto-play the previous song
        setIsPlaying(true);
    };

    const handleReplay10 = () => {
        if (!duration) return;
        const newTime = Math.max(currentTime - 10, 0);
        if (audioRef.current && !audioError) {
            audioRef.current.currentTime = newTime;
        }
        setCurrentTime(newTime);
    };

    const handleEnded = () => {
        // Auto-play next song when current song ends
        handleNext();
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current && !audioError) {
            audioRef.current.volume = newVolume;
        }
    };

    const handleVolumeClick = (e) => {
        const bar = e.target.getBoundingClientRect();
        const clickX = e.clientX - bar.left;
        const percent = clickX / bar.width;
        const newVolume = percent;
        setVolume(newVolume);
        if (audioRef.current && !audioError) {
            audioRef.current.volume = newVolume;
        }
    };

    // Safety check - don't render if no song is available
    if (!song) {
        return (
            <div className="flex h-33 items-center justify-center bg-gray-800 text-white rounded-lg">
                <p>No song available</p>
            </div>
        );
    }

    return (
        <div className="flex h-33 cursor-pointer overflow-hidden rounded-lg">
            {/* Left: Song Info */}
            <div className="w-[22%] bg-[#123412] m-1 ml-1 rounded p-3 flex text-white overflow-hidden">
                <div className="flex flex-row items-center gap-3">
                    <img src={song.cover} width={80} height={80} alt={song.name} />
                    <div className="flex flex-col justify-center">
                        <h1>{song.name}</h1>
                        <h1 className="font-bold">{song.singer}</h1>
                        <p>{song.album}</p>
                        <div className="flex flex-row gap-2">
                            <p>{song.genre}</p>
                            <p>{song.year}</p>
                        </div>
                        {audioError && (
                            <p className="text-yellow-400 text-xs mt-1">Demo Mode - No Audio File</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Center: Controls and Progress */}
            <div className="w-[70%] bg-[#1e201e] mb-1 text-white font-bold rounded flex flex-col ">
                <audio
                    ref={audioRef}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={handleEnded}
                />
                <div className="flex flex-row justify-center gap-4 mt-2 text-2xl">
                    <FaShuffle />
                    <MdSkipPrevious onClick={handlePrev} className="cursor-pointer hover:text-green-400 transition-colors duration-200" />
                    {isPlaying ? (
                        <FaPause onClick={() => setIsPlaying(false)} className="cursor-pointer hover:text-green-400 transition-colors duration-200" />
                    ) : (
                        <FaPlay onClick={() => setIsPlaying(true)} className="cursor-pointer hover:text-green-400 transition-colors duration-200" />
                    )}
                    <MdSkipNext onClick={handleNext} className="cursor-pointer hover:text-green-400 transition-colors duration-200" />
                    <RiReplay10Line onClick={handleReplay10} className="cursor-pointer hover:text-green-400 transition-colors duration-200" />
                </div>
                <div className="flex flex-row items-center justify-center gap-4 text-l mt-2 px-4">
                    <p className="text-sm text-gray-300">{formatTime(currentTime)}</p>
                    <div className="w-full flex-1 relative group">
                        <div
                            ref={progressBarRef}
                            className="h-3 bg-gray-700 rounded-full overflow-hidden cursor-pointer relative hover:h-4 transition-all duration-200"
                            onClick={handleSeek}
                            onMouseDown={handleMouseDown}
                        >
                            {/* Background gradient */}
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-700"></div>
                            
                            {/* Progress bar with gradient and glow effect */}
                            <div
                                className="h-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-full relative transition-all duration-100 ease-out"
                                style={{ width: `${progressPercent}%` }}
                            >
                                {/* Inner glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-green-400 opacity-30 rounded-full"></div>
                                
                                {/* Progress bar shine effect */}
                                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 rounded-full"></div>
                            </div>
                            
                            {/* Progress handle */}
                            <div
                                className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 hover:shadow-xl"
                                style={{ left: `calc(${progressPercent}% - 8px)` }}
                            >
                                {/* Handle inner circle */}
                                <div className="absolute inset-1 bg-green-500 rounded-full"></div>
                                {/* Handle glow */}
                                <div className="absolute inset-0 bg-green-400 rounded-full opacity-50 blur-sm"></div>
                            </div>
                            
                            {/* Hover indicator */}
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                        </div>
                        
                        {/* Time tooltip on hover */}
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                            {formatTime(duration)}
                        </div>
                    </div>
                    <p className="text-sm text-gray-300">{formatTime(duration)}</p>
                </div>
            </div>

            {/* Right: Volume and More */}
            <div className="w-[11%] bg-[#123412] rounded flex m-1 mt-[1px] text-white cursor-pointer">
                <div className="flex flex-row items-center justify-center p-1 gap-2 text-xl">
                    <MdAirplay className="hover:text-green-400 transition-colors duration-200" />
                    <div className="flex flex-row items-center gap-1">
                        <AiFillSound className="hover:text-green-400 transition-colors duration-200" />
                        <div className="w-24">
                            <div 
                                className="h-2 bg-gray-700 rounded-full overflow-hidden hover:h-3 transition-all duration-200 cursor-pointer"
                                onClick={handleVolumeClick}
                            >
                                <div 
                                    className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-300" 
                                    style={{ width: `${volume * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                    <CiMinimize1 className="hover:text-green-400 transition-colors duration-200" />
                </div>
            </div>
        </div>
    );
};

export default Player;
