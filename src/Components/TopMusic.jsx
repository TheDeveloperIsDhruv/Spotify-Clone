import React from "react";
import songs from "../assets/songs";
const TopMusic = ({ title, items, onItemClick }) => {
    return(
    <div className="text-white mt-2 w-full h-full flex flex-col overflow-y-auto scrollbar-hide"> 
                        <h1 className="text-5xl m-4 font-semibold">Top Songs</h1>
                                    
                                    <div className="grid lg:grid-cols-4 gap-8 ">
                                                {songs.map((song, idx) => (
                                                    <div className="snap-center min-w-[180px]" key={idx}>
                                                        <img src={song.cover} className="w-80 h-50 object-cover rounded-lg" />
                                                    </div>
                                                ))}
                                    </div>
                                    
    </div>
                    
    );
}
export default TopMusic;