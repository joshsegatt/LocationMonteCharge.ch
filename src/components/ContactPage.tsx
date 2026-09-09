import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, MapPin, Send, CheckCircle2, Clock, Navigation, ExternalLink } from 'lucide-react';
import { AppleAestheticBackdrop } from './AppleAestheticBackdrop';

export default function ContactPage({ navigateTo }: { navigateTo: (page: 'home' | 'contact') => void }) {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  return (
    <motion.main 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="min-h-screen bg-[#F7FAF9] pt-24 sm:pt-28 lg:pt-28 pb-10 sm:pb-14 px-4 sm:px-6 md:px-10 lg:px-14 relative flex flex-col justify-between overflow-x-hidden select-none"
    >
      <AppleAestheticBackdrop />

      {/* Atmospheric Luxury Green Ambient Lighting & Depth Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-[radial-gradient(ellipse_at_top,rgba(5,50,41,0.14),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-[radial-gradient(circle_at_bottom_right,rgba(5,50,41,0.09),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 technical-grid opacity-[0.025] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex-1 flex flex-col justify-between py-2 sm:py-3">
        
        {/* Header - Compact Luxury Stage */}
        <div className="mb-4 sm:mb-6 text-center lg:text-left shrink-0">
          <p className="text-[#053229] text-xs sm:text-[13px] font-bold uppercase tracking-[0.18em] mb-1.5 font-sans">
            Coordination Suisse • Intervention Rapide
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black tracking-tight text-slate-950 leading-tight">
              Dossier De Mission <span className="text-[#053229]">& Contact</span>
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm font-normal max-w-lg lg:text-right">
              Coordination certifiée à Genève & Vaud. Réponse technique sous 2 heures ouvrées.
            </p>
          </div>
        </div>

        {/* 2-Column Command Center (Fixed Fit on Desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-stretch flex-1 min-h-0">
          
          {/* Left Column: Fast Contacts & Next-Gen Interactive Map */}
          <div className="lg:col-span-5 flex flex-col gap-3 sm:gap-3.5 h-full min-h-0">
            
            {/* 3 Compact Direct Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2.5 sm:gap-3 shrink-0">
              
              {/* Phone Free */}
              <a href="tel:0800825925" className="block group cursor-pointer">
                <div className="p-3.5 sm:p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/90 hover:border-[#053229]/50 transition-all duration-300 flex items-center gap-3.5 shadow-[0_4px_20px_rgba(5,50,41,0.04)] hover:shadow-[0_10px_30px_rgba(5,50,41,0.12)] hover:-translate-y-0.5">
                  <div className="w-10 h-10 rounded-xl bg-[#053229]/[0.06] group-hover:bg-[#053229] group-hover:text-white transition-all duration-300 flex items-center justify-center text-[#053229] shrink-0">
                    <Phone size={18} strokeWidth={2} />
                  </div>
                  <div className="space-y-0.5 overflow-hidden">
                    <span className="text-[10px] text-[#053229] font-bold tracking-wider uppercase block">Ligne Gratuite 24/7</span>
                    <h3 className="text-base font-display font-bold text-slate-950 group-hover:text-[#053229] transition-colors truncate">
                      0800 825 925
                    </h3>
                  </div>
                </div>
              </a>

              {/* Direct Support & WhatsApp */}
              <a href="tel:0767718687" className="block group cursor-pointer">
                <div className="p-3.5 sm:p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/90 hover:border-[#053229]/50 transition-all duration-300 flex items-center gap-3.5 shadow-[0_4px_20px_rgba(5,50,41,0.04)] hover:shadow-[0_10px_30px_rgba(5,50,41,0.12)] hover:-translate-y-0.5">
                  <div className="w-10 h-10 rounded-xl bg-[#053229]/[0.06] group-hover:bg-[#053229] group-hover:text-white transition-all duration-300 flex items-center justify-center text-[#053229] shrink-0">
                    <Phone size={18} strokeWidth={2} />
                  </div>
                  <div className="space-y-0.5 overflow-hidden">
                    <span className="text-[10px] text-[#053229] font-bold tracking-wider uppercase block">Support Direct & WhatsApp</span>
                    <h3 className="text-base font-display font-bold text-slate-950 group-hover:text-[#053229] transition-colors truncate">
                      076 771 86 87
                    </h3>
                  </div>
                </div>
              </a>

              {/* Email */}
              <a href="mailto:info@batimove.ch" className="block group cursor-pointer">
                <div className="p-3.5 sm:p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/90 hover:border-[#053229]/50 transition-all duration-300 flex items-center gap-3.5 shadow-[0_4px_20px_rgba(5,50,41,0.04)] hover:shadow-[0_10px_30px_rgba(5,50,41,0.12)] hover:-translate-y-0.5">
                  <div className="w-10 h-10 rounded-xl bg-[#053229]/[0.06] group-hover:bg-[#053229] group-hover:text-white transition-all duration-300 flex items-center justify-center text-[#053229] shrink-0">
                    <Mail size={18} strokeWidth={2} />
                  </div>
                  <div className="space-y-0.5 overflow-hidden">
                    <span className="text-[10px] text-[#053229] font-bold tracking-wider uppercase block">Communication Officielle</span>
                    <h3 className="text-base font-display font-bold text-slate-950 group-hover:text-[#053229] transition-colors truncate">
                      info@batimove.ch
                    </h3>
                  </div>
                </div>
              </a>

            </div>

            {/* Next-Gen Fully Interactive Custom Map Card */}
            <div className="flex-1 min-h-[200px] lg:min-h-0 bg-white/95 rounded-2xl border border-slate-200/90 overflow-hidden relative shadow-[0_8px_30px_rgba(5,50,41,0.06)] hover:shadow-[0_14px_40px_rgba(5,50,41,0.12)] transition-all duration-300 flex flex-col group">
              
              {/* Map Viewport - Fully Interactive (pan, zoom, click) */}
              <div className="relative w-full flex-1 min-h-[170px] overflow-hidden">
                <iframe 
                  title="Carte Interactive BatiMove Sàrl Genève"
                  src="https://maps.google.com/maps?q=Rue%20De-MONTHOUX%2064,%201201%20Gen%C3%A8ve&t=m&z=15&ie=UTF8&iwloc=B&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full border-0 filter saturate-[1.1] contrast-[1.02]"
                />

                {/* Interactive Action Pill on Map */}
                <div className="absolute top-3 left-3 z-10">
                  <a 
                    href="https://www.google.com/maps/dir/?api=1&destination=Rue+De-MONTHOUX+64,+1201+Genève" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-[#053229] text-white text-[11px] font-bold tracking-wider uppercase shadow-lg hover:bg-[#084d3f] transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <Navigation size={12} className="text-[#38D9BA]" />
                    <span>Itinéraire GPS</span>
                    <ExternalLink size={11} className="opacity-70" />
                  </a>
                </div>

                {/* Pulse Pin Indicator */}
                <div className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-200 text-[10px] font-bold text-[#053229] flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#38D9BA] animate-ping" />
                  <span>Genève Centre</span>
                </div>
              </div>

              {/* Bottom Address Bar */}
              <div className="p-3 sm:p-3.5 bg-white border-t border-slate-100 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2 overflow-hidden">
                  <MapPin size={15} className="text-[#053229] shrink-0" />
                  <p className="text-xs text-slate-800 font-bold truncate">
                    Rue De-Monthoux 64, 1201 Genève
                  </p>
                </div>
                <span className="font-mono text-[11px] text-slate-500 font-semibold shrink-0 ml-2">
                  CHE-143.091.230
                </span>
              </div>

            </div>

          </div>

          {/* Right Column: Mission Form (Self-Contained Luxury Card) */}
          <div className="lg:col-span-7 h-full flex flex-col min-h-0">
            <div className="rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 p-5 sm:p-7 lg:p-8 shadow-[0_12px_45px_rgba(5,50,41,0.08)] h-full flex flex-col justify-between relative overflow-hidden">
              
              {/* Subtle green ambient accent line on top of form */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#053229] to-transparent" />

              <AnimatePresence mode="wait">
                {formStatus === 'success' ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center p-6 text-center space-y-4 my-auto"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-[#053229]/10 text-[#053229] flex items-center justify-center shadow-inner">
                      <CheckCircle2 size={36} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-2xl font-display font-bold text-slate-950 tracking-tight">
                        Dossier Transmis avec Succès
                      </h3>
                      <p className="text-slate-600 text-sm font-medium max-w-md">
                        Un coordinateur technique BatiMove Sàrl analyse vos accès et vous contactera sous 2 heures ouvrées.
                      </p>
                    </div>
                    <button 
                      onClick={() => setFormStatus('idle')}
                      className="px-6 py-2.5 rounded-lg bg-[#053229] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#084d3f] transition-all cursor-pointer shadow-md"
                    >
                      Nouvelle Demande
                    </button>
                  </motion.div>
                ) : (
                  <div className="h-full flex flex-col justify-between">
                    
                    {/* Form Header */}
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4 shrink-0">
                      <div>
                        <h2 className="text-lg sm:text-xl font-display font-bold text-slate-950 tracking-tight">
                          Formulaire D'Intervention
                        </h2>
                        <p className="text-[11px] text-slate-500 font-medium">
                          Spécifications techniques pour devis immédiat
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-[#053229] font-bold bg-[#053229]/[0.05] px-2.5 py-1 rounded-md">
                        <Clock size={13} />
                        <span>Réponse sous 2h</span>
                      </div>
                    </div>
                    
                    {/* Form Fields */}
                    <form 
                      className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 flex-1" 
                      onSubmit={async (e) => {
                        e.preventDefault();
                        setFormStatus('sending');
                        const formData = new FormData(e.currentTarget);
                        try {
                          const res = await fetch('https://formspree.io/f/xgorrdkg', {
                            method: 'POST',
                            body: formData,
                            headers: { 'Accept': 'application/json' }
                          });
                          if (res.ok) setFormStatus('success');
                          else setFormStatus('idle');
                        } catch {
                          setFormStatus('idle');
                        }
                      }}
                    >
                      <div className="space-y-1">
                        <label className="text-[11px] sm:text-xs font-sans text-slate-700 font-bold ml-0.5">
                          Votre Nom / Société
                        </label>
                        <input 
                          name="name" 
                          required 
                          type="text" 
                          className="w-full bg-slate-50/80 border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-slate-900 focus:bg-white focus:border-[#053229] focus:ring-2 focus:ring-[#053229]/15 transition-all outline-none text-base sm:text-sm placeholder:text-slate-400 font-normal" 
                          placeholder="ex. Jean Dupont / Régie Immobilière SA" 
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] sm:text-xs font-sans text-slate-700 font-bold ml-0.5">
                          Téléphone Direct
                        </label>
                        <input
                          name="phone"
                          required
                          type="tel"
                          pattern="[\+]?[\d\s\-\(\)]{8,20}"
                          title="Format attendu: +41 79 000 00 00 ou 0800 000 000"
                          className="w-full bg-slate-50/80 border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-slate-900 focus:bg-white focus:border-[#053229] focus:ring-2 focus:ring-[#053229]/15 transition-all outline-none text-base sm:text-sm placeholder:text-slate-400 font-normal"
                          placeholder="+41 79 000 00 00"
                        />
                      </div>

                      <div className="col-span-1 md:col-span-2 space-y-1">
                        <label className="text-[11px] sm:text-xs font-sans text-slate-700 font-bold ml-0.5">
                          Adresse Email
                        </label>
                        <input
                          name="email"
                          required
                          type="email"
                          className="w-full bg-slate-50/80 border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-slate-900 focus:bg-white focus:border-[#053229] focus:ring-2 focus:ring-[#053229]/15 transition-all outline-none text-base sm:text-sm placeholder:text-slate-400 font-normal"
                          placeholder="votre.email@domaine.ch"
                        />
                      </div>

                      <div className="col-span-1 md:col-span-2 space-y-1 flex-1 flex flex-col">
                        <label className="text-[11px] sm:text-xs font-sans text-slate-700 font-bold ml-0.5">
                          Détails de la Manœuvre (Commune, Étage, Nature des charges)
                        </label>
                        <textarea 
                          name="message" 
                          required 
                          className="w-full flex-1 min-h-[90px] lg:min-h-0 bg-slate-50/80 border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-slate-900 focus:bg-white focus:border-[#053229] focus:ring-2 focus:ring-[#053229]/15 transition-all outline-none text-base sm:text-sm resize-none placeholder:text-slate-400 font-normal" 
                          placeholder="Précisez la commune, l'étage (max. 10e niveau), le volume ou poids (max. 500kg) et la date souhaitée..." 
                        />
                      </div>

                      <div className="col-span-1 md:col-span-2 pt-1 shrink-0">
                        <button 
                          disabled={formStatus === 'sending'}
                          className="w-full bg-[#053229] hover:bg-[#084d3f] border border-white/15 text-white py-3.5 rounded-xl font-display font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_8px_25px_rgba(5,50,41,0.28)] hover:shadow-[0_12px_35px_rgba(5,50,41,0.40)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                          <span>{formStatus === 'sending' ? 'Envoi en cours...' : 'Transmettre le Dossier Mission'}</span>
                          <Send size={15} className={formStatus === 'sending' ? 'animate-pulse' : ''} />
                        </button>
                      </div>

                    </form>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* Legal & Guarantee Line with Back to Home Link */}
        <div className="pt-4 text-center text-xs text-slate-600 font-medium shrink-0 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          <span>BatiMove Sàrl • Rue De-Monthoux 64, 1201 Genève</span>
          <span className="hidden sm:inline">•</span>
          <span className="text-[#053229] font-bold">Assurance RC 5'000'000 CHF</span>
          <span className="hidden sm:inline">•</span>
          <button 
            type="button"
            onClick={() => navigateTo('home')}
            className="text-[#0052A3] hover:text-[#053229] font-semibold hover:underline cursor-pointer"
          >
            ← Retour à l'accueil
          </button>
        </div>

      </div>
    </motion.main>
  );
}
