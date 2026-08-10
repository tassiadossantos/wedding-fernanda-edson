import { Heart } from 'lucide-react';
import { weddingConfig } from '../lib/config';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 bg-dark text-white/60">
      <div className="max-w-lg mx-auto text-center">
        <div className="font-cursive italic text-3xl text-champagne mb-4">
          {weddingConfig.couple.initials}
        </div>
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="font-serif text-white/80">{weddingConfig.couple.partner1}</span>
          <Heart size={14} className="text-rose" fill="currentColor" />
          <span className="font-serif text-white/80">{weddingConfig.couple.partner2}</span>
        </div>
        <p className="text-xs font-sans">
          {weddingConfig.event.date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })}
        </p>
        <div className="mt-6 pt-6 border-t border-white/10">
          <p className="text-xs font-sans text-white/40">
            &copy; {year} • Feito com{' '}
            <Heart size={10} className="inline text-rose" fill="currentColor" />{' '}
            para celebrar o amor
          </p>
        </div>
      </div>
    </footer>
  );
}
