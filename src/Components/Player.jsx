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
    const [playerData, setPlayerData] = useState(null);
    const audioRef = useRef(null);
   

    let song = null;
    // console.log("Player component rendered with id:");
    // console.log(id);
    song= songs.find((s) => s.id === parseInt(id)) || songs[currentSongIdx];

    const progressPercent = duration ? (currentTime / duration) * 100 : 0;

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentSongIdx]);

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
    };

    const handleSeek = (e) => {
        const bar = e.target.getBoundingClientRect();
        const clickX = e.clientX - bar.left;
        const percent = clickX / bar.width;
        const seekTime = percent * duration;
        audioRef.current.currentTime = seekTime;
        setCurrentTime(seekTime);
    };

    const formatTime = (sec) => {
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return `${m}:${s.toString().padStart(2, "0")}`;
    };

    const handleNext = () => {
        setCurrentSongIdx((prev) => (prev + 1) % songs.length);
        setCurrentTime(0);
    };

    const handlePrev = () => {
        setCurrentSongIdx((prev) => (prev - 1 + songs.length) % songs.length);
        setCurrentTime(0);
    };

    const handleReplay10 = () => {
        const newTime = Math.max(currentTime - 10, 0);
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const handleEnded = () => {
        handleNext();
        setIsPlaying(true);
    };

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
                    </div>
                </div>
            </div>

            {/* Center: Controls and Progress */}
            <div className="w-[70%] bg-[#1e201e] mb-1 text-white font-bold rounded flex flex-col ">
                <audio
                    ref={audioRef}
                    src={song.audio}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={handleEnded}
                />
                <div className="flex flex-row justify-center gap-4 mt-2 text-2xl">
                    <FaShuffle />
                    <MdSkipPrevious onClick={handlePrev} className="cursor-pointer" />
                    {isPlaying ? (
                        <FaPause onClick={() => setIsPlaying(false)} className="cursor-pointer" />
                    ) : (
                        <FaPlay onClick={() => setIsPlaying(true)} className="cursor-pointer" />
                    )}
                    <MdSkipNext onClick={handleNext} className="cursor-pointer" />
                    <RiReplay10Line onClick={handleReplay10} className="cursor-pointer" />
                </div>
                <div className="flex flex-row items-center justify-center gap-4 text-l mt-2">
                    <p>{formatTime(currentTime)}</p>
                    <div className="w-82 flex-1">
                        <div
                            className="h-2 bg-gray-700 rounded-full overflow-hidden cursor-pointer"
                            onClick={handleSeek}
                        >
                            <div
                                className="h-full bg-green-500 transition-all duration-300"
                                style={{ width: `${progressPercent}%` }}
                            ></div>
                        </div>
                    </div>
                    <p>{formatTime(duration)}</p>
                </div>
            </div>

            {/* Right: Volume and More */}
            <div className="w-[11%] bg-[#123412] rounded flex m-1 mt-[1px] text-white cursor-pointer">
                <div className="flex flex-row items-center justify-center p-1 gap-2 text-xl">
                    <MdAirplay />
                    <div className="flex flex-row items-center gap-1">
                        <AiFillSound />
                        <div className="w-24">
                            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500" style={{ width: "50%" }}></div>
                            </div>
                        </div>
                    </div>
                    <CiMinimize1 />
                </div>
            </div>
        </div>
    );
};

export default Player;
