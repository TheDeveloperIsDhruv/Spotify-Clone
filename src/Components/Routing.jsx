import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Music from "./Music";
import AlbumDetails from "./AlbumDetails";
import PlaylistDetails from "./PlaylistDetails";

const Routing = () => {
    return(
            <Routes>
                <Route path="/" element={<Music />} />
                <Route path="/album/:albumid" element={<AlbumDetails></AlbumDetails>}></Route>
                <Route path='/playlist/:playlistid' element={<PlaylistDetails/>}></Route>
                {/* Add more routes here as needed */}
            </Routes>
    );
}
export default Routing;