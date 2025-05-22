import React from "react";
import songs from "../assets/songs";
import albums from "../assets/albums";
import playlists from "../assets/playlists";
import artists from "../assets/artists";

const Music = () => { 
    return(
        <div className="w-full h-full flex flex-col overflow-y-auto scrollbar-hide">
                    {/* Top Songs */}
                    <div className="text-white mt-4 w-full flex flex-col"> 
                        <h1 className="text-4xl m-4 font-semibold">Top Songs</h1>
                    
                                <div className="bg-black rounded-lg w-full max-w-7xl mx-auto scrollbar-hide">
                                    <div className="flex gap-9 overflow-x-auto snap-center snap-mandatory scroll-smooth flex-nowrap scrollbar-hide">
                                        {songs.map((song, idx) => (
                                            <div className="snap-center min-w-[180px]" key={idx}>
                                                <img src={song.cover} className="w-80 h-50 object-cover rounded-lg" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                    
                    </div>

                    {/* Top Albums */}
                      <div className="text-white mt-4 w-full flex flex-col"> 
                        <h1 className="text-4xl m-4 font-semibold">Top Albums</h1>
                    
                                <div className="bg-black rounded-lg w-full max-w-7xl mx-auto scrollbar-hide">
                                    <div className="flex gap-9 overflow-x-auto snap-center snap-mandatory scroll-smooth flex-nowrap scrollbar-hide">
                                        {albums.map((album, idx) => (
                                            <div className="snap-center min-w-[180px]" key={idx}>
                                                <img src={album.image} className="w-80 h-50 object-cover rounded-lg" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                    
                    </div>

                    {/* Top Playlists */}
                        <div className="text-white mt-4 w-full flex flex-col"> 
                            <h1 className="text-4xl m-4 font-semibold">Top Playlists</h1>
                        
                                    <div className="bg-black rounded-lg w-full max-w-7xl mx-auto scrollbar-hide">
                                        <div className="flex gap-9 overflow-x-auto snap-center snap-mandatory scroll-smooth flex-nowrap scrollbar-hide">
                                            {playlists.map((playlist, idx) => (
                                                <div className="snap-center min-w-[180px]" key={idx}>
                                                    <img src={playlist.image} className="w-80 h-50 object-cover rounded-lg" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                        </div>

                        {/* Artists */}
                        <div className="text-white mt-4 w-full flex flex-col"> 
                            <h1 className="text-4xl m-4 font-semibold">Top Artists</h1>
                        
                                    <div className="bg-black rounded-lg w-full max-w-7xl mx-auto scrollbar-hide">
                                        <div className="flex gap-9 overflow-x-auto snap-center snap-mandatory scroll-smooth flex-nowrap scrollbar-hide">
                                            {artists.map((artist, idx) => (
                                                <div className="snap-center min-w-[180px]" key={idx}>
                                                    <img src={artist.image} className="w-80 h-50 object-cover rounded-lg" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                        </div>


        </div>
    )
}
export default Music;