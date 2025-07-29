import React from "react";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import { HiH1 } from "react-icons/hi2";
import { useNavigate,useLocation } from "react-router-dom";
import { useState } from "react";
const Navbar = () => {
    const navigate= useNavigate();
    const location=useLocation();
    const [showLogin,handleLogin]=React.useState(false);

    const handleNext=()=>{
        if(location.pathname==='/'){
            navigate('/TopMusic');
        }else if(location.pathname==='/TopMusic'){
            navigate('/Podcasts');
        }
    }

    const handlePrevious=()=>{
        if(location.pathname==='/TopMusic'){
            navigate('/');
        }else if(location.pathname==='/Podcasts'){
            navigate('/TopMusic');
        }
    }
    
    const handleLoginPage=()=>{
        if (!showLogin){
            navigate('/login');
            handleLogin(true);
    }
    else{
            navigate('/');
            handleLogin(false);
            
        }
    }


    return(
        <div>
                <div className="flex flex-row w-full  ">
                    <div className="flex w-[70%] gap-4 text-2xl ">
                        <GrFormPrevious className="cursor-pointer"  onClick={() => handlePrevious()}></GrFormPrevious>
                        <GrFormNext className="cursor-pointer" onClick={()=>handleNext()}></GrFormNext>
                    </div>
                    <div className="flex justify-end w-[40%] p-2 h-[50px] mr-2 gap-4 text-xl">
                        <button className="rounded-xl bg-[white] text-black p-1 cursor-pointer">Explore Premium</button>
                        <button className="rounded-xl font-semibold cursor-pointer">Install App</button>
                        <button className="rounded-full bg-[green] w-9 cursor-pointer" onClick={()=>handleLoginPage()}>DP</button>
                        <button className="bg-gray-600 rounded-xl p-1 cursor-pointer" onClick={()=>navigate(`/login`)}>Logout</button>
                    </div>
                </div>
                
            {/* Header */}
               <div className="flex flex-row gap-4 text-xl mt-2">
                    <button className={`rounded-xl ${location.pathname==='/' ? "bg-[white] text-black": "bg-black font-white"} w-14 cursor-pointer`}onClick={()=>navigate("/")} >All</button>
                    <button className={`rounded-xl p-[4px] ${location.pathname==='/TopMusic' ? "bg-[white] text-black": "bg-black font-white"}  cursor-pointer`} onClick={()=>navigate(`/TopMusic`)}>Music</button>
                    <button className={`rounded-xl p-[4px] cursor-pointer ${location.pathname==='/Podcasts' ? "bg-[white] text-black": "bg-black font-white"}`} onClick={()=>navigate(`/Podcasts`)} >Podcasts</button>
                </div>

        </div>
    )
}
export default Navbar;