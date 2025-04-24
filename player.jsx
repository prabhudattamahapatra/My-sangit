import React, { useRef, useState } from 'react';
import { assets, songsData } from '../assets/assets';

export default function Player() {
  const audioRef = useRef(null); // Ref for the audio element
  const [isPlaying, setIsPlaying] = useState(false); // State to track if music is playing
  const [currentSongIndex, setCurrentSongIndex] = useState(0); // State to track the current song
  const [progress, setProgress] = useState(0); // State for progress bar

  // Function to play or pause the music
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Function to update progress bar
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setProgress((currentTime / duration) * 100);
    }
  };

  // Function to play the next song
  const playNext = () => {
    setCurrentSongIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % songsData.length; // Loop back to the first song
      return nextIndex;
    });

    // Ensure the next song starts playing automatically
    if (audioRef.current) {
      audioRef.current.pause(); // Pause the current song
      audioRef.current.currentTime = 0; // Reset the current song's time
      setTimeout(() => {
        audioRef.current.play().catch((error) => {
          console.error('Error playing the next song:', error);
        });
      }, 0); // Ensure the play method is called after the state update
    }

    setIsPlaying(true); // Update the play state
  };

  // Function to play the previous song
  const playPrevious = () => {
    setCurrentSongIndex((prevIndex) => {
      const previousIndex = prevIndex === 0 ? songsData.length - 1 : prevIndex - 1; // Loop back to the last song
      return previousIndex;
    });

    // Ensure the previous song starts playing automatically
    if (audioRef.current) {
      audioRef.current.pause(); // Pause the current song
      audioRef.current.currentTime = 0; // Reset the current song's time
      setTimeout(() => {
        audioRef.current.play().catch((error) => {
          console.error('Error playing the previous song:', error);
        });
      }, 0); // Ensure the play method is called after the state update
    }

    setIsPlaying(true); // Update the play state
  };

  // Automatically play the next song when the current song ends
  const handleSongEnd = () => {
    playNext();
  };

  return (
    <div className='h-[10%] bg-black flex justify-between items-center text-white px-4'>
      {/* Song Info */}
      <div className='hidden lg:flex items-center gap-4'>
        <img className='w-12' src={songsData[currentSongIndex].image} alt="" />
        <div>
          <p>{songsData[currentSongIndex].name}</p>
          <p>{songsData[currentSongIndex].desc.slice(0, 18)}</p>
        </div>
      </div>

      {/* Player Controls */}
      <div className='flex flex-col items-center gap-1 m-auto'>
        <div className='flex gap-4'>
          <img className='w-4 cursor-pointer' src={assets.shuffle_icon} alt="Shuffle" />
          <img
            className='w-4 cursor-pointer'
            src={assets.prev_icon}
            alt="Previous"
            onClick={playPrevious} // Play the previous song
          />
          <img
            className='w-4 cursor-pointer'
            src={isPlaying ? assets.pause_icon : assets.play_icon} // Toggle between play and pause icon
            alt="Play/Pause"
            onClick={togglePlay} // Play or pause music
          />
          <img
            className='w-4 cursor-pointer'
            src={assets.next_icon}
            alt="Next"
            onClick={playNext} // Play the next song
          />
          <img className='w-4 cursor-pointer' src={assets.loop_icon} alt="Loop" />
        </div>

        {/* Progress Bar */}
        <div className='flex items-center gap-5'>
          <p>{audioRef.current ? Math.floor(audioRef.current.currentTime) : '0:00'}</p>
          <div className='w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer'>
            <div
              className='h-1 bg-green-800 rounded-full'
              style={{ width: `${progress}%` }} // Update progress bar width
            ></div>
          </div>
          <p>{audioRef.current ? Math.floor(audioRef.current.duration) : '0:00'}</p>
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={songsData[currentSongIndex].file} // Use the current song's file as the source
        onTimeUpdate={handleTimeUpdate} // Update progress bar as the song plays
        onEnded={handleSongEnd} // Play the next song when the current song ends
      />
    </div>
  );
}
