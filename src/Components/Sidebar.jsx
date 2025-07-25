import React from "react";
import { FaHome } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { BsStack } from "react-icons/bs";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Podcasts from "./Podcasts";
import { useState } from "react";
const Sidebar = () => {
    const navigate = useNavigate();
    const [showSearch, setShowSearch] =useState(false);
    return (
        <div className="w-[15%] rounded p-2 flex-col text-white hidden lg:flex ">
            <div className="bg-[#123412] h-[15%] rounded flex flex-col justify-around">
                     <div className="flex items-center gap-2 pl-8 cursor-pointer" onClick={()=>navigate("/")}>
                        <FaHome className="size-6"/>
                        <p className="font-bold">Home</p>
                     </div>
                        <div className="flex items-center gap-2 pl-8 cursor-pointer"  onClick={()=>{setShowSearch(!showSearch)}}>
                            <FaSearch className="size-6"/>
                            <p className="font-bold">Search</p>
                        </div>

                          {showSearch && (
                            <input
                                type="text"
                                placeholder="Search..."
                                className="mt-2 ml-8 p-2 rounded text-white w-[80%]"
                            />
                        )}
                       
            </div>
            <div className="bg-[#1e201e] h-[83%] flex flex-col rounded mt-2 cursor-pointer p-2 ">
                    <div className=" flex flex-row  cursor-pointer">
                        <div className="flex justify-start gap-2 basis-2/3">
                        <BsStack className="size-6"/>
                        <p className="font-bold">Your Library</p>
                        </div>
                        <div className="flex justify-end gap-2 basis-1/3">
                        <FaArrowRightLong className="size-6"/>
                        <FaPlus className="size-6"/>
                        </div>
                     </div>

                     <div className="flex bg-[black] mt-4 rounded-xl p-4 font-semibold m-1">
                        <div>
                        <h1>Create your playlist</h1>
                        <p className="mt-2 font-normal">it's easy we will help you</p>
                        <button className="bg-[white] text-black rounded-full p-2 mt-3 cursor-pointer"> Create Playlist</button>
                        </div>
                     </div>


                     <div className="flex bg-[black] mt-4 rounded-xl p-4 font-semibold m-1">
                        <div>
                        <h1>Let's findsome podcasts to follow</h1>
                        <p className="mt-2 font-normal">it's easy we will help you</p>
                        <button className="bg-[white] text-black rounded-full p-2 mt-3 cursor-pointer" onClick={()=>navigate('/Podcasts')} >Browse Podcasts</button>
                        </div>
                     </div>
            </div>
        </div>
    )
}

export default Sidebar;