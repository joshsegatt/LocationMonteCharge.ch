import React from 'react';
import { motion } from 'motion/react';
import { Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import FeatureCardsV2 from './FeatureCardsV2';

interface HeroV2Props {
  onOpenQuoteModal?: () => void;
}

export default function HeroV2({ onOpenQuoteModal }: HeroV2Props) {
  return (
    <section className="relative w-full overflow-hidden bg-[#050811] text-white pt-28 sm:pt-36 lg:pt-40">
      
      {/* ── Volumetric Studio Lighting & Cinematic Atmospheric Canvas ── */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0" aria-hidden="true">
        {/* Overhead diffused soft studio spotlight */}
        <div 
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] lg:w-[1200px] h-[600px] opacity-75"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 50% 20%, rgba(0, 82, 163, 0.28) 0%, rgba(56, 189, 248, 0.08) 45%, transparent 80%)'
          }}
        />

        {/* Ambient Warm Technical Grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />

        {/* Subtle Architectural Coordinate Contours */}
        <svg 
          className="absolute right-0 top-10 w-[750px] lg:w-[1050px] h-auto opacity-[0.08] text-sky-400"
          viewBox="0 0 1000 500" 
          fill="none" 
          stroke="currentColor"
        >
          <path d="M 50 380 Q 200 420 400 360 T 750 260 T 950 220" strokeWidth="1" strokeDasharray="6 4" />
          <path d="M 120 450 Q 320 410 580 320 T 900 180" strokeWidth="1.5" />
          <text x="780" y="460" fontSize="11" fontFamily="monospace" fill="currentColor">CH • SUISSE ROMANDE // GE-VD</text>
        </svg>

        {/* Floor Horizon Horizon Horizon Dark Shading */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0A192F] to-transparent" />
      </div>

      {/* ── Main Hero Stage Container ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full pb-14 sm:pb-20 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* ── LEFT COLUMN: Authority, Master Typography & Direct CTAs ── */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 xl:col-span-5 flex flex-col items-start text-left z-20"
          >
            {/* Monumental Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[52px] font-display font-black text-white tracking-tight leading-[1.08] mb-5">
              <span className="whitespace-nowrap">Location Monte-Meuble</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#60A5FA] to-white">
                Genève & Vaud
              </span>
            </h1>

            {/* Crisp High-Legibility Subtitle */}
            <p className="text-slate-300 text-sm sm:text-base lg:text-[17px] leading-relaxed mb-8 max-w-xl font-normal">
              Passage express de canapés, pianos et matériaux volumineux par fenêtre ou balcon jusqu'au 10ᵉ étage (500 kg). Opérateur qualifié SUVA et autorisation voirie 100% gérées.
            </p>

            {/* High-Conversion CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto mb-6">
              <button 
                type="button"
                onClick={onOpenQuoteModal}
                className="group relative px-7 sm:px-8 py-3.5 sm:py-4 bg-[#E10600] hover:bg-[#C80500] text-white text-xs sm:text-sm font-bold rounded-xl uppercase tracking-wider transition-all duration-300 shadow-[0_8px_25px_rgba(225,6,0,0.4)] hover:shadow-[0_12px_32px_rgba(225,6,0,0.55)] hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center gap-2.5 cursor-pointer overflow-hidden"
              >
                <span className="relative z-10">Demander un devis express</span>
                <ArrowRight size={15} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <a
                href="tel:0800825925"
                className="px-6 py-3.5 sm:py-4 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 inline-flex items-center gap-2 hover:-translate-y-0.5 cursor-pointer"
              >
                <Phone size={15} className="text-[#38BDF8]" />
                <span>0800 825 925 (Gratuit)</span>
              </a>
            </div>

            {/* Live Operational Status */}
            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Intervention immédiate disponible • Tarif fixe garanti par photo WhatsApp</span>
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN: High-End Vehicle in Heroic Relief ── */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 xl:col-span-7 relative flex items-center justify-center lg:justify-end"
          >
            {/* Studio Vehicle Stage Wrapper (Scaled Larger for High Presence) */}
            <div className="relative w-full max-w-[740px] lg:max-w-none lg:scale-110 xl:scale-115 origin-center lg:origin-right">
              
              {/* Diffused Blue Atmospheric Showroom Glow behind Truck */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[75%] bg-[#0052A3]/25 blur-[95px] rounded-full pointer-events-none" 
                aria-hidden="true" 
              />

              {/* Ultra-Realistic Studio Floor Contact Shadows */}
              <div 
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[96%] h-12 bg-black/60 blur-2xl rounded-[100%] pointer-events-none" 
                aria-hidden="true" 
              />
              <div 
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[84%] h-6 bg-black/85 blur-md rounded-[100%] pointer-events-none" 
                aria-hidden="true" 
              />
              
              {/* Isolated BatiMove Monte-Meuble Truck Cutout (No Hover, Stable Focus) */}
              <picture>
                <source srcSet="/assets/truck-relief.webp" type="image/webp" />
                <img 
                  src="/assets/truck-relief.png" 
                  alt="Camion Monte-Meuble télescopique BatiMove Genève en intervention levage" 
                  className="w-full h-auto object-contain select-none pointer-events-none filter drop-shadow-[0_24px_45px_rgba(0,0,0,0.65)]"
                  loading="eager"
                  fetchPriority="high"
                />
              </picture>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── Porsche PCM / Apple Pro Telemetry Console Deck ── */}
      <FeatureCardsV2 />
    </section>
  );
}
