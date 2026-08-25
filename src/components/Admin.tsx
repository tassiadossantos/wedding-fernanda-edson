import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, LogOut, Users, UserCheck, UserX, UtensilsCrossed, MessageSquare, Calendar, Heart, ClipboardList, Eye, EyeOff } from 'lucide-react';
import { getRSVPEntries, type RSVPEntry } from '../lib/rsvp';

const ADMIN_PASSWORD = 'FernandaEdson0210';

type Filter = 'all' | 'yes' | 'no';

export function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('admin_auth') === 'true';
  });
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [entries, setEntries] = useState<RSVPEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    if (!isAuthenticated) return;

    async function loadEntries() {
      setIsLoading(true);
      try {
        const data = await getRSVPEntries();
        setEntries(data);
      } catch {
        console.error('Erro ao carregar RSVPs');
      } finally {
        setIsLoading(false);
      }
    }

    loadEntries();
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
      setPasswordError(false);
    } else {
      setPasswordError(true);
      setPassword('');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
    setEntries([]);
  };

  const filtered = entries.filter((e) => {
    if (filter === 'all') return true;
    return e.attending === filter;
  });

  const attendingCount = entries.filter((e) => e.attending === 'yes').length;
  const notAttendingCount = entries.filter((e) => e.attending === 'no').length;
  const totalGuests = entries.reduce((sum, e) => sum + (e.attending === 'yes' ? 1 + e.guestCount : 0), 0);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blush/30 to-cream flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-sm"
        >
          <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-rose/10 shadow-xl shadow-rose/5">
            {/* Decorative icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose/10 mb-6 mx-auto">
              <Lock className="w-7 h-7 text-rose" />
            </div>

            <h1 className="font-cursive italic text-4xl md:text-5xl text-dark text-center mb-3">Área Restrita</h1>
            <p className="font-sans text-sm text-muted text-center mb-10 max-w-xs mx-auto leading-relaxed">
              Controle de Presenças
            </p>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label htmlFor="admin-password" className="block text-xs font-sans text-dark/70 uppercase tracking-wider mb-2 text-center">
                  Senha de acesso
                </label>
                <div className="relative">
                  <input
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setPasswordError(false); }}
                    placeholder="Digite a senha"
                    autoFocus
                    className="w-full px-4 py-3.5 rounded-xl border border-rose/20 bg-white/50 
                      focus:border-rose focus:ring-2 focus:ring-rose/15 outline-none transition-all 
                      font-sans text-sm text-dark placeholder:text-dark/30 min-h-[48px] text-center tracking-widest pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg 
                      text-dark/40 hover:text-dark/70 hover:bg-rose/10 transition-all min-w-[40px] min-h-[40px] 
                      flex items-center justify-center"
                    aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <AnimatePresence>
                  {passwordError && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-rose text-xs text-center mt-2 font-sans"
                    >
                      Senha incorreta. Tente novamente.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-sage to-sage/90 text-white rounded-2xl
                  font-sans text-sm uppercase tracking-wider hover:from-sage/90 hover:to-sage/80
                  transition-all min-h-[52px] shadow-lg shadow-sage/20"
              >
                Entrar
              </motion.button>
            </form>

            {/* Decorative hearts */}
            <div className="flex items-center justify-center gap-2 mt-8 text-rose/30">
              <Heart size={12} fill="currentColor" />
              <div className="w-8 h-px bg-rose/20" />
              <Heart size={8} fill="currentColor" />
              <div className="w-8 h-px bg-rose/20" />
              <Heart size={12} fill="currentColor" />
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blush/30 to-cream">
      {/* Hero-style header */}
      <div className="py-16 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose/10 mb-6">
            <ClipboardList className="w-7 h-7 text-rose" />
          </div>
          <h1 className="font-cursive italic text-4xl md:text-5xl text-dark mb-3">Painel Admin</h1>
          <p className="font-sans text-sm text-muted max-w-xs mx-auto leading-relaxed">
            Controle de Presenças
          </p>
        </motion.div>

        {/* Logout button */}
        <motion.button
          onClick={handleLogout}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-sm 
            text-rose font-sans text-xs uppercase tracking-wider border border-rose/20 
            hover:bg-rose/10 transition-all min-h-[44px]"
        >
          <LogOut size={14} />
          Sair
        </motion.button>
      </div>

      <div className="max-w-lg mx-auto px-6 pb-24">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-3 gap-3 mb-8"
        >
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-3 md:p-5 border border-sage/15 shadow-lg shadow-sage/5 text-center">
            <div className="inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-sage/10 mb-2 md:mb-3">
              <UserCheck size={16} className="text-sage" />
            </div>
            <p className="font-serif text-2xl md:text-3xl text-dark">{attendingCount}</p>
            <p className="font-sans text-[10px] md:text-xs text-muted uppercase tracking-wider mt-1">Vão</p>
          </div>
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-3 md:p-5 border border-rose/15 shadow-lg shadow-rose/5 text-center">
            <div className="inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-rose/10 mb-2 md:mb-3">
              <UserX size={16} className="text-rose" />
            </div>
            <p className="font-serif text-2xl md:text-3xl text-dark">{notAttendingCount}</p>
            <p className="font-sans text-[10px] md:text-xs text-muted uppercase tracking-wider mt-1">Não vão</p>
          </div>
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-3 md:p-5 border border-gold/15 shadow-lg shadow-gold/5 text-center">
            <div className="inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-gold/10 mb-2 md:mb-3">
              <Users size={16} className="text-gold" />
            </div>
            <p className="font-serif text-2xl md:text-3xl text-dark">{totalGuests}</p>
            <p className="font-sans text-[10px] md:text-xs text-muted uppercase tracking-wider mt-1">Total</p>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex gap-2.5 mb-8"
        >
          {([
            { key: 'all', label: 'Todos' },
            { key: 'yes', label: 'Vão' },
            { key: 'no', label: 'Não vão' },
          ] as const).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`flex-1 py-3.5 rounded-xl font-sans text-xs uppercase tracking-wider 
                transition-all min-h-[48px] ${
                  filter === key
                    ? 'bg-gradient-to-r from-sage to-sage/90 text-white shadow-lg shadow-sage/20'
                    : 'bg-white/70 backdrop-blur-sm text-muted hover:bg-white border border-rose/10 hover:border-rose/20'
                }`}
            >
              {label}
            </button>
          ))}
        </motion.div>

        {/* Entries */}
        {isLoading ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose/10 mb-4">
              <Heart size={20} className="text-rose animate-pulse" />
            </div>
            <p className="font-sans text-sm text-muted">Carregando confirmações...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-rose/10 mb-4">
              <Heart size={22} className="text-rose/40" />
            </div>
            <p className="font-sans text-sm text-muted">
              {filter === 'all' ? 'Nenhuma confirmação ainda' : 'Nenhum resultado nesta aba'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {filtered.map((entry, i) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={`bg-white/70 backdrop-blur-md rounded-3xl p-6 border shadow-lg ${
                    entry.attending === 'yes'
                      ? 'border-sage/15 shadow-sage/5'
                      : 'border-rose/15 shadow-rose/5'
                  }`}
                >
                  {/* Name + Badge */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="font-serif text-lg text-dark font-medium truncate">
                      {entry.name}
                    </span>
                    <span
                      className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-sans 
                        uppercase tracking-wider font-medium ${
                          entry.attending === 'yes'
                            ? 'bg-sage/15 text-sage border border-sage/20'
                            : 'bg-rose/15 text-rose border border-rose/20'
                        }`}
                    >
                      {entry.attending === 'yes' ? 'Vai comparecer' : 'Não vai'}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="space-y-2.5 text-sm font-sans text-muted">
                    {entry.attending === 'yes' && entry.guestCount > 0 && (
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-sage/10 flex items-center justify-center flex-shrink-0">
                          <Users size={14} className="text-sage/70" />
                        </div>
                        <span>{entry.guestCount} acompanhante{entry.guestCount > 1 ? 's' : ''}</span>
                      </div>
                    )}

                    {entry.attending === 'yes' && entry.dietaryRestrictions && (
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                          <UtensilsCrossed size={14} className="text-gold/70" />
                        </div>
                        <span>{entry.dietaryRestrictions}</span>
                      </div>
                    )}

                    {entry.message && (
                      <div className="mt-4 pt-4 border-t border-rose/10">
                        <div className="flex items-center gap-2 mb-2">
                          <MessageSquare size={12} className="text-dark/40" />
                          <span className="text-xs text-dark/50 uppercase tracking-wider">Mensagem</span>
                        </div>
                        <p className="font-serif text-sm text-dark/70 leading-relaxed italic pl-5 border-l-2 border-rose/20">
                          "{entry.message}"
                        </p>
                      </div>
                    )}

                    <div className="flex items-center gap-2 pt-2">
                      <Calendar size={12} className="text-dark/40" />
                      <span className="text-xs">{entry.timestamp.toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Footer decoration */}
        <div className="flex items-center justify-center gap-2 mt-12 text-rose/30">
          <Heart size={10} fill="currentColor" />
          <div className="w-6 h-px bg-rose/20" />
          <Heart size={8} fill="currentColor" />
          <div className="w-6 h-px bg-rose/20" />
          <Heart size={10} fill="currentColor" />
        </div>
      </div>
    </div>
  );
}
