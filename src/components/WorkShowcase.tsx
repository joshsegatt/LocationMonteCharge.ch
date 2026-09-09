import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface WorkItem {
  src: string;
  location: string;
  detail: string;
  badge: string;
}

const workItems: WorkItem[] = [
  { src: "/assets/work/1.webp", location: "Genève • Champel", detail: "Étage 5 • Passage Meuble Traversant", badge: "RÉSIDENTIEL" },
  { src: "/assets/work/2.webp", location: "Genève • Eaux-Vives", detail: "Étage 4 • Déménagement Intégral", badge: "URBAIN" },
  { src: "/assets/work/3.webp", location: "Genève • Plainpalais", detail: "Étage 6 • Rénovation & Matériaux", badge: "CHANTIER" },
  { src: "/assets/work/4.webp", location: "Canton de Vaud • Nyon", detail: "Étage 3 • Canapé Monobloc & Marbre", badge: "PRÉCISION" },
  { src: "/assets/work/5.webp", location: "Genève • Servette", detail: "Étage 7 • Baies Vitrées & Fenêtres", badge: "VITRAGE" },
  { src: "/assets/work/6.webp", location: "Genève • Carouge", detail: "Étage 2 • Cour Intérieure Étroite", badge: "ACCÈS DIFFICILE" },
  { src: "/assets/work/7.webp", location: "Genève • Cologny", detail: "Villa • Levage Toiture & Terrasse", badge: "VILLA DE LUXE" },
  { src: "/assets/work/8.webp", location: "Vaud • Morges", detail: "Étage 4 • Cuisine Équipée Quartz", badge: "BTP & AGENCEMENT" },
  { src: "/assets/work/9.webp", location: "Genève • Vieille-Ville", detail: "Étage 4 • Ruelles Étroites Pavées", badge: "PATRIMOINE" },
  { src: "/assets/work/15.webp", location: "Genève • Pâquis", detail: "Étage 6 • Évacuation Gravats Chantier", badge: "SECOND-OEUVRE" },
  { src: "/assets/work/11.webp", location: "Genève • Florissant", detail: "Étage 8 • Piano à Queue & Coffre", badge: "SPÉCIALISÉ" },
  { src: "/assets/work/12.webp", location: "Genève • Jonction", detail: "Étage 3 • Mobilier Design & Régie", badge: "RÉGIES IMMO" },
  { src: "/assets/work/14.webp", location: "Genève • Chêne-Bougeries", detail: "Étage 2 • Déménagement Sécurisé", badge: "CONFORT" },
  { src: "/assets/work/16.webp", location: "Versoix • Lac", detail: "Étage 5 • Terrasse Vue Panoramique", badge: "HAUTEUR" },
];

export default function WorkShowcase({ onImageClick }: { onImageClick: (src: string) => void }) {
  const [currentIndex, setCurrentIndex] = useState(2);
  const [isPaused, setIsPaused] = useState(false);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? workItems.length - 1 : prev - 1));
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === workItems.length - 1 ? 0 : prev + 1));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide]);

  // Subtle auto-advance every 4.5 seconds when not hovering
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 4500);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    <section 
      id="realisations" 
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-8 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Clean Single Header - No Pill Badges */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 md:mb-12 gap-4">
        <div>
          <p className="text-[#38D9BA] text-xs sm:text-sm font-semibold uppercase tracking-widest mb-1">
            En Conditions Réelles
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white tracking-tight">
            Réalisations À Genève & Vaud
          </h2>
        </div>

        {/* Arrow Navigation Controls */}
        <div className="flex items-center gap-2">
          <button 
            onClick={prevSlide}
            aria-label="Photo précédente"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer backdrop-blur-md"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={nextSlide}
            aria-label="Photo suivante"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer backdrop-blur-md"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* 3D Coverflow Stage */}
      <div className="relative h-[400px] sm:h-[460px] md:h-[520px] flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full flex items-center justify-center">
          {workItems.map((item, idx) => {
            // Calculate distance relative to current index in a loop
            let diff = idx - currentIndex;
            const half = Math.floor(workItems.length / 2);
            if (diff > half) diff -= workItems.length;
            if (diff < -half) diff += workItems.length;

            const isCenter = diff === 0;
            const isVisible = Math.abs(diff) <= 3;

            if (!isVisible) return null;

            // Compute 3D Cover Flow layout coordinates
            let xOffset = 0;
            let scale = 1;
            let zIndex = 10;
            let opacity = 1;
            let rotateY = 0;

            if (isCenter) {
              xOffset = 0;
              scale = 1.08;
              zIndex = 30;
              opacity = 1;
              rotateY = 0;
            } else if (diff === 1) {
              xOffset = 180;
              scale = 0.90;
              zIndex = 20;
              opacity = 0.85;
              rotateY = -12;
            } else if (diff === -1) {
              xOffset = -180;
              scale = 0.90;
              zIndex = 20;
              opacity = 0.85;
              rotateY = 12;
            } else if (diff === 2) {
              xOffset = 330;
              scale = 0.76;
              zIndex = 10;
              opacity = 0.50;
              rotateY = -22;
            } else if (diff === -2) {
              xOffset = -330;
              scale = 0.76;
              zIndex = 10;
              opacity = 0.50;
              rotateY = 22;
            } else if (diff === 3) {
              xOffset = 470;
              scale = 0.64;
              zIndex = 5;
              opacity = 0.28;
              rotateY = -28;
            } else if (diff === -3) {
              xOffset = -470;
              scale = 0.64;
              zIndex = 5;
              opacity = 0.28;
              rotateY = 28;
            }

            return (
              <motion.div
                key={item.src}
                className="absolute cursor-pointer"
                animate={{
                  x: xOffset,
                  scale: scale,
                  zIndex: zIndex,
                  opacity: opacity,
                  rotateY: rotateY,
                }}
                transition={{
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  perspective: 1200,
                  transformStyle: "preserve-3d",
                }}
                onClick={() => {
                  if (isCenter) {
                    onImageClick(item.src);
                  } else {
                    setCurrentIndex(idx);
                  }
                }}
              >
                {/* Card Container */}
                <div className={cn(
                  "relative w-[220px] h-[320px] sm:w-[260px] sm:h-[380px] md:w-[290px] md:h-[440px] rounded-2xl md:rounded-3xl overflow-hidden border transition-all duration-300 group",
                  isCenter 
                    ? "border-white/30 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] ring-1 ring-white/25" 
                    : "border-white/10 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.6)]"
                )}>
                  {/* Photo */}
                  <img 
                    src={item.src} 
                    alt={item.location}
                    className="w-full h-full object-cover select-none transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  {/* Overlay Info (Clear and bold on active card) */}
                  <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end text-left">
                    <span className="text-[10px] md:text-xs font-semibold text-[#38BDF8] uppercase tracking-wider mb-1">
                      {item.badge}
                    </span>
                    <h3 className="text-white font-display font-bold text-base sm:text-lg leading-tight">
                      {item.location}
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-[13px] mt-1 line-clamp-1 font-normal">
                      {item.detail}
                    </p>

                    {/* Magnify Icon on Center Card */}
                    {isCenter && (
                      <div className="mt-3 flex items-center gap-1.5 text-[11px] text-white/80 group-hover:text-white transition-colors font-medium">
                        <Maximize2 size={13} className="text-[#38BDF8]" />
                        <span>Cliquer pour agrandir</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modern Slide Indicators (Dots) */}
      <div className="flex items-center justify-center gap-1.5 mt-6">
        {workItems.map((_, dotIdx) => (
          <button
            key={dotIdx}
            onClick={() => setCurrentIndex(dotIdx)}
            aria-label="Sélectionner slide"
            className={cn(
              "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
              currentIndex === dotIdx 
                ? "w-8 bg-[#38BDF8]" 
                : "w-1.5 bg-white/20 hover:bg-white/40"
            )}
          />
        ))}
      </div>
    </section>
  );
}
