import React from "react";
import { Fragment } from "react";
import { FaShuffle } from "react-icons/fa6";
import { MdSkipPrevious } from "react-icons/md";
import { FaPlay } from "react-icons/fa6";
import { MdSkipNext } from "react-icons/md";

const Player = () => {
        return(
          
            <div className="flex h-[10%]">
                <div className="w-[14.2%] bg-[#123412] m-1 mt-[1px] ml-2 rounded p-8 flex text-white">
                    <div>
                        <img src="" alt="" />
                        <h1 className="font-bold">Song Name</h1>
                    </div>
                </div>
                <div className="w-[70%] bg-[red] text-white font-bold  m-1 rounded flex flex-col ">
                        <div className="flex flex-row  justify-center gap-4 mt-2 text-2xl">
                            <FaShuffle />
                            <MdSkipPrevious />
                            <FaPlay />
                            <MdSkipNext />     
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

                <div className="w-[15%] bg-[#123412] rounded flex m-1 text-white">

                </div>
            </div>
            
        )
}
export default Player;