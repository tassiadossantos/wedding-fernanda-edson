import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '#story', label: 'Nossa História' },
  { href: '#rsvp', label: 'RSVP' },
  { href: '#locations', label: 'Locais' },
  { href: '#gifts', label: 'Presentes' },
  { href: '#guestbook', label: 'Recados' },
  { href: '#dresscode', label: 'Vestimenta' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const heroHeight = window.innerHeight * 0.6;
    const progress = Math.min(scrollY / heroHeight, 1);
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [handleScroll]);

  const handleNavClick = () => setIsOpen(false);

  const bgOpacity = scrollProgress * 0.92;
  const blurAmount = 8 + scrollProgress * 12;
  const shadowOpacity = scrollProgress * 0.08;
  const borderOpacity = scrollProgress * 0.1;
  const textColor = scrollProgress > 0.5 ? 'dark' : 'white';

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: `rgba(253, 246, 238, ${bgOpacity})`,
          backdropFilter: `blur(${blurAmount}px)`,
          WebkitBackdropFilter: `blur(${blurAmount}px)`,
          boxShadow: `0 1px 3px rgba(0,0,0,${shadowOpacity})`,
          borderBottom: `1px solid rgba(201, 160, 160, ${borderOpacity})`,
        }}
        role="navigation"
        aria-label="Menu principal"
      >
        <div className="max-w-lg mx-auto px-6 py-4 flex items-center justify-between">
          <div className="hidden md:flex items-center gap-5 mx-auto whitespace-nowrap">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-sans uppercase tracking-[0.15em] transition-colors duration-500 hover:text-rose min-h-[48px] flex items-center"
                style={{
                  color: textColor === 'dark' ? 'rgba(44, 44, 44, 0.7)' : 'rgba(255, 255, 255, 0.9)',
                  textShadow: textColor === 'white' ? '0 1px 3px rgba(0,0,0,0.3)' : 'none',
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden ml-auto min-w-[48px] min-h-[48px] flex items-center justify-center transition-colors duration-500 rounded-lg"
            style={{
              color: textColor === 'dark' ? '#2c2c2c' : '#ffffff',
              textShadow: textColor === 'white' ? '0 1px 3px rgba(0,0,0,0.3)' : 'none',
            }}
            aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-dark/70 backdrop-blur-sm md:hidden"
            onClick={handleNavClick}
          >
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-2xl p-8 pt-20"
              onClick={(e) => e.stopPropagation()}
              aria-label="Menu de navegação"
            >
              <div className="space-y-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={handleNavClick}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="block font-sans text-sm text-dark/80 hover:text-rose transition-colors py-3.5 border-b border-rose/10 min-h-[48px] flex items-center"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
