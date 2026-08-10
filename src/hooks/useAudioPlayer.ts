import { useState, useEffect, useRef, useCallback } from 'react';

interface AudioPlayerReturn {
  isPlaying: boolean;
  toggle: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

export function useAudioPlayer(src?: string): AudioPlayerReturn {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!src) return;

    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.3;
    audio.preload = 'metadata';
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [src]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  }, [isPlaying]);

  return { isPlaying, toggle, audioRef };
}
