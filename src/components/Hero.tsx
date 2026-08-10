import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useCountdown } from '../hooks/useCountdown';
import { weddingConfig } from '../lib/config';
import { generateCalendarLink, downloadIcs } from '../lib/calendar';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
};

const stagger: Variants = {
  visible: { transition: { staggerChildren: 0.15 } },
};

export function Hero() {
  const { partner1, partner2 } = weddingConfig.couple;
  const { date, ceremony } = weddingConfig.event;
  const countdown = useCountdown(date);

  const formattedDate = date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <header className="relative min-h-screen flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={weddingConfig.heroImage}
          alt=""
          className="w-full h-full object-cover"
          fetchPriority="high"
        />
        {/* Stronger top for nav contrast, smooth fade to cream at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 via-70% to-cream" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-2xl mx-auto pt-32 pb-8"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        {/* Names — tight vertical group */}
        <motion.h1 variants={fadeUp} className="mb-6 mt-2">
          <span className="block font-cursive italic text-5xl md:text-7xl text-white drop-shadow-lg leading-none">
            {partner1}
          </span>
          <span className="block font-cursive italic text-2xl md:text-3xl text-champagne/80 -my-1">&amp;</span>
          <span className="block font-cursive italic text-5xl md:text-7xl text-white drop-shadow-lg leading-none">
            {partner2}
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          className="font-serif text-sm md:text-base text-white/70 italic"
        >
          Convidam para celebrar o início da nossa história
        </motion.p>

        {/* Divider — more visible */}
        <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 my-5">
          <div className="w-10 h-px bg-white/40" />
          <div className="w-2 h-2 rounded-full bg-champagne/70" />
          <div className="w-10 h-px bg-white/40" />
        </motion.div>

        {/* Date + Time — unified block */}
        <motion.div variants={fadeUp}>
          <p className="font-sans text-xs md:text-sm uppercase tracking-[0.3em] text-champagne/90">
            {formattedDate}
          </p>
          <p className="font-sans text-xs text-white/70 mt-1.5">
            Cerimônia às {ceremony.time}
          </p>
        </motion.div>

        {/* Countdown */}
        {!countdown.isExpired && (
          <motion.div
            variants={fadeUp}
            className="flex justify-center gap-4 md:gap-6 mt-10"
            role="timer"
            aria-label="Contagem regressiva para o casamento"
          >
            {[
              { value: countdown.days, label: 'Dias' },
              { value: countdown.hours, label: 'Horas' },
              { value: countdown.minutes, label: 'Min' },
              { value: countdown.seconds, label: 'Seg' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-xl md:text-2xl font-serif text-white font-semibold tabular-nums">
                    {String(value).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-xs uppercase tracking-wider text-white/70 mt-2 block">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        )}

        {/* Calendar Buttons */}
        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3 mt-8">
          <button
            onClick={() => window.open(generateCalendarLink(date), '_blank')}
            className="px-5 py-2.5 text-xs uppercase tracking-wider bg-white/8 hover:bg-white/15 text-white/90 rounded-full border border-white/20 transition-all duration-300 backdrop-blur-sm min-h-[48px]"
          >
            Google Calendar
          </button>
          <button
            onClick={() => downloadIcs(date)}
            className="px-5 py-2.5 text-xs uppercase tracking-wider bg-white/8 hover:bg-white/15 text-white/90 rounded-full border border-white/20 transition-all duration-300 backdrop-blur-sm min-h-[48px]"
          >
            Apple / Outlook
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={fadeUp}
          className="mt-14"
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            className="opacity-40 mx-auto"
            aria-hidden="true"
          >
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </motion.div>
      </motion.div>
    </header>
  );
}
