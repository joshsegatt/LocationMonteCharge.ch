import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, ShieldCheck, Clock, MapPin, Building } from 'lucide-react';

interface QuickQuoteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickQuoteDrawer({ isOpen, onClose }: QuickQuoteDrawerProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    commune: '',
    floor: '3e étage',
    details: '',
    date: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const msg = 
`👋 Bonjour BatiMove Suisse,
Je souhaite obtenir un devis express pour un monte-charge :

• Nom / Société : ${formData.name || 'Non spécifié'}
• Téléphone : ${formData.phone || 'Non spécifié'}
• Commune : ${formData.commune || 'Genève / Vaud'}
• Étage : ${formData.floor} (Max 10e)
• Charges / Mobilier : ${formData.details || 'Mobilier standard (max 500kg)'}
• Date souhaitée : ${formData.date || 'Dès que possible'}

Merci pour votre retour rapide !`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/41767718687?text=${encoded}`, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10001] flex justify-end">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs cursor-pointer"
          />

          {/* Side Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative z-10 w-full sm:w-[440px] md:w-[480px] h-full bg-white shadow-[-15px_0_50px_rgba(5,50,41,0.22)] border-l border-slate-200/90 flex flex-col justify-between overflow-y-auto"
          >
            {/* Header in site luxury green */}
            <div className="bg-[#053229] text-white p-6 sm:p-7 relative overflow-hidden shrink-0">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#38D9BA]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between relative z-10 mb-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#38D9BA]">
                  <Clock size={14} />
                  <span>Réponse en ~15 minutes</span>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Fermer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white transition-all cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <h3 className="text-2xl font-display font-black text-white tracking-tight relative z-10">
                Devis Express WhatsApp
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed relative z-10 font-normal">
                Remplissez les détails en 30 secondes. Votre demande sera automatiquement pré-rédigée sur WhatsApp !
              </p>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSubmit} className="p-6 sm:p-7 flex-1 flex flex-col justify-between gap-4">
              <div className="space-y-3.5">
                {/* Nom */}
                <div className="space-y-1">
                  <label className="text-xs font-sans font-bold text-slate-700">
                    Votre Nom / Société <span className="text-[#053229]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="ex. Marc Keller / Régie SA"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 text-sm focus:bg-white focus:border-[#053229] focus:ring-2 focus:ring-[#053229]/15 transition-all outline-none"
                  />
                </div>

                {/* Téléphone */}
                <div className="space-y-1">
                  <label className="text-xs font-sans font-bold text-slate-700">
                    Numéro de Téléphone <span className="text-[#053229]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+41 79 000 00 00"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 text-sm focus:bg-white focus:border-[#053229] focus:ring-2 focus:ring-[#053229]/15 transition-all outline-none"
                  />
                </div>

                {/* Commune & Étage */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-sans font-bold text-slate-700 flex items-center gap-1">
                      <MapPin size={12} className="text-[#053229]" />
                      <span>Commune</span>
                    </label>
                    <input
                      type="text"
                      value={formData.commune}
                      onChange={(e) => setFormData({ ...formData, commune: e.target.value })}
                      placeholder="ex. Genève, Nyon..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 text-sm focus:bg-white focus:border-[#053229] focus:ring-2 focus:ring-[#053229]/15 transition-all outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-sans font-bold text-slate-700 flex items-center gap-1">
                      <Building size={12} className="text-[#053229]" />
                      <span>Étage (Max 10e)</span>
                    </label>
                    <select
                      value={formData.floor}
                      onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 text-sm focus:bg-white focus:border-[#053229] focus:ring-2 focus:ring-[#053229]/15 transition-all outline-none cursor-pointer"
                    >
                      <option value="Rez-de-chaussée">Rez-de-chaussée</option>
                      <option value="1er étage">1er étage</option>
                      <option value="2e étage">2e étage</option>
                      <option value="3e étage">3e étage</option>
                      <option value="4e étage">4e étage</option>
                      <option value="5e étage">5e étage</option>
                      <option value="6e étage">6e étage</option>
                      <option value="7e étage">7e étage</option>
                      <option value="8e étage">8e étage</option>
                      <option value="9e étage">9e étage</option>
                      <option value="10e étage">10e étage (Max)</option>
                    </select>
                  </div>
                </div>

                {/* Mobilier / Charges */}
                <div className="space-y-1">
                  <label className="text-xs font-sans font-bold text-slate-700">
                    Mobilier ou Matériaux (Max 500 kg)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    placeholder="ex. Canapé d'angle, baies vitrées, cuisine, 15 cartons..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 text-sm focus:bg-white focus:border-[#053229] focus:ring-2 focus:ring-[#053229]/15 transition-all outline-none resize-none"
                  />
                </div>

                {/* Date */}
                <div className="space-y-1">
                  <label className="text-xs font-sans font-bold text-slate-700">
                    Date Souhaitée
                  </label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="ex. Vendredi prochain ou Urgent"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 text-sm focus:bg-white focus:border-[#053229] focus:ring-2 focus:ring-[#053229]/15 transition-all outline-none"
                  />
                </div>
              </div>

              {/* Submit & Guarantee */}
              <div className="pt-4 space-y-3 shrink-0">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#053229] hover:bg-[#084d3f] border border-white/10 text-white font-display font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_8px_25px_rgba(5,50,41,0.35)] hover:shadow-[0_12px_35px_rgba(5,50,41,0.45)] hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <span>Ouvrir dans WhatsApp</span>
                  <Send size={16} />
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 font-medium">
                  <ShieldCheck size={13} className="text-[#053229]" />
                  <span>Sans engagement • Assurance RC 5M CHF</span>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
