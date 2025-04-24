import React, { useRef } from 'react';
import Navbar from './navbar';
import { useParams } from 'react-router-dom';
import { albumsData } from '../assets/assets';

// Example songs data (replace with your actual data)
const songs = [
    { title: 'Song 1', file: '/assets/music/song1.mp3' },
    { title: 'Song 2', file: '/assets/music/song2.mp3' },
];

const Displayalbum = () => {
    const { id } = useParams();
    const albumData = albumsData[id];
    const audioRef = useRef(null); // Ref for the audio element

    // Function to play a song
    const playSong = (file) => {
        if (audioRef.current) {
            audioRef.current.src = file; // Set the audio source
            audioRef.current.play(); // Play the audio
        }
    };

    return (
        <>
            <Navbar />
            <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
                <img className="w-48 rounded" src={albumData.image} alt="" />
                <div className="flex flex-col">
                    <p>Playlist</p>
                    <h2 className="text-5xl font-bold mb-4 md:text-7xl">{albumData.name}</h2>
                    <h4>{albumData.desc}</h4>
                </div>
            </div>

            {/* Songs List */}
            <div className="mt-6">
                <h3 className="text-2xl font-bold mb-4">Songs</h3>
                <ul>
                    {songs.map((song, index) => (
                        <li key={index} className="flex items-center justify-between mb-2">
                            <span>{song.title}</span>
                            <button
                                className="bg-blue-500 text-white px-2 py-1 rounded"
                                onClick={() => playSong(song.file)}
                            >
                                Play
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Hidden audio element */}
            <audio ref={audioRef} />
        </>
    );
};

export default Displayalbum;

