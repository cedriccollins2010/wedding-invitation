import React, { useState, useEffect, useCallback } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Music } from "lucide-react";

const WeddingInvitation = () => {
  const [name, setName] = useState("");
  const [musicPlaying, setMusicPlaying] = useState(false);
  const weddingDate = new Date("2025-05-25T00:15:00").getTime();

  const getTimeRemaining = useCallback(() => {
    const now = new Date().getTime();
    return Math.max(0, Math.floor((weddingDate - now) / 1000));
  }, [weddingDate]);

  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  useEffect(() => {
    setTimeLeft(getTimeRemaining());
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, [getTimeRemaining]);

  const formatTime = (seconds) => {
    const days = Math.floor(seconds / (24 * 3600));
    const hours = Math.floor((seconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${days}j ${hours}h ${minutes}m ${secs}s`;
  };

  const toggleMusic = () => {
    const audio = document.getElementById("background-music");
    if (musicPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setMusicPlaying(!musicPlaying);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 p-4">
      <div className="max-w-xl p-6 text-center bg-white shadow-lg rounded-2xl">
        <h1 className="text-3xl font-bold mb-4">Invitation de Mariage</h1>
        <p className="text-lg mb-2">Bienvenue {name || "cher invité"} !</p>
        <p className="mb-4">Nous avons hâte de célébrer avec vous le 15 juin 2025.</p>
        
        <CountdownCircleTimer
          isPlaying
          duration={timeLeft}
          colors={"#FF4081"}
          size={120}
          strokeWidth={8}
        >
          {({ remainingTime }) => <span className="text-lg font-semibold">{formatTime(remainingTime)}</span>}
        </CountdownCircleTimer>
        
        <p className="mt-4 text-gray-600">Temps restant avant le grand jour !</p>
        
        <div className="mt-4">
          <input
            type="text"
            placeholder="Entrez votre nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-center border p-2 rounded"
          />
        </div>
        
        <button onClick={toggleMusic} className="mt-4 px-4 py-2 bg-pink-500 text-white rounded">
          <Music className="inline mr-2" /> {musicPlaying ? "Pause" : "Jouer la musique"}
        </button>
        
        <audio id="background-music" src="/wedding-song.mp3" loop />
      </div>
    </div>
  );
};

export default WeddingInvitation;
