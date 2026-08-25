import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Heart, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  addGuestbookEntry,
  getGuestbookEntries,
} from '../lib/guestbook';
import type { GuestbookEntry } from '../lib/guestbook';

const ENTRY_COLORS = [
  'from-rose/15 to-blush/20',
  'from-sage/10 to-sage/15',
  'from-champagne/30 to-gold/10',
  'from-blush/20 to-rose/10',
];

const AUTOPLAY_INTERVAL = 4000;

export function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

export function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    loadEntries();
  }, []);

  const goTo = useCallback((idx: number) => {
    setCurrentIndex(idx);
  }, []);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? entries.length - 1 : prev - 1));
  }, [entries.length]);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === entries.length - 1 ? 0 : prev + 1));
  }, [entries.length]);

  useEffect(() => {
    if (isPaused || entries.length <= 1) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev === entries.length - 1 ? 0 : prev + 1));
    }, AUTOPLAY_INTERVAL);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, entries.length]);

  async function loadEntries() {
    try {
      setIsLoading(true);
      const data = await getGuestbookEntries();
      setEntries(data);
    } catch {
      setError('Não foi possível carregar os recados.');
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await addGuestbookEntry(name.trim(), message.trim());

      const newEntry: GuestbookEntry = {
        id: Date.now().toString(),
        name: name.trim(),
        message: message.trim(),
        timestamp: new Date(),
      };
      setEntries((prev) => [newEntry, ...prev]);

      setName('');
      setMessage('');
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch {
      setError('Erro ao enviar. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="guestbook" className="py-24 px-6 bg-gradient-to-b from-blush/20 to-cream">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-sage/10 mb-5">
            <MessageSquare className="w-6 h-6 text-sage" />
          </div>
          <h2 className="font-cursive italic text-4xl md:text-5xl text-dark mb-3">Mural de Recados</h2>
          <p className="font-sans text-muted text-sm max-w-xs mx-auto">
            Deixe uma palavra carinhosa — suas palavras serão eternas para nós
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-white/70 backdrop-blur-md rounded-3xl p-6 border border-sage/10 shadow-lg shadow-sage/5 mb-10"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="gb-name" className="block text-xs font-sans text-dark/70 uppercase tracking-wider mb-2">
                Seu nome
              </label>
              <input
                id="gb-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Como podemos te chamar?"
                required
                className="w-full px-4 py-3.5 rounded-xl border border-rose/15 bg-white/50
                  focus:border-sage focus:ring-2 focus:ring-sage/15 outline-none transition-all
                  font-sans text-sm text-dark placeholder:text-dark/30 min-h-[48px]"
              />
            </div>
            <div>
              <label htmlFor="gb-message" className="block text-xs font-sans text-dark/70 uppercase tracking-wider mb-2">
                Sua mensagem
              </label>
              <textarea
                id="gb-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escreva algo do coração..."
                required
                rows={3}
                maxLength={150}
                className="w-full px-4 py-3.5 rounded-xl border border-rose/15 bg-white/50
                  focus:border-sage focus:ring-2 focus:ring-sage/15 outline-none transition-all
                  font-sans text-sm text-dark placeholder:text-dark/30 resize-none"
              />
            </div>

            {error && (
              <p className="text-red-500 text-xs text-center">{error}</p>
            )}

            <motion.button
              type="submit"
              disabled={isSubmitting || !name.trim() || !message.trim()}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-rose to-rose/90 text-white rounded-2xl
                font-sans text-sm uppercase tracking-wider hover:from-rose/90 hover:to-rose/80
                transition-all disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center gap-2.5 min-h-[52px] shadow-lg shadow-rose/20"
            >
              {isSubmitting ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <>
                  <Send size={16} />
                  {submitted ? 'Recado enviado!' : 'Deixar Recado'}
                </>
              )}
            </motion.button>
          </div>
        </motion.form>

        {/* Carousel */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 size={24} className="text-rose/40 animate-spin" />
          </div>
        ) : entries.length > 0 ? (
          <div
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Card */}
            <div className="overflow-hidden rounded-2xl">
              <AnimatePresence mode="wait">
                <motion.article
                  key={entries[currentIndex].id}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className={`relative bg-gradient-to-br ${ENTRY_COLORS[currentIndex % ENTRY_COLORS.length]} backdrop-blur-sm rounded-2xl p-6 border border-white/60 min-h-[140px]`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-11 h-11 rounded-full bg-white/80 flex items-center justify-center
                      border border-white shadow-sm">
                      <span className="text-xs font-sans font-semibold text-dark/60">
                        {getInitials(entries[currentIndex].name)}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-serif text-sm text-dark font-medium truncate">
                          {entries[currentIndex].name}
                        </span>
                        <span className="text-xs text-dark/60 font-sans flex-shrink-0 tabular-nums">
                          {entries[currentIndex].timestamp.toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: 'short',
                          })}
                        </span>
                      </div>
                      <p className="font-sans text-sm text-dark/70 leading-relaxed">
                        {entries[currentIndex].message}
                      </p>
                    </div>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>

            {/* Controls */}
            {entries.length > 1 && (
              <>
                <button
                  onClick={goPrev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-8 h-8 rounded-full bg-white/80 border border-white shadow-md flex items-center justify-center text-dark/50 hover:text-dark hover:bg-white transition-all"
                  aria-label="Anterior"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={goNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-8 h-8 rounded-full bg-white/80 border border-white shadow-md flex items-center justify-center text-dark/50 hover:text-dark hover:bg-white transition-all"
                  aria-label="Próximo"
                >
                  <ChevronRight size={16} />
                </button>
              </>
            )}

            {/* Dots */}
            {entries.length > 1 && (
              <div className="flex items-center justify-center gap-2 mt-4">
                {entries.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goTo(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === currentIndex
                        ? 'bg-sage w-5'
                        : 'bg-dark/20 hover:bg-dark/40'
                    }`}
                    aria-label={`Recado ${idx + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Pause indicator */}
            {isPaused && entries.length > 1 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-[10px] text-dark/30 mt-2 font-sans"
              >
                Pausado
              </motion.p>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Heart size={24} className="text-rose/30 mx-auto mb-3" />
            <p className="text-xs text-muted font-sans">Seja o primeiro a deixar um recado!</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}