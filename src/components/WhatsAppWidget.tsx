import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, ArrowUpRight, CheckCheck } from 'lucide-react';
import { MCLogo } from './MCLogo';

// --- Official WhatsApp Vector Icon ---
const WhatsAppIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    aria-hidden="true"
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMsg, setUserMsg] = useState('');
  const [hasOpened, setHasOpened] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!hasOpened) setHasOpened(true);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const finalMsg = userMsg.trim() 
      ? encodeURIComponent(userMsg.trim())
      : encodeURIComponent('Bonjour BatiMove, je souhaite obtenir un devis pour une intervention monte-meuble.');
    window.open(`https://wa.me/41767718687?text=${finalMsg}`, '_blank', 'noopener,noreferrer');
    setUserMsg('');
  };

  const quickChips = [
    {
      label: '📦 Déménagement particulier',
      text: 'Bonjour BatiMove, je souhaite un devis monte-meuble pour un déménagement.'
    },
    {
      label: '🏗️ Chantier / Pro / Rénovation',
      text: "Bonjour BatiMove, je suis un professionnel et j'ai besoin d'un monte-charge pour un chantier."
    },
    {
      label: '⚡ Intervention Urgente (24/48h)',
      text: "URGENT - Bonjour BatiMove, j'ai besoin d'une intervention monte-meuble rapide."
    }
  ];

  return (
    <div ref={widgetRef} className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[9999] flex flex-col items-end pointer-events-auto">
      {/* WhatsApp Chat Balloon / Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.92, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.92 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="mb-3 w-[calc(100vw-2.5rem)] sm:w-[380px] max-w-[380px] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.25),0_0_1px_rgba(0,0,0,0.1)] border border-slate-200/90 bg-[#EFEAE2] flex flex-col font-sans"
            style={{
              backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, transparent 100%)'
            }}
          >
            {/* Balloon Header */}
            <div className="bg-[#053229] text-white p-4 flex items-center justify-between shadow-md relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-[#053229]/20 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex items-center gap-3 relative z-10">
                <div className="relative">
                  <div className="w-11 h-11 rounded-full bg-white/10 border border-white/20 p-1 flex items-center justify-center backdrop-blur-sm shadow-inner">
                    <MCLogo size={30} />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#00A388] border-2 border-[#053229] rounded-full animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-display font-bold text-sm tracking-tight text-white leading-tight">BatiMove Suisse</h3>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#00A388]/30 text-[#38D9BA] border border-[#00A388]/40 uppercase tracking-wider">Officiel</span>
                  </div>
                  <p className="text-[11px] text-white/80 font-normal flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38D9BA]" /> En ligne • Réponse en ~10 min
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white/90 hover:text-white transition-all cursor-pointer relative z-10"
                aria-label="Fermer la discussion WhatsApp"
              >
                <X size={16} />
              </button>
            </div>

            {/* Balloon Body / Message Thread */}
            <div className="p-4 space-y-3 max-h-[380px] overflow-y-auto">
              {/* Date pill */}
              <div className="flex justify-center">
                <span className="px-3 py-1 rounded-full bg-white/70 backdrop-blur-xs text-[10px] font-medium text-slate-500 shadow-2xs border border-slate-200/50">
                  Aujourd'hui
                </span>
              </div>

              {/* Bot / Agent message bubble */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl rounded-tl-xs p-3.5 shadow-sm border border-slate-200/60 max-w-[92%] space-y-1 relative"
              >
                <p className="text-xs text-slate-800 leading-relaxed font-normal">
                  Bonjour ! 👋 Bienvenue chez <strong>BatiMove Suisse</strong>.
                </p>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Besoin d'un monte-meuble avec opérateur qualifié à Genève, Vaud ou en Suisse Romande ?
                </p>
                <div className="flex items-center justify-end gap-1 pt-1 text-[10px] text-slate-400">
                  <span>À l'instant</span>
                  <CheckCheck size={13} className="text-[#34B7F1]" />
                </div>
              </motion.div>

              {/* Quick suggestion prompt */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/90 rounded-xl p-2.5 shadow-2xs border border-slate-200/60 text-[11px] text-slate-600"
              >
                💡 <span className="font-medium text-slate-800">Sélectionnez votre situation :</span>
                <div className="mt-2 flex flex-col gap-1.5">
                  {quickChips.map((chip, idx) => (
                    <a
                      key={idx}
                      href={`https://wa.me/41767718687?text=${encodeURIComponent(chip.text)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-lg bg-slate-50 hover:bg-[#053229] hover:text-white border border-slate-200/80 text-slate-700 text-xs font-medium transition-all flex items-center justify-between group active:scale-[0.99] cursor-pointer"
                    >
                      <span>{chip.label}</span>
                      <ArrowUpRight size={13} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Balloon Input & Send Bar */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-200/80 flex items-center gap-2">
              <input
                type="text"
                value={userMsg}
                onChange={(e) => setUserMsg(e.target.value)}
                placeholder="Écrire un message WhatsApp..."
                className="flex-1 px-3.5 py-2.5 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#053229] focus:bg-white transition-all font-sans"
              />
              <button
                type="submit"
                className="w-10 h-10 rounded-full bg-[#053229] hover:bg-[#084d3f] active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer shadow-sm shrink-0"
                aria-label="Envoyer sur WhatsApp"
                title="Démarrer la discussion WhatsApp"
              >
                <Send size={15} className="ml-0.5" />
              </button>
            </form>

            <div className="px-3 py-1.5 bg-slate-50 border-t border-slate-100 text-center">
              <p className="text-[10px] text-slate-400 font-sans">
                🔒 Échanges chiffrés • Tarification claire sans frais cachés
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <div className="relative">
        {/* Subtle greeting pill before first open */}
        <AnimatePresence>
          {!isOpen && !hasOpened && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.9 }}
              transition={{ delay: 2.5, type: 'spring' }}
              onClick={handleToggle}
              className="absolute right-16 top-1/2 -translate-y-1/2 bg-white text-slate-900 px-3.5 py-2 rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.12)] border border-slate-200/80 text-xs font-semibold whitespace-nowrap cursor-pointer hover:bg-slate-50 transition-colors flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-[#00876c] animate-ping" />
              <span>Besoin d'un monte-charge ?</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={handleToggle}
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#034d3f] via-[#00876c] to-[#02b38e] hover:from-[#045c4c] hover:via-[#009b7c] hover:to-[#0fd6ab] flex items-center justify-center shadow-[0_10px_30px_rgba(0,135,108,0.5),0_2px_8px_rgba(0,0,0,0.15)] ring-4 ring-emerald-400/20 border-2 border-white cursor-pointer group transition-all duration-300"
          aria-label={isOpen ? 'Fermer WhatsApp' : 'Ouvrir WhatsApp BatiMove'}
        >
          {/* Subtle radar pulse ring */}
          <div className="absolute inset-0 rounded-full bg-emerald-400/40 opacity-30 group-hover:opacity-60 pointer-events-none" style={{ animation: 'ping 1.5s cubic-bezier(0,0,0.2,1) infinite' }} />

          {/* Unread badge if never opened and closed */}
          {!isOpen && !hasOpened && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#E10600] text-white text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-md z-20">
              1
            </span>
          )}

          {isOpen ? (
            <X size={26} className="text-white relative z-10 transition-transform duration-200" />
          ) : (
            <WhatsAppIcon size={30} className="text-white relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)] transition-transform duration-200 group-hover:scale-110" />
          )}
        </motion.button>
      </div>
    </div>
  );
}

