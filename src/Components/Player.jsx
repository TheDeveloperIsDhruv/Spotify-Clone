import React, { useRef, useState, useEffect } from "react";
import { FaShuffle, FaPlay, FaPause } from "react-icons/fa6";
import { MdSkipPrevious, MdSkipNext, MdAirplay } from "react-icons/md";
import { CiMinimize1 } from "react-icons/ci";
import { AiFillSound } from "react-icons/ai";
import { RiReplay10Line } from "react-icons/ri";
import songs from "../assets/songs";

const Player = ({ id }) => {
  const [currentSongIdx, setCurrentSongIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isDragging, setIsDragging] = useState(false);
  const [isDraggingVolume, setIsDraggingVolume] = useState(false);
  const [audioError, setAudioError] = useState(false);

  const audioRef = useRef(null);
  const progressBarRef = useRef(null);
  const volumeBarRef = useRef(null);
  const fakeTimerRef = useRef(null);

  // Select song based on id prop
  useEffect(() => {
    if (id) {
      const foundIndex = songs.findIndex((s) => s.id === parseInt(id));
      if (foundIndex !== -1) {
        setCurrentSongIdx(foundIndex);
      }
    }
  }, [id]);

  const song = songs[currentSongIdx] || null;

  // Load new song when index changes
  useEffect(() => {
    if (!song) return;

    setAudioError(false);
    setCurrentTime(0);
    setDuration(song.duration || 200);

    if (audioRef.current) {
      if (song.audio) {
        audioRef.current.src = song.audio;
        audioRef.current.load();
      } else {
        // No audio file, simulate playback
        audioRef.current.src = "";
      }
      audioRef.current.volume = volume;
    }
  }, [currentSongIdx, song, volume]);

  // Sync play/pause state with audio element or fake playback
  useEffect(() => {
    if (song && song.audio && audioRef.current && !audioError) {
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error("Playback failed", error);
            setIsPlaying(false);
            setAudioError(true);
          });
        }
      } else {
        audioRef.current.pause();
      }
    } else if (isPlaying && !song?.audio) {
      // Simulate playback if no audio file
      fakeTimerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev + 1 >= duration) {
            return 0; // loop
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(fakeTimerRef.current);
    }

    return () => clearInterval(fakeTimerRef.current);
  }, [isPlaying, audioError, duration, song]);

  // Update currentTime on audio element time update
  const handleTimeUpdate = () => {
    if (!isDragging && audioRef.current && !audioError) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // Update duration on metadata loaded
  const handleLoadedMetadata = () => {
    if (audioRef.current && !audioError) {
      setDuration(audioRef.current.duration);
    }
  };

  // Seek in song
  const handleSeek = (e) => {
    if (!duration) return;
    const bar = progressBarRef.current.getBoundingClientRect();
    const clickX = Math.min(Math.max(e.clientX - bar.left, 0), bar.width);
    const percent = clickX / bar.width;
    const seekTime = percent * duration;

    if (audioRef.current && !audioError && song?.audio) {
      audioRef.current.currentTime = seekTime;
    }
    setCurrentTime(seekTime);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    handleSeek(e);
  };

  const handleMouseMove = (e) => {
    if (isDragging) handleSeek(e);
    if (isDraggingVolume) handleVolumeChangeDrag(e);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsDraggingVolume(false);
  };

  useEffect(() => {
    if (isDragging || isDraggingVolume) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, isDraggingVolume]);

  const formatTime = (sec) => {
    if (!sec || isNaN(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleNext = () => {
    setCurrentSongIdx((prev) => (prev + 1) % songs.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentSongIdx((prev) => (prev - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };

  const handleReplay10 = () => {
    const newTime = Math.max(currentTime - 10, 0);
    if (audioRef.current && !audioError && song?.audio) {
      audioRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };

  const handleEnded = () => {
    handleNext();
  };

  // Volume click & drag
  const handleVolumeChangeDrag = (e) => {
    const bar = volumeBarRef.current.getBoundingClientRect();
    const clickX = Math.min(Math.max(e.clientX - bar.left, 0), bar.width);
    const percent = clickX / bar.width;
    setVolume(percent);
    if (audioRef.current) {
      audioRef.current.volume = percent;
    }
  };

  const handleVolumeMouseDown = (e) => {
    setIsDraggingVolume(true);
    handleVolumeChangeDrag(e);
  };

  const handleVolumeClick = (e) => {
    handleVolumeChangeDrag(e);
  };

  if (!song) {
    return <div className="text-white">No song available</div>;
  }

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex h-33 cursor-pointer overflow-hidden rounded-lg select-none">
      {/* Left: Song Info */}
      <div className="w-[22%] bg-[#123412] m-1 ml-1 rounded p-3 flex text-white overflow-hidden">
        <div className="flex flex-row items-center gap-3">
          <img src={song.cover} width={80} height={80} alt={song.name} />
          <div>
            <h1>{song.name}</h1>
            <h1 className="font-bold">{song.singer}</h1>
            <p>{song.album}</p>
          </div>
        </div>
      </div>

      {/* Center: Controls */}
      <div className="w-[70%] bg-[#1e201e] mb-1 text-white font-bold rounded flex flex-col">
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
        />
        <div className="flex flex-row justify-center gap-4 mt-2 text-2xl">
          <FaShuffle />
          <MdSkipPrevious
            onClick={handlePrev}
            className="cursor-pointer hover:text-green-400 transition-colors duration-200"
          />
          {isPlaying ? (
            <FaPause
              onClick={() => setIsPlaying(false)}
              className="cursor-pointer hover:text-green-400 transition-colors duration-200"
            />
          ) : (
            <FaPlay
              onClick={() => setIsPlaying(true)}
              className="cursor-pointer hover:text-green-400 transition-colors duration-200"
            />
          )}
          <MdSkipNext
            onClick={handleNext}
            className="cursor-pointer hover:text-green-400 transition-colors duration-200"
          />
          <RiReplay10Line
            onClick={handleReplay10}
            className="cursor-pointer hover:text-green-400 transition-colors duration-200"
          />
        </div>
        <div className="flex flex-row items-center justify-center gap-4 text-l mt-2 px-4">
          <p className="text-sm text-gray-300">{formatTime(currentTime)}</p>
          <div className="w-full flex-1 relative group">
            <div
              ref={progressBarRef}
              className="h-3 bg-gray-700 rounded-full overflow-hidden cursor-pointer relative hover:h-4 transition-all duration-200"
              onMouseDown={handleMouseDown}
            >
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-700"></div>

              {/* Progress bar */}
              <div
                className="h-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-full relative transition-all duration-100 ease-out"
                style={{ width: `${progressPercent}%` }}
              />

              {/* Progress handle */}
              <div
                className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 hover:shadow-xl"
                style={{ left: `calc(${progressPercent}% - 8px)` }}
              >
                <div className="absolute inset-1 bg-green-500 rounded-full"></div>
                <div className="absolute inset-0 bg-green-400 rounded-full opacity-50 blur-sm"></div>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-300">{formatTime(duration)}</p>
        </div>
      </div>

      {/* Right: Volume */}
      <div className="w-[11%] bg-[#123412] rounded flex m-1 mt-[1px] text-white cursor-pointer select-none">
        <div className="flex flex-row items-center justify-center p-1 gap-2 text-xl">
          <MdAirplay className="hover:text-green-400 transition-colors duration-200" />
          <AiFillSound className="hover:text-green-400 transition-colors duration-200" />
          <div className="w-24">
            <div
              ref={volumeBarRef}
              className="h-2 bg-gray-700 rounded-full overflow-hidden cursor-pointer"
              onMouseDown={handleVolumeMouseDown}
              onClick={handleVolumeClick}
            >
              <div
                className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-300"
                style={{ width: `${volume * 100}%` }}
              />
            </div>
          </div>
          <CiMinimize1 className="hover:text-green-400 transition-colors duration-200" />
        </div>
      </div>
    </div>
  );
};

export default Player;
