import { useMemo, useEffect, useState } from "react";

const useAudio = (url: string) => {
  const audio = useMemo(() => new Audio(url), [url]);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  const playAudio = () => {
    setPlaying(true);
  };

  const pauseAudio = () => {
    setPlaying(false);
  };

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing, audio]);

  useEffect(() => {
    const handleAudioEnded = () => {
      setPlaying(false);
    };

    audio.addEventListener("ended", handleAudioEnded);

    return () => {
      audio.removeEventListener("ended", handleAudioEnded);
    };
  }, [audio]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "+") {
        const newVolume = audio.volume + 0.05;
        if (newVolume > 1) {
          return;
        }
        setVolume(parseFloat(newVolume.toFixed(2)));
      }
      if (e.key === "-") {
        const newVolume = audio.volume - 0.05;
        if (newVolume < 0) {
          return;
        }
        setVolume(parseFloat(newVolume.toFixed(2)));
      }
    };
    audio.volume = volume;

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [audio, volume]);

  return { playing, playAudio, pauseAudio, volume };
};

export default useAudio;
