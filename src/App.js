import React, { useState, useEffect, useCallback } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Music } from "lucide-react";
import "./styles.css"; // Import du fichier CSS

const WeddingInvitation = () => {
  const [name, setName] = useState("");
  const [musicPlaying, setMusicPlaying] = useState(false);
  const weddingDate = new Date("2025-06-15T00:00:00").getTime();

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
    <div className="container">
      <h1>Invitation de Mariage</h1>
      <p>Bienvenue {name || "cher invité"} !</p>
      <p>Nous avons hâte de célébrer avec vous le 15 juin 2025.</p>

      <div className="countdown">
        <CountdownCircleTimer
          isPlaying
          duration={timeLeft}
          colors={"#d63384"}
          size={150}
          strokeWidth={10}
        >
          {({ remainingTime }) => <span className="text-lg font-semibold">{formatTime(remainingTime)}</span>}
        </CountdownCircleTimer>
      </div>

      <p>Temps restant avant le grand jour !</p>

      <input
        type="text"
        placeholder="Entrez votre nom"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={toggleMusic}>
        <Music className="inline mr-2" /> {musicPlaying ? "Pause" : "Jouer la musique"}
      </button>

      <audio id="background-music" src="/wedding-song.mp3" loop />
    </div>
  );
};

export default WeddingInvitation;
