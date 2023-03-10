import { useMemo, useEffect, useState, useCallback } from "react";

const useAudio = (urls: string[]) => {
  const [activeIndexSong, setActiveIndexSong] = useState(0);
  const audios = useMemo(() => urls.map((url) => new Audio(url)), [urls]);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  const playAudio = useCallback(() => {
    setPlaying(true);
  }, []);

  const pauseAudio = useCallback(() => {
    setPlaying(false);
  }, []);

  const nextSong = useCallback(() => {
    if (activeIndexSong + 1 >= urls.length) {
      return;
    }
    setActiveIndexSong((prev) => prev + 1);
  }, [activeIndexSong, urls]);

  const backSong = useCallback(() => {
    if (activeIndexSong - 1 < 0) {
      return;
    }
    setActiveIndexSong((prev) => prev - 1);
  }, [activeIndexSong]);

  useEffect(() => {
    console.log(audios);
    if (playing) {
      audios[activeIndexSong].play();
    } else {
      audios[activeIndexSong].pause();
    }
  }, [playing, activeIndexSong, audios]);

  return { playing, playAudio, pauseAudio, nextSong, backSong, volume };
};

export default useAudio;
