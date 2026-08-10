import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, Check, AlertCircle, Sparkles, Heart, PartyPopper, MailX } from 'lucide-react';

const rsvpSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  attending: z.enum(['yes', 'no'], { required_error: 'Por favor, confirme sua presença' }),
  guestCount: z.number().min(0).max(5, 'Máximo de 5 acompanhantes'),
  dietaryRestrictions: z.string().optional(),
  message: z.string().max(150, 'Mensagem deve ter no máximo 150 caracteres').optional(),
});

type RSVPFormData = z.infer<typeof rsvpSchema>;

interface RSVPProps {
  onSubmit?: (data: RSVPFormData) => Promise<void>;
}

export function RSVP({ onSubmit }: RSVPProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [lastAttending, setLastAttending] = useState<'yes' | 'no' | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RSVPFormData>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      name: '',
      attending: undefined,
      guestCount: 0,
      dietaryRestrictions: '',
      message: '',
    },
  });

  const attending = watch('attending');
  const messageLength = watch('message')?.length || 0;

  const onSubmitHandler = async (data: RSVPFormData) => {
    setStatus('submitting');
    setLastAttending(data.attending);
    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    const isAttending = lastAttending === 'yes';

    return (
      <section id="rsvp" className="py-24 px-6 bg-gradient-to-b from-blush/30 to-cream">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-lg mx-auto text-center"
        >
          {/* Floating hearts animation */}
          <div className="relative h-32 mb-6">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50, x: (i - 2.5) * 30 }}
                animate={{
                  opacity: [0, 1, 0],
                  y: [50, -20, -60],
                  x: (i - 2.5) * 30 + (i % 2 ? 15 : -15),
                }}
                transition={{ duration: 2, delay: i * 0.2, ease: 'easeOut' }}
                className="absolute left-1/2 top-0"
              >
                <Heart size={16 + i * 2} className="text-rose/60" fill="currentColor" />
              </motion.div>
            ))}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full flex items-center justify-center border-2 ${
                isAttending ? 'bg-sage/15 border-sage/30' : 'bg-rose/10 border-rose/20'
              }`}
            >
              <Check className={`w-10 h-10 ${isAttending ? 'text-sage' : 'text-rose/70'}`} strokeWidth={2.5} />
            </motion.div>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="font-cursive italic text-4xl text-dark mb-3"
          >
            {isAttending ? 'Obrigado!' : 'Entendido!'}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="font-sans text-muted text-sm leading-relaxed max-w-sm mx-auto"
          >
            {isAttending
              ? 'Sua presença faz toda a diferença. Mal podemos esperar para celebrar este momento ao seu lado!'
              : 'Sua resposta foi registrada. Sentiremos sua falta, mas sabemos que estará conosco em pensamento. Um abraço!'}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className={`mt-6 flex items-center justify-center gap-2 ${isAttending ? 'text-rose/60' : 'text-rose/40'}`}
          >
            <Sparkles size={14} />
            <span className="text-xs font-sans uppercase tracking-wider">
              {isAttending ? 'Até lá!' : 'Fique em paz'}
            </span>
            <Sparkles size={14} />
          </motion.div>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="py-24 px-6 bg-gradient-to-b from-blush/30 to-cream">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-rose/10 mb-5">
            <Heart className="w-6 h-6 text-rose" fill="currentColor" />
          </div>
          <h2 className="font-cursive italic text-4xl md:text-5xl text-dark mb-3">Confirme sua Presença</h2>
          <p className="font-sans text-muted text-sm max-w-xs mx-auto">
            Sua presença faz toda a diferença. Responda até o dia 01/10/2026
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          onSubmit={handleSubmit(onSubmitHandler)}
          className="bg-white/70 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-rose/10 shadow-xl shadow-rose/5 space-y-6"
          noValidate
        >
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-xs font-sans text-dark/70 uppercase tracking-wider mb-2">
              Seu nome
            </label>
            <input
              id="name"
              type="text"
              {...register('name')}
              className="w-full px-4 py-3.5 rounded-xl border border-rose/20 bg-white/50 
                focus:border-rose focus:ring-2 focus:ring-rose/15 outline-none transition-all 
                font-sans text-sm text-dark placeholder:text-dark/30 min-h-[48px]"
              placeholder="Maria"
              aria-invalid={!!errors.name}
            />
            <AnimatePresence>
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-red-500 text-xs mt-2 flex items-center gap-1.5"
                  role="alert"
                >
                  <AlertCircle size={12} /> {errors.name.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Attendance — custom radio */}
          <fieldset>
            <legend className="block text-xs font-sans text-dark/70 uppercase tracking-wider mb-3">
              Você irá comparecer?
            </legend>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'yes' as const, label: 'Sim, estarei lá!', Icon: PartyPopper },
                { value: 'no' as const, label: 'Não poderei ir', Icon: MailX },
              ].map(({ value, label, Icon }) => (
                <label
                  key={value}
                  className={`relative flex flex-col items-center gap-1.5 px-4 py-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 min-h-[48px] ${
                    attending === value
                      ? value === 'yes'
                        ? 'border-sage bg-sage/8 shadow-md shadow-sage/10'
                        : 'border-rose/40 bg-rose/5 shadow-md shadow-rose/5'
                      : 'border-rose/10 bg-white/40 hover:border-rose/25 hover:bg-white/60'
                  }`}
                >
                  <input
                    type="radio"
                    {...register('attending')}
                    value={value}
                    className="sr-only"
                  />
                  <Icon size={20} className={attending === value ? (value === 'yes' ? 'text-sage' : 'text-rose') : 'text-dark/40'} strokeWidth={1.5} />
                  <span className={`text-xs font-sans font-medium ${
                    attending === value
                      ? value === 'yes' ? 'text-sage' : 'text-rose'
                      : 'text-dark/60'
                  }`}>
                    {label}
                  </span>
                  {attending === value && (
                    <motion.div
                      layoutId="attendance-check"
                      className={`absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center ${
                        value === 'yes' ? 'bg-sage' : 'bg-rose/70'
                      }`}
                    >
                      <Check size={10} className="text-white" strokeWidth={3} />
                    </motion.div>
                  )}
                </label>
              ))}
            </div>
            <AnimatePresence>
              {errors.attending && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-red-500 text-xs mt-2 flex items-center gap-1.5"
                  role="alert"
                >
                  <AlertCircle size={12} /> {errors.attending.message}
                </motion.p>
              )}
            </AnimatePresence>
          </fieldset>

          {/* Conditional fields */}
          <AnimatePresence>
            {attending === 'yes' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-5 overflow-hidden"
              >
                {/* Guest Count */}
                <div>
                  <label htmlFor="guestCount" className="block text-xs font-sans text-dark/70 uppercase tracking-wider mb-2">
                    Número de acompanhantes
                  </label>
                  <select
                    id="guestCount"
                    {...register('guestCount', { valueAsNumber: true })}
                    className="w-full px-4 py-3.5 rounded-xl border border-rose/20 bg-white/50 
                      focus:border-rose focus:ring-2 focus:ring-rose/15 outline-none transition-all 
                      font-sans text-sm text-dark min-h-[48px] appearance-none
                      bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23c9a0a0%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_12px_center] bg-no-repeat"
                  >
                    <option value={0}>Só eu mesmo(a)</option>
                    <option value={1}>+ 1 acompanhante</option>
                    <option value={2}>+ 2 acompanhantes</option>
                    <option value={3}>+ 3 acompanhantes</option>
                    <option value={4}>+ 4 acompanhantes</option>
                    <option value={5}>+ 5 acompanhantes</option>
                  </select>
                </div>

                {/* Dietary */}
                <div>
                  <label htmlFor="dietary" className="block text-xs font-sans text-dark/70 uppercase tracking-wider mb-2">
                    Restrições alimentares
                  </label>
                  <input
                    id="dietary"
                    type="text"
                    {...register('dietaryRestrictions')}
                    className="w-full px-4 py-3.5 rounded-xl border border-rose/20 bg-white/50 
                      focus:border-rose focus:ring-2 focus:ring-rose/15 outline-none transition-all 
                      font-sans text-sm text-dark placeholder:text-dark/30 min-h-[48px]"
                    placeholder="Ex: vegetariano, sem glúten, vegano..."
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Message */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="message" className="text-xs font-sans text-dark/70 uppercase tracking-wider">
                Mensagem para o casal
              </label>
              <span className={`text-[10px] tabular-nums ${messageLength > 130 ? 'text-red-500' : 'text-dark/30'}`}>
                {messageLength}/150
              </span>
            </div>
            <textarea
              id="message"
              {...register('message')}
              rows={3}
              maxLength={150}
              className="w-full px-4 py-3.5 rounded-xl border border-rose/20 bg-white/50 
                focus:border-rose focus:ring-2 focus:ring-rose/15 outline-none transition-all 
                font-sans text-sm text-dark placeholder:text-dark/30 resize-none"
              placeholder="Deixe uma mensagem carinhosa..."
              aria-invalid={!!errors.message}
            />
            <AnimatePresence>
              {errors.message && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-red-500 text-xs mt-2 flex items-center gap-1.5"
                  role="alert"
                >
                  <AlertCircle size={12} /> {errors.message.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={status === 'submitting'}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-gradient-to-r from-rose to-rose/90 text-white rounded-2xl 
              font-sans text-sm uppercase tracking-wider hover:from-rose/90 hover:to-rose/80 
              transition-all disabled:opacity-60 disabled:cursor-not-allowed 
              flex items-center justify-center gap-2.5 min-h-[52px] shadow-lg shadow-rose/20"
          >
            {status === 'submitting' ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Enviando...
              </>
            ) : (
              <>
                <Send size={16} /> Confirmar Resposta
              </>
            )}
          </motion.button>

          {status === 'error' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-xs text-center flex items-center justify-center gap-1.5"
              role="alert"
            >
              <AlertCircle size={12} /> Algo deu errado. Tente novamente.
            </motion.p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
