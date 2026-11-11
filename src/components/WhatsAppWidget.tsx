import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { track } from '../lib/analytics';
import { WhatsAppGlyph } from './WhatsAppGlyph';

const WA_BASE = 'https://wa.me/41798896406?text=';

const SITUATIONS = [
  {
    label: 'Déménagement particulier',
    text: 'Bonjour BatiMove, je souhaite un devis monte-meuble pour un déménagement.',
  },
  {
    label: 'Chantier ou rénovation',
    text: "Bonjour BatiMove, je suis un professionnel et j'ai besoin d'un monte-charge pour un chantier.",
  },
  {
    label: 'Demande urgente',
    text: "Bonjour BatiMove, ma demande est urgente : j'ai besoin d'un monte-meuble rapidement.",
  },
];

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMsg, setUserMsg] = useState('');
  const [hasOpened, setHasOpened] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > 520);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
    track('whatsapp_widget_send');
    window.open(`${WA_BASE}${finalMsg}`, '_blank', 'noopener,noreferrer');
    setUserMsg('');
  };

  return (
    <div ref={widgetRef} className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[9999] flex flex-col items-end transition-opacity duration-200 ${pastHero || isOpen ? '' : 'max-sm:opacity-0 max-sm:pointer-events-none'}`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-labelledby="wa-widget-title"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] } }}
            exit={{ opacity: 0, y: 6, scale: 0.98, transition: { duration: 0.12, ease: 'easeOut' } }}
            style={{ transformOrigin: 'bottom right' }}
            className="mb-3 w-[calc(100vw-3rem)] sm:w-[360px] max-w-[360px] rounded-xl bg-white shadow-[0_0_0_1px_rgba(10,25,47,0.08),0_18px_44px_-14px_rgba(10,25,47,0.35)] font-sans"
          >
            <div className="px-5 pt-5 flex items-start justify-between gap-4">
              <div>
                <h3
                  id="wa-widget-title"
                  className="font-display font-semibold text-lg leading-tight tracking-[-0.02em] text-[#0A192F]"
                >
                  Écrire à BatiMove
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                  Choisissez votre situation ou écrivez votre message. La conversation s’ouvre dans WhatsApp.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Fermer"
                className="-mr-2.5 -mt-2 shrink-0 w-10 h-10 rounded-lg hover:bg-[#F1F5F8] flex items-center justify-center text-[#0A192F] transition-colors"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <ul className="mt-4 mx-5 border-t border-slate-200">
              {SITUATIONS.map((s) => (
                <li key={s.label} className="border-b border-slate-200">
                  <a
                    href={`${WA_BASE}${encodeURIComponent(s.text)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block py-3 text-base font-medium text-[#0A192F] hover:text-[#0052A3] transition-colors"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>

            <form onSubmit={handleSendMessage} className="p-5 pt-4 flex items-center gap-2">
              <label htmlFor="wa-widget-message" className="sr-only">
                Votre message
              </label>
              <input
                id="wa-widget-message"
                name="message"
                type="text"
                autoComplete="off"
                value={userMsg}
                onChange={(e) => setUserMsg(e.target.value)}
                maxLength={500}
                placeholder="Votre message"
                className="flex-1 min-w-0 h-11 px-3.5 rounded-lg border border-slate-300 bg-white text-base sm:text-[15px] text-[#0A192F] placeholder:text-slate-400 outline-none transition-colors focus:border-[#0A192F] focus:ring-2 focus:ring-[#0052A3]/25"
              />
              <button
                type="submit"
                className="press shrink-0 h-11 px-4 rounded-lg bg-[#0A192F] hover:bg-[#0F2440] text-white text-[15px] font-semibold"
              >
                Envoyer
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        <AnimatePresence>
          {!isOpen && !hasOpened && (
            <motion.button
              type="button"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0, transition: { delay: 2.5, duration: 0.25, ease: [0.23, 1, 0.32, 1] } }}
              exit={{ opacity: 0, transition: { duration: 0.1, ease: 'easeOut' } }}
              onClick={handleToggle}
              className="absolute right-[72px] top-1/2 -translate-y-1/2 bg-white text-[#0A192F] h-10 px-3.5 rounded-lg shadow-[0_0_0_1px_rgba(10,25,47,0.08),0_8px_24px_-8px_rgba(10,25,47,0.3)] text-sm font-semibold whitespace-nowrap hidden sm:block"
            >
              Besoin d’un monte-meuble&#8239;?
            </motion.button>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={handleToggle}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Fermer WhatsApp' : 'Écrire à BatiMove sur WhatsApp'}
          className="press w-14 h-14 rounded-full bg-[#1FAF5A] hover:bg-[#178F49] flex items-center justify-center text-white shadow-[0_8px_24px_-6px_rgba(10,25,47,0.45)]"
        >
          {isOpen ? <X size={24} aria-hidden="true" /> : <WhatsAppGlyph className="w-7 h-7" />}
        </button>
      </div>
    </div>
  );
}
