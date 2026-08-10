import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, Check, Gift, Heart, Sparkles } from 'lucide-react';
import { weddingConfig } from '../lib/config';

export function GiftRegistry() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(weddingConfig.registry.pixKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = weddingConfig.registry.pixKey;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section id="gifts" className="py-24 px-6 bg-gradient-to-b from-champagne/20 to-cream">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold/10 mb-5">
            <Gift className="w-6 h-6 text-gold" />
          </div>
          <h2 className="font-cursive italic text-4xl md:text-5xl text-dark mb-3">Presentes</h2>
          <p className="font-sans text-muted text-sm max-w-xs mx-auto leading-relaxed">
            Sua presença é o maior presente, mas se quiser nos homenagear com um gesto de amor...
          </p>
        </motion.div>

        {/* Pix Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white/70 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-gold/15 shadow-lg shadow-gold/5 mb-5"
        >
          <div className="flex items-center gap-2 mb-6">
            <Sparkles size={16} className="text-gold" />
            <h3 className="font-serif text-lg text-dark">Pix Instantâneo</h3>
          </div>

          <div className="flex flex-col items-center">
            {/* QR Code with elegant frame */}
            <div className="relative p-5 bg-white rounded-2xl shadow-sm border border-gold/10 mb-5">
              <QRCodeSVG
                value={weddingConfig.registry.pixKey}
                size={170}
                bgColor="#ffffff"
                fgColor="#2c2c2c"
                level="M"
                imageSettings={{
                  src: '',
                  height: 0,
                  width: 0,
                  excavate: false,
                }}
              />
              {/* Corner accents */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-gold/30 rounded-tl-lg" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-gold/30 rounded-tr-lg" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-gold/30 rounded-bl-lg" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-gold/30 rounded-br-lg" />
            </div>

            <p className="text-xs text-muted text-center font-sans mb-4">
              {weddingConfig.registry.pixLabel}
            </p>

            {/* Copy field */}
            <div className="w-full relative">
              <div className="flex items-center gap-2 bg-cream/80 rounded-2xl px-4 py-3 border border-rose/15">
                <code className="flex-1 text-xs text-dark/70 font-mono truncate select-all">
                  {weddingConfig.registry.pixKey}
                </code>
                <motion.button
                  onClick={handleCopy}
                  whileTap={{ scale: 0.85 }}
                  className={`flex-shrink-0 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-xl transition-all duration-300 ${
                    copied
                      ? 'bg-sage/20 text-sage'
                      : 'bg-rose/10 text-rose hover:bg-rose/20'
                  }`}
                  aria-label={copied ? 'Copiado!' : 'Copiar chave Pix'}
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Check size={18} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Copy size={18} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>

              {/* Copy feedback */}
              <AnimatePresence>
                {copied && (
                  <motion.div
                    initial={{ opacity: 0, y: -5, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -5, scale: 0.95 }}
                    className="absolute -bottom-8 left-0 right-0 flex items-center justify-center gap-1.5"
                  >
                    <Heart size={10} className="text-sage" fill="currentColor" />
                    <span className="text-sage text-[11px] font-sans">Chave copiada com sucesso!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
