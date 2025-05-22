import React from "react";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
const Navbar = () => {
    return(
        <div>
                <div className="flex flex-row w-full  ">
                    <div className="flex w-[70%] gap-4 text-2xl ">
                        <GrFormPrevious className="cursor-pointer"></GrFormPrevious>
                        <GrFormNext className="cursor-pointer"></GrFormNext>
                    </div>
                    <div className="flex justify-end w-[30%] p-2 h-[50px] mr-2 gap-4 text-xl">
                        <button className="rounded-xl bg-[white] text-black p-1 cursor-pointer">Explore Premium</button>
                        <button className="rounded-xl font-semibold cursor-pointer">Install App</button>
                        <button className="rounded-full bg-[green] w-9 cursor-pointer ">DP</button>
                    </div>
                </div>

                <div className="flex flex-row gap-4 text-xl mt-2">
                    <button className="rounded-xl text-black bg-[white] w-14 cursor-pointer">All</button>
                    <button className="rounded-xl cursor-pointer">Music</button>
                    <button className="rounded-xl cursor-pointer">Podcasts</button>
                </div>
        </div>
    )
}
export default Navbar;