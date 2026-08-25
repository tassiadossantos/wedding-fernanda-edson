import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart, Coffee, Diamond, Sparkles, Gift } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    date: 'Março 2019',
    title: 'O Primeiro Encontro',
    description: 'Nosso primeiro encontro foi no Salão de Assembleias. Fernanda, sentada ao meu lado, começou a me observar de relance... e ali, algo especial começou a nascer.',
    icon: Coffee,
    accent: 'bg-champagne/40',
  },
  {
    date: 'Junho 2021',
    title: 'O Primeiro "Eu Te Amo"',
    description: 'Eu já estava completamente apaixonado, mas faltava dizer em voz alta. Foi em um momento simples, mas que mudou tudo: as palavras que eu carregava no peito finalmente saíram.',
    icon: Heart,
    accent: 'bg-gold/15',
  },
  {
    date: 'Fevereiro 2025',
    title: 'O Pedido',
    description: 'Eu, de joelhos. O anel na mão. O Yan do meu lado me dando aquela força. Perguntei: "Quer passar o resto da vida comigo?" Ela olhou, sorriu e disse: "Sim, meu amor." E logo depois veio o beijo, a pizza e o refri — o combo perfeito de um pedido de casamento.',
    icon: Diamond,
    accent: 'bg-gold/15',
  },
  {
    date: 'Outubro 2026',
    title: 'O Grande Dia',
    description: 'E agora, não podemos esperar para celebrar nosso amor com você — a pessoa mais importante nesta história.',
    icon: Sparkles,
    accent: 'bg-blush/40',
  },
];

function TimelineItem({ event, index }: { event: TimelineEvent; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const isEven = index % 2 === 0;
  const Icon = event.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="relative"
    >
      <div className={`flex items-start gap-6 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
        <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
          <div
            className={`group relative bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-rose/10 
            hover:border-rose/25 hover:shadow-lg hover:shadow-rose/5 transition-all duration-500
            ${isEven ? 'md:mr-4' : 'md:ml-4'}`}
          >
            <h3 className="font-serif text-lg text-dark mb-2 group-hover:text-rose transition-colors">
              {event.title}
            </h3>
            <p className="font-sans text-sm text-muted leading-relaxed">
              {event.description}
            </p>
          </div>
        </div>

        <div className="relative flex-shrink-0 hidden md:flex flex-col items-center">
          <div className={`w-14 h-14 rounded-full ${event.accent} flex items-center justify-center 
            border-2 border-white shadow-md transition-transform duration-300`}>
            <Icon size={22} className="text-dark/60" strokeWidth={1.5} />
          </div>
        </div>

        <div className="hidden md:block flex-1" />
      </div>

      <div className="md:hidden absolute -left-11 top-11">
        <div className={`w-10 h-10 rounded-full ${event.accent} flex items-center justify-center 
          border-2 border-white shadow-sm`}>
          <Icon size={16} className="text-dark/60" strokeWidth={1.5} />
        </div>
      </div>
    </motion.div>
  );
}

export function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="story" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.015]" aria-hidden="true">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-rose blur-3xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-sage blur-3xl" />
      </div>

      <div ref={sectionRef} className="max-w-2xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-rose/10 mb-5">
            <Heart className="w-6 h-6 text-rose" fill="currentColor" />
          </div>
          <h2 className="font-cursive italic text-4xl md:text-5xl text-dark mb-3">Nossa História</h2>
          <p className="font-sans text-muted text-sm max-w-xs mx-auto">
            Cada passo nos trouxe até este momento — e agora queremos celebrar com você
          </p>
        </motion.div>

        <div className="relative space-y-8 md:space-y-12 pl-8 md:pl-0">
          <div className="absolute left-[11px] md:left-1/2 top-0 bottom-0 w-px" aria-hidden="true">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="w-full h-full bg-gradient-to-b from-rose/30 via-rose/20 to-transparent origin-top"
            />
          </div>

          {timelineEvents.map((event, index) => (
            <TimelineItem key={event.date} event={event} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex items-center justify-center mt-16 gap-3"
        >
          <div className="w-16 h-px bg-rose/30" />
          <Gift size={14} className="text-rose/50" />
          <div className="w-16 h-px bg-rose/30" />
        </motion.div>
      </div>
    </section>
  );
}
