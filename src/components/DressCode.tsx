import { motion } from 'framer-motion';
import { Shirt, Palette, Check, X, GlassWater, Gem, Footprints, Ban } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const dressCodeColors = [
  { name: 'Lavanda Claro', hex: '#e8dafc', textColor: '#2c2c2c' },
  { name: 'Lavanda Suave', hex: '#d4c1f7', textColor: '#2c2c2c' },
  { name: 'Lavanda', hex: '#c4a8ff', textColor: '#2c2c2c' },
  { name: 'Lilás', hex: '#a98afb', textColor: '#ffffff' },
  { name: 'Violeta Suave', hex: '#8b6bf0', textColor: '#ffffff' },
  { name: 'Violeta Profundo', hex: '#6b4ec9', textColor: '#ffffff' },
];

interface DressCodeItem {
  Icon: LucideIcon;
  label: string;
  desc: string;
}

const allowedItems: DressCodeItem[] = [
  { Icon: Shirt, label: 'Social Leve', desc: 'Camisa manga longa, paletó casual' },
  { Icon: GlassWater, label: 'Vestido Longo', desc: 'Midi ou longo em lavanda' },
  { Icon: Footprints, label: 'Sapatos Sociais', desc: 'Saltos baixos ou anabela' },
  { Icon: Gem, label: 'Acessórios', desc: 'Dourados e pérolas são perfeitos' },
];

const forbiddenItems: DressCodeItem[] = [
  { Icon: Ban, label: 'Preto', desc: 'Reservado para outro contexto' },
  { Icon: Ban, label: 'Azul-marinho', desc: 'Fuja de tons escuros' },
  { Icon: Ban, label: 'Branco', desc: 'A noiva será a única de branco' },
  { Icon: Ban, label: 'Tênis Casual', desc: 'O evento pede elegância' },
];

export function DressCode() {
  return (
    <section id="dresscode" className="py-24 px-6">
      <div className="max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-rose/10 mb-5">
            <Shirt className="w-6 h-6 text-rose" />
          </div>
          <h2 className="font-cursive italic text-4xl md:text-5xl text-dark mb-3">Código de Vestimenta</h2>
          <p className="font-sans text-muted text-sm max-w-xs mx-auto">
            Ajude-nos a preservar a harmonia visual: estes tons foram reservados para os padrinhos.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white/70 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-gold/10 shadow-lg shadow-gold/5 mb-5"
        >
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-8 h-8 rounded-full bg-rose/10 flex items-center justify-center">
              <Palette size={14} className="text-rose" />
            </div>
            <h3 className="font-serif text-lg text-dark">Paleta Exclusiva dos Padrinhos</h3>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {dressCodeColors.map((color, i) => (
              <motion.div
                key={color.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
                whileHover={{ scale: 1.08, y: -2 }}
                className="aspect-square rounded-2xl flex flex-col items-center justify-center 
                  shadow-md border border-white/80 cursor-default transition-shadow hover:shadow-lg"
                style={{ backgroundColor: color.hex }}
              >
                <span
                  className="text-xs font-sans font-semibold text-center px-1 leading-tight"
                  style={{ color: color.textColor }}
                >
                  {color.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/70 backdrop-blur-md rounded-3xl p-6 border border-sage/15 shadow-lg shadow-sage/5"
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="w-7 h-7 rounded-full bg-sage/15 flex items-center justify-center">
                <Check size={13} className="text-sage" strokeWidth={3} />
              </div>
              <h4 className="font-serif text-base text-dark">Ideal</h4>
            </div>

            <div className="space-y-3">
              {allowedItems.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sage/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <item.Icon size={16} className="text-sage/70" strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className="font-sans text-sm text-dark font-medium block">{item.label}</span>
                    <span className="font-sans text-xs text-muted">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/70 backdrop-blur-md rounded-3xl p-6 border border-rose/10 shadow-lg shadow-rose/5"
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="w-7 h-7 rounded-full bg-rose/10 flex items-center justify-center">
                <X size={13} className="text-rose" strokeWidth={3} />
              </div>
              <h4 className="font-serif text-base text-dark">Evitar</h4>
            </div>

            <div className="space-y-3">
              {forbiddenItems.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-rose/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <item.Icon size={16} className="text-rose/50" strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className="font-sans text-sm text-dark font-medium block">{item.label}</span>
                    <span className="font-sans text-xs text-muted">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-5 bg-gradient-to-r from-champagne/30 to-gold/10 rounded-3xl p-5 border border-gold/15"
        >
          <p className="font-sans text-xs text-dark/70 leading-relaxed text-center">
            <strong className="text-dark/80">Dica do casal:</strong> Convidados, pedimos carinho ao escolher outras cores, evitando lavanda, lilás e violeta.
            Acessórios prateados ou dourados são muito bem-vindos! Em caso de dúvida, entre em contato 
            conosco — teremos prazer em ajudar.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
