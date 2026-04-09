import { createContext, useContext, useRef, useState, useEffect } from "react";
import songs from "../utils/songs";

const MusicContext = createContext();

export const useMusic = () => useContext(MusicContext);

export const MusicProvider = ({ children }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [playbackMode, setPlaybackMode] = useState("order"); // "order" | "single"

  const currentSong = songs[currentSongIndex];
  const currentSongSrc = `/music/${encodeURI(currentSong.fileName)}`;

  const handleToggleAudio = async () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    }
  };

  const handleSongSelect = async (index) => {
    setCurrentSongIndex(index);
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const handleNextSong = () => handleSongSelect((currentSongIndex + 1) % songs.length);
  const handlePrevSong = () => handleSongSelect((currentSongIndex - 1 + songs.length) % songs.length);

  const togglePlaybackMode = () => {
    setPlaybackMode((prev) => (prev === "order" ? "single" : "order"));
  };

  const handleAudioEnded = async () => {
    if (!audioRef.current) return;

    if (playbackMode === "single") {
      try {
        audioRef.current.currentTime = 0;
        await audioRef.current.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
      return;
    }
    // If order mode, go to next song
    handleNextSong();
  };

  // React to source changes cleanly
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.load();
    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [currentSongSrc]);

  return (
    <MusicContext.Provider
      value={{
        currentSong,
        isPlaying,
        playbackMode,
        handleToggleAudio,
        handleNextSong,
        handlePrevSong,
        togglePlaybackMode,
      }}
    >
      {children}
      {/* This audio tag is now global and will NEVER unmount during page changes */}
      <audio ref={audioRef} src={currentSongSrc} onEnded={handleAudioEnded} preload="metadata" />
    </MusicContext.Provider>
  );
};