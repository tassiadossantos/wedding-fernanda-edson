import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { weddingConfig } from '../lib/config';

export function AudioPlayer() {
  const { isPlaying, toggle } = useAudioPlayer(weddingConfig.audioSrc);

  if (!weddingConfig.audioSrc) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 0.5 }}
      onClick={toggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-rose/20 flex items-center justify-center text-rose hover:bg-white transition-colors"
      aria-label={isPlaying ? 'Pausar música' : 'Tocar música'}
    >
      {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
    </motion.button>
  );
}
