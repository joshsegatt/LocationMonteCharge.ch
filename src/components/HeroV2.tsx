import React from 'react';
import { motion } from 'motion/react';
import FeatureCardsV2 from './FeatureCardsV2';

interface HeroV2Props {
  onOpenQuoteModal?: () => void;
}

export default function HeroV2({ onOpenQuoteModal }: HeroV2Props) {
  return (
    <section className="relative w-full">
      {/* Hero Stage with robust min-height & calculated vertical rhythm */}
      <div className="relative w-full min-h-[760px] md:min-h-[820px] lg:min-h-[880px] flex flex-col justify-center pt-32 sm:pt-40 lg:pt-44 pb-36 sm:pb-44 lg:pb-52 overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0 w-full h-full">
          <img 
            src="/assets/hero-bg.webp" 
            alt="Monte-Charge télescopique vue aérienne" 
            className="w-full h-full object-cover object-center brightness-[1.02] contrast-[1.08] saturate-[1.1]"
          />
          {/* Directional gradient: protects text contrast on left, keeps truck & action crisp and luminous on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#021712]/92 via-[#021712]/70 to-black/20 sm:via-[#021712]/55 sm:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#021712] via-transparent to-black/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl text-left"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-white leading-[1.1] mb-6 tracking-tight drop-shadow-md">
              Location Monte-Meuble <br className="hidden sm:block" />
              <span className="text-[#00A388]">Appartements</span> & Chantiers
            </h1>

            <p className="text-slate-100/95 text-base sm:text-lg mb-8 max-w-xl leading-relaxed font-normal drop-shadow-sm">
              Spécialiste à Genève pour vos déménagements d'appartements (canapés, pianos, mobilier lourd par balcon ou fenêtre jusqu'au 10ᵉ étage) et le levage sur chantiers. Opérateur qualifié, sécurité SUVA et autorisation voirie incluses.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button 
                type="button"
                onClick={onOpenQuoteModal}
                className="group relative px-8 py-4 bg-gradient-to-r from-[#00876c] to-[#046c59] hover:from-[#009b7c] hover:to-[#05826b] text-white text-sm font-bold rounded-lg uppercase tracking-wider transition-all duration-300 shadow-[0_8px_25px_rgba(0,135,108,0.45)] hover:shadow-[0_12px_32px_rgba(0,155,124,0.55)] hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center gap-3 border border-emerald-400/40 cursor-pointer overflow-hidden"
              >
                <span className="relative z-10">Demander un devis</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Overlapping Feature Cards */}
      <FeatureCardsV2 />
    </section>
  );
}
