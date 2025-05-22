import React from "react";
import { Fragment } from "react";
import { FaShuffle } from "react-icons/fa6";
import { MdSkipPrevious } from "react-icons/md";
import { FaPlay } from "react-icons/fa6";
import { MdSkipNext } from "react-icons/md";
import { CiMinimize1 } from "react-icons/ci";
import { AiFillSound } from "react-icons/ai";
import { MdAirplay } from "react-icons/md";
import { RiReplay10Line } from "react-icons/ri";
import songs from "../assets/songs";
const Player = () => {
        return(
          
            <div className="flex h-[10%] cursor-pointer">
               
                <div className="w-[14.2%] bg-[#123412] m-1 mt-[-2px] ml-2 rounded p-4 flex text-white overflow-hidden">
                    <div className="flex flex-row items-center gap-2">
                        <img src={songs[1].cover} width={80} height={80} alt="" />
                        <div className="flex flex-col justify-center">
                            <h1>{songs[1].name}</h1>
                            <h1 className="font-bold">{songs[1].singer}</h1>
                            <p>{songs[1].album}</p>
                            <div className="flex flex-row gap-2">
                            <p>{songs[1].genre}</p>
                            <p>{songs[1].year}</p>
                            </div>
                        
                        </div>
                    </div>
                </div>

                <div className="w-[70%] bg-[#1e201e] mb-1 text-white font-bold rounded flex flex-col ">
                        <div className="flex flex-row  justify-center gap-4 mt-2 text-2xl">
                            <FaShuffle />
                            <MdSkipPrevious />
                            <FaPlay />
                            <MdSkipNext />   
                            <RiReplay10Line />  
                        </div>

                       <div className="flex flex-row items-center justify-center gap-4 text-l mt-2">
                            <p>0:00</p>
                            <div className="w-82">
                                {/* Progress Bar */}
                                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500" style={{ width: "50%" }}></div>
                                </div>
                            </div>
                            <p>3:20</p>
                        </div>
                </div>

                <div className="w-[15%] bg-[#123412] rounded flex m-1 mt-[1px] text-white cursor-pointer">
                    <div className="flex flex-row items-center justify-center p-1 gap-2 text-xl">
                        <MdAirplay />
                        <div className="flex flex-row items-center gap-1">
                            <AiFillSound />
                            <div className="w-40 ">
                                {/* Volume Bar */}
                                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500" style={{ width: "50%" }}></div>
                                </div>
                            </div>
                        </div>
                        <CiMinimize1 />
                    </div>
                </div>
            </div>
            
        )
}
export default Player;