import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { track } from '../lib/analytics';
import { WhatsAppGlyph } from './WhatsAppGlyph';

interface QuickQuoteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const LABEL = 'block text-sm font-medium text-[#0A192F] mb-1.5';
const FIELD =
  'w-full rounded-lg border border-slate-300 bg-white px-3.5 text-base text-[#0A192F] placeholder:text-slate-400 outline-none transition-colors focus:border-[#0A192F] focus:ring-2 focus:ring-[#0052A3]/25';

const FLOORS = [
  'Rez-de-chaussée',
  '1er étage',
  '2e étage',
  '3e étage',
  '4e étage',
  '5e étage',
  '6e étage',
  '7e étage',
  '8e étage',
  '9e étage',
  '10e étage',
];

export default function QuickQuoteDrawer({ isOpen, onClose }: QuickQuoteDrawerProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    commune: '',
    floor: '3e étage',
    details: '',
    date: '',
  });

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const msg = [
      'Bonjour, je souhaite un devis pour un monte-meuble.',
      '',
      `Nom : ${formData.name || 'non précisé'}`,
      `Téléphone : ${formData.phone || 'non précisé'}`,
      `Commune : ${formData.commune || 'non précisée'}`,
      `Étage : ${formData.floor}`,
      `Objet : ${formData.details || 'non précisé'}`,
      `Date souhaitée : ${formData.date || 'dès que possible'}`,
    ].join('\n');

    const encoded = encodeURIComponent(msg);
    track('quote_whatsapp_submit', { commune: formData.commune || 'non-specifie' });
    window.open(`https://wa.me/41798896406?text=${encoded}`, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10001] flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.25, ease: [0.23, 1, 0.32, 1] } }}
            exit={{ opacity: 0, transition: { duration: 0.18, ease: 'easeOut' } }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 bg-[#0A192F]/50"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-drawer-title"
            initial={{ x: '100%' }}
            animate={{ x: 0, transition: { duration: 0.3, ease: [0.32, 0.72, 0, 1] } }}
            exit={{ x: '100%', transition: { duration: 0.2, ease: [0.32, 0.72, 0, 1] } }}
            className="relative z-10 w-full sm:w-[440px] md:w-[480px] h-full bg-white border-l border-slate-200 flex flex-col overflow-y-auto overscroll-contain"
          >
            <div className="px-6 sm:px-8 pt-6 sm:pt-8 shrink-0">
              <div className="flex items-start justify-between gap-4">
                <h2
                  id="quote-drawer-title"
                  className="font-display font-semibold text-2xl sm:text-[28px] leading-[1.1] tracking-[-0.03em] text-[#0A192F]"
                >
                  Devis sur WhatsApp
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Fermer"
                  className="-mr-2.5 -mt-1.5 w-11 h-11 rounded-lg hover:bg-[#F1F5F8] flex items-center justify-center text-[#0A192F] transition-colors"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                Remplissez ces champs. Le message s’ouvre dans WhatsApp, prêt à envoyer, et vous pouvez y ajouter une
                photo.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="px-6 sm:px-8 pt-6 pb-8 flex-1 flex flex-col gap-5">
              <div>
                <label htmlFor="quote-name" className={LABEL}>
                  Nom ou société
                </label>
                <input
                  id="quote-name"
                  name="name"
                  type="text"
                  required
                  maxLength={100}
                  autoComplete="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`${FIELD} h-12`}
                />
              </div>

              <div>
                <label htmlFor="quote-phone" className={LABEL}>
                  Téléphone
                </label>
                <input
                  id="quote-phone"
                  name="tel"
                  type="tel"
                  inputMode="tel"
                  required
                  maxLength={25}
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+41 79 000 00 00"
                  className={`${FIELD} h-12 tabular-nums`}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="quote-commune" className={LABEL}>
                    Commune
                  </label>
                  <input
                    id="quote-commune"
                    name="commune"
                    type="text"
                    autoComplete="address-level2"
                    maxLength={60}
                    value={formData.commune}
                    onChange={(e) => setFormData({ ...formData, commune: e.target.value })}
                    placeholder="Genève, Nyon"
                    className={`${FIELD} h-12`}
                  />
                </div>

                <div>
                  <label htmlFor="quote-floor" className={LABEL}>
                    Étage
                  </label>
                  <select
                    id="quote-floor"
                    name="etage"
                    value={formData.floor}
                    onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                    className={`${FIELD} h-12 cursor-pointer`}
                  >
                    {FLOORS.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="quote-details" className={LABEL}>
                  Objet à monter
                </label>
                <textarea
                  id="quote-details"
                  name="objet"
                  rows={3}
                  maxLength={400}
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="Canapé d’angle, piano, baies vitrées, matériaux"
                  className={`${FIELD} py-3 resize-none`}
                />
                <p className="mt-1.5 text-[13px] text-slate-500">Jusqu’à 500&nbsp;kg par montée.</p>
              </div>

              <div>
                <label htmlFor="quote-date" className={LABEL}>
                  Date souhaitée
                </label>
                <input
                  id="quote-date"
                  name="date"
                  type="text"
                  autoComplete="off"
                  maxLength={50}
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  placeholder="Vendredi prochain"
                  className={`${FIELD} h-12`}
                />
              </div>

              <div className="mt-auto pt-3">
                <button
                  type="submit"
                  className="press w-full inline-flex items-center justify-center gap-2.5 h-14 px-6 rounded-full bg-[#E10600] hover:bg-[#C80500] text-white text-[16px] font-semibold"
                >
                  <WhatsAppGlyph className="w-5 h-5" />
                  Ouvrir dans WhatsApp
                </button>
                <p className="mt-3 text-center text-[13px] text-slate-500">Devis gratuit et sans engagement.</p>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
