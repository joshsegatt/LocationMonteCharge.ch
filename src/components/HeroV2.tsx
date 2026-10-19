import React from 'react';
import { motion } from 'motion/react';
import { Phone, ArrowRight, Maximize2 } from 'lucide-react';
import FeatureCardsV2 from './FeatureCardsV2';

interface HeroV2Props {
  onOpenQuoteModal?: () => void;
  onImageClick?: (src: string) => void;
}

export default function HeroV2({ onOpenQuoteModal, onImageClick }: HeroV2Props) {
  return (
    <section className="relative w-full overflow-hidden bg-white text-slate-900 pt-28 sm:pt-32 lg:pt-36">
      
      {/* ── Main Hero Stage Container ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ── LEFT COLUMN: Antigravity-Grade Typography & Direct CTAs ── */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col items-start text-left z-20"
          >
            {/* Swiss Precision Typographic Category */}
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-[#0052A3] mb-1.5 font-sans">
              Logistique Verticale • Genève & Vaud
            </p>

            {/* Verified Google Business Profile Handshake */}
            <a 
              href="https://www.google.com/search?q=Location+monte-meuble+BATIMOVE+SARL" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-slate-700 hover:text-[#0052A3] transition-colors mb-4 group cursor-pointer"
              title="Consulter la fiche officielle Location monte-meuble BATIMOVE SARL sur Google"
            >
              <span className="text-[#F59E0B] tracking-tight text-sm">★★★★★</span>
              <span className="font-extrabold text-slate-950">5.0</span>
              <span className="text-slate-500 font-medium group-hover:underline">sur Google (4 avis clients vérifiés)</span>
            </a>

            {/* Monumental Headline with Antigravity Strict Optical Kerning */}
            <h1 className="text-4xl sm:text-5xl lg:text-[50px] xl:text-[56px] font-display font-black text-slate-950 tracking-[-0.035em] leading-[1.05] mb-5">
              <span>Location Monte-Meuble</span> <br />
              <span className="bg-gradient-to-r from-[#0052A3] via-[#0066CC] to-[#0A2540] bg-clip-text text-transparent">
                Genève & Vaud
              </span>
            </h1>

            {/* Crisp High-Legibility Subtitle (Audited by Senior Swiss Legal Counsel) */}
            <p className="text-slate-600 text-sm sm:text-base lg:text-[17px] leading-relaxed mb-7 max-w-xl font-normal text-pretty">
              Passage sécurisé de canapés, pianos et matériaux volumineux par fenêtre ou balcon jusqu'au 10ᵉ étage (500 kg). Opérateur qualifié formé aux normes SUVA et prise en charge des démarches de voirie communale.
            </p>

            {/* High-Conversion Direct Action CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto mb-6">
              <button 
                type="button"
                onClick={onOpenQuoteModal}
                className="group relative px-7 sm:px-8 py-3.5 sm:py-4 bg-[#E10600] hover:bg-[#C80500] text-white text-xs sm:text-sm font-bold rounded-xl uppercase tracking-wider transition-all duration-300 shadow-[0_8px_25px_rgba(225,6,0,0.32)] hover:shadow-[0_12px_32px_rgba(225,6,0,0.48)] hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center gap-2.5 cursor-pointer overflow-hidden"
              >
                <span className="relative z-10">Demander un devis estimatif</span>
                <ArrowRight size={15} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <a
                href="tel:0800825925"
                className="px-6 py-3.5 sm:py-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-900 text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 inline-flex items-center gap-2 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:border-slate-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <Phone size={15} className="text-[#0052A3]" />
                <span>0800 825 925 (Gratuit)</span>
              </a>
            </div>

            {/* Live Operational Status (Pure clean text, no pill) */}
            <p className="text-xs text-slate-500 font-medium">
              Intervention sur réservation ou urgence selon planning • Devis sans engagement sur WhatsApp
            </p>
          </motion.div>

          {/* ── RIGHT COLUMN: Authentic Swiss Reality Duo (Vaud & Alps Panoramic Perspective) ── */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 relative flex items-center justify-center lg:justify-end"
          >
            {/* Ambient 3D Depth Glow behind Duo Stage */}
            <div 
              className="absolute -inset-2 sm:-inset-4 bg-gradient-to-tr from-[#0052A3]/10 via-[#38BDF8]/06 to-transparent rounded-3xl blur-2xl pointer-events-none -z-10" 
              aria-hidden="true"
            />

            {/* 3D Contact Floor Shadow */}
            <div 
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[92%] h-8 bg-slate-950/20 blur-xl rounded-[100%] pointer-events-none -z-10" 
              aria-hidden="true"
            />

            {/* Dual Authentic Swiss Photos: Natural Staggered Grid */}
            <div className="grid grid-cols-12 gap-3 sm:gap-4 w-full items-center">
              
              {/* Photo 1: Vertical Portrait Road & Mountain Perspective (col-span-5) */}
              <div 
                onClick={() => onImageClick?.('/assets/hero-swiss-road.jpg')}
                className="col-span-5 relative rounded-2xl lg:rounded-3xl overflow-hidden border border-slate-200/90 ring-1 ring-black/[0.04] shadow-[0_20px_50px_rgba(10,25,47,0.12)] bg-slate-100 group cursor-pointer transition-all duration-500 hover:shadow-[0_28px_60px_rgba(0,82,163,0.18)] hover:-translate-y-1"
                title="Cliquer pour afficher la vue route en plein écran"
              >
                <picture>
                  <source srcSet="/assets/hero-swiss-road.webp" type="image/webp" />
                  <img 
                    src="/assets/hero-swiss-road.jpg" 
                    alt="Camion Monte-Meuble BatiMove sur route de montagne en direction des sommets suisses" 
                    className="w-full h-auto object-cover object-center block select-none filter contrast-[1.03] saturate-[1.04] transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                    loading="eager"
                    fetchPriority="high"
                  />
                </picture>

                {/* Subtle hover zoom trigger */}
                <div className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-950/60 backdrop-blur-md text-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                  <Maximize2 size={13} />
                </div>
              </div>

              {/* Photo 2: Horizontal Panoramic Alps & Forchex Profile (col-span-7) */}
              <div 
                onClick={() => onImageClick?.('/assets/hero-swiss-profile.jpg')}
                className="col-span-7 relative rounded-2xl lg:rounded-3xl overflow-hidden border border-slate-200/90 ring-1 ring-black/[0.04] shadow-[0_24px_60px_rgba(10,25,47,0.15)] bg-slate-100 group cursor-pointer transition-all duration-500 hover:shadow-[0_32px_70px_rgba(0,82,163,0.20)] hover:-translate-y-1"
                title="Cliquer pour afficher le panorama des Alpes en plein écran"
              >
                <picture>
                  <source srcSet="/assets/hero-swiss-profile.webp" type="image/webp" />
                  <img 
                    src="/assets/hero-swiss-profile.jpg" 
                    alt="Camion Monte-Meuble BatiMove face au panorama des Alpes suisses et panneau Forchex (Vaud)" 
                    className="w-full h-auto object-cover object-center block select-none filter contrast-[1.03] saturate-[1.04] transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                    loading="eager"
                    fetchPriority="high"
                  />
                </picture>

                {/* Subtle hover zoom trigger */}
                <div className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-950/60 backdrop-blur-md text-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                  <Maximize2 size={13} />
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* ── Grounded Swiss Architectural Specification Bar ── */}
      <FeatureCardsV2 />
    </section>
  );
}
