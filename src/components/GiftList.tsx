import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Gift, Check, Loader2 } from 'lucide-react';
import { weddingConfig } from '../lib/config';
import { reserveGift, getReservedGiftIds } from '../lib/gifts';

const categories = ['Todos', ...new Set(weddingConfig.gifts.map((g) => g.category))];

export function GiftList() {
  const [reservedIds, setReservedIds] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [reservingId, setReservingId] = useState<string | null>(null);
  const [guestName, setGuestName] = useState('');
  const [showNameInput, setShowNameInput] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    getReservedGiftIds().then(setReservedIds);
  }, []);

  const filteredGifts =
    selectedCategory === 'Todos'
      ? weddingConfig.gifts
      : weddingConfig.gifts.filter((g) => g.category === selectedCategory);

  const handleReserve = async (giftId: string) => {
    if (!guestName.trim()) return;

    setReservingId(giftId);
    try {
      await reserveGift(giftId, guestName.trim());
      setReservedIds((prev) => new Set([...prev, giftId]));
      setSuccessId(giftId);
      setGuestName('');
      setShowNameInput(null);
      setTimeout(() => setSuccessId(null), 2000);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erro ao reservar presente.');
    } finally {
      setReservingId(null);
    }
  };

  return (
    <section id="gifts" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.015]" aria-hidden="true">
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-gold blur-3xl" />
        <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-rose blur-3xl" />
      </div>

      <div ref={sectionRef} className="max-w-lg mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-rose/10 mb-5">
            <Gift className="w-6 h-6 text-rose" />
          </div>
          <h2 className="font-cursive italic text-4xl md:text-5xl text-dark mb-3">Lista de Presentes</h2>
          <p className="font-sans text-muted text-sm max-w-xs mx-auto">
            Se quiser nos presentear, escolha um item e reserve para evitar duplicatas
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-sans uppercase tracking-wider whitespace-nowrap transition-all duration-300 min-h-[48px] ${
                selectedCategory === cat
                  ? 'bg-rose text-white shadow-md'
                  : 'bg-white/60 text-muted hover:bg-white hover:text-dark border border-rose/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredGifts.map((gift, index) => {
              const isReserved = reservedIds.has(gift.id);
              const isReserving = reservingId === gift.id;
              const isSuccess = successId === gift.id;
              const isInputOpen = showNameInput === gift.id;

              return (
                <motion.div
                  key={gift.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className={`group relative bg-white/70 backdrop-blur-sm rounded-2xl p-4 border transition-all duration-500 ${
                    isReserved
                      ? 'border-sage/30 bg-sage/5'
                      : 'border-rose/10 hover:border-rose/25 hover:shadow-lg hover:shadow-rose/5'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3
                          className={`font-serif text-base truncate ${
                            isReserved ? 'text-muted line-through' : 'text-dark'
                          }`}
                        >
                          {gift.name}
                        </h3>
                        {isReserved && !isSuccess && (
                          <span className="flex-shrink-0 text-[10px] font-sans uppercase tracking-wider text-sage bg-sage/10 px-2 py-0.5 rounded-full">
                            Reservado
                          </span>
                        )}
                        {isSuccess && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex-shrink-0 text-[10px] font-sans uppercase tracking-wider text-white bg-sage px-2 py-0.5 rounded-full"
                          >
                            Confirmado!
                          </motion.span>
                        )}
                      </div>
                      <span className="text-xs font-sans text-muted/70">{gift.category}</span>
                    </div>

                    {!isReserved && (
                      <button
                        onClick={() =>
                          isInputOpen ? setShowNameInput(null) : setShowNameInput(gift.id)
                        }
                        disabled={isReserving}
                        className="flex-shrink-0 flex items-center justify-center gap-1.5 px-4 py-2 bg-rose/10 hover:bg-rose/20 text-rose rounded-xl border border-rose/20 transition-all duration-300 font-sans text-xs uppercase tracking-wider min-h-[48px]"
                      >
                        {isReserving ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <>
                            <Gift size={14} />
                            Reservar
                          </>
                        )}
                      </button>
                    )}

                    {isReserved && !isSuccess && (
                      <div className="flex-shrink-0 flex items-center justify-center gap-1.5 px-4 py-2 bg-sage/10 text-sage rounded-xl font-sans text-xs uppercase tracking-wider min-h-[48px]">
                        <Check size={14} />
                      </div>
                    )}
                  </div>

                  <AnimatePresence>
                    {isInputOpen && !isReserved && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 mt-3 border-t border-rose/10">
                          <p className="text-xs font-sans text-muted mb-2">
                            Digite seu nome para reservar:
                          </p>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={guestName}
                              onChange={(e) => setGuestName(e.target.value)}
                              placeholder="Seu nome"
                              className="flex-1 px-3 py-2 bg-white/60 border border-rose/15 rounded-lg text-sm font-sans text-dark placeholder:text-muted/50 focus:outline-none focus:border-rose/40 transition-colors"
                              onKeyDown={(e) => e.key === 'Enter' && handleReserve(gift.id)}
                            />
                            <button
                              onClick={() => handleReserve(gift.id)}
                              disabled={!guestName.trim() || isReserving}
                              className="px-4 py-2 bg-rose text-white rounded-lg text-xs font-sans uppercase tracking-wider hover:bg-rose/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px]"
                            >
                              {isReserving ? (
                                <Loader2 size={14} className="animate-spin" />
                              ) : (
                                'Confirmar'
                              )}
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-10"
        >
          <p className="font-sans text-xs text-muted/60">
            {reservedIds.size} de {weddingConfig.gifts.length} itens reservados
          </p>
        </motion.div>
      </div>
    </section>
  );
}
