import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Navigation, Clock, Home } from 'lucide-react';
import { weddingConfig } from '../lib/config';

export function Locations() {
  const { ceremony } = weddingConfig.event;
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
          <h2 className="font-cursive italic text-4xl md:text-5xl text-dark mb-3">Local do Evento</h2>
          <p className="font-sans text-muted text-sm max-w-xs mx-auto">
            O lugar onde celebraremos esse momento especial
          </p>
        </motion.div>

        {/* Ceremony Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
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
      </div>
    </section>
  );
}
