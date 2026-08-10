import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Navigation, MessageCircle, Clock, ArrowRight, Home, Wine } from 'lucide-react';
import { weddingConfig } from '../lib/config';

export function Locations() {
  const { ceremony, reception } = weddingConfig.event;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section id="locations" className="py-24 px-6 bg-gradient-to-b from-champagne/20 to-cream">
      <div ref={ref} className="max-w-lg mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-rose/10 mb-5">
            <MapPin className="w-6 h-6 text-rose" />
          </div>
          <h2 className="font-cursive italic text-4xl md:text-5xl text-dark mb-3">Locais do Evento</h2>
          <p className="font-sans text-muted text-sm max-w-xs mx-auto">
            Dois lugares, uma única história de amor
          </p>
        </motion.div>

        {/* Timeline connector */}
        <div className="relative">
          {/* Ceremony Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="bg-white/70 backdrop-blur-md rounded-3xl p-6 border border-rose/10 shadow-lg shadow-rose/5">
              {/* Time badge */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-blush/60 flex items-center justify-center">
                  <Home size={18} className="text-dark/60" strokeWidth={1.5} />
                </div>
                <div>
                  <span className="text-xs font-sans text-rose uppercase tracking-[0.2em] block">
                    Cerimônia
                  </span>
                  <div className="flex items-center gap-1.5 text-dark">
                    <Clock size={12} className="text-rose/60" />
                    <span className="font-serif text-lg">{ceremony.time}h</span>
                  </div>
                </div>
              </div>

              <h3 className="font-serif text-xl text-dark mb-1">{ceremony.venue}</h3>
              <p className="font-sans text-sm text-muted mb-5">{ceremony.address}</p>

              <div className="flex gap-2.5">
                <a
                  href={ceremony.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-sage/10 hover:bg-sage/20 
                    text-sage rounded-xl border border-sage/20 transition-all duration-300 
                    font-sans text-xs uppercase tracking-wider min-h-[48px] hover:shadow-md hover:shadow-sage/10"
                >
                  <Navigation size={14} /> Maps
                </a>
                <a
                  href={ceremony.wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-sage/10 hover:bg-sage/20 
                    text-sage rounded-xl border border-sage/20 transition-all duration-300 
                    font-sans text-xs uppercase tracking-wider min-h-[48px] hover:shadow-md hover:shadow-sage/10"
                >
                  <Navigation size={14} /> Waze
                </a>
              </div>
            </div>
          </motion.div>

          {/* Connector */}
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={isInView ? { opacity: 1, scaleY: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col items-center py-4"
            aria-hidden="true"
          >
            <div className="flex flex-col items-center gap-1">
              <div className="w-px h-4 bg-rose/20" />
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-champagne/40 border border-gold/20">
                <ArrowRight size={12} className="text-gold rotate-90" />
                <span className="text-xs font-sans text-gold uppercase tracking-wider">Depois</span>
                <ArrowRight size={12} className="text-gold -rotate-90" />
              </div>
              <div className="w-px h-4 bg-rose/20" />
            </div>
          </motion.div>

          {/* Reception Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="bg-white/70 backdrop-blur-md rounded-3xl p-6 border border-gold/15 shadow-lg shadow-gold/5">
              {/* Time badge */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center">
                  <Wine size={18} className="text-dark/60" strokeWidth={1.5} />
                </div>
                <div>
                  <span className="text-xs font-sans text-gold uppercase tracking-[0.2em] block">
                    Recepção
                  </span>
                  <div className="flex items-center gap-1.5 text-dark">
                    <Clock size={12} className="text-gold/60" />
                    <span className="font-serif text-lg">{reception.time}h</span>
                  </div>
                </div>
              </div>

              <h3 className="font-serif text-xl text-dark mb-1">{reception.venue}</h3>
              <p className="font-sans text-sm text-muted mb-5">{reception.address}</p>

              <div className="flex gap-2.5">
                <a
                  href={reception.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-gold/10 hover:bg-gold/20 
                    text-gold rounded-xl border border-gold/20 transition-all duration-300 
                    font-sans text-xs uppercase tracking-wider min-h-[48px] hover:shadow-md hover:shadow-gold/10"
                >
                  <Navigation size={14} /> Maps
                </a>
                <a
                  href={reception.wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-gold/10 hover:bg-gold/20 
                    text-gold rounded-xl border border-gold/20 transition-all duration-300 
                    font-sans text-xs uppercase tracking-wider min-h-[48px] hover:shadow-md hover:shadow-gold/10"
                >
                  <Navigation size={14} /> Waze
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* WhatsApp */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8"
        >
          <a
            href={`https://wa.me/${weddingConfig.whatsapp}?text=Olá! Tenho uma dúvida sobre o casamento.`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-r from-green-600 to-green-700 
              hover:from-green-700 hover:to-green-800 text-white rounded-2xl font-sans text-sm uppercase tracking-wider 
              transition-all duration-300 min-h-[52px] shadow-lg shadow-green-600/20 hover:shadow-green-700/30"
          >
            <MessageCircle size={18} />
            Falar com a Assessoria
            <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
