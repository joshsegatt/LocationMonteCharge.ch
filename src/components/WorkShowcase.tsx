import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Maximize2, Pause, Play } from 'lucide-react';
import { cn } from '../lib/utils';

interface WorkItem {
  src: string;
  location: string;
  detail: string;
  badge: string;
}

const workItems: WorkItem[] = [
  // High-Resolution Authentic Swiss Interventions (BatiMove Field Fleet)
  { 
    src: "/assets/work/real-geneva-1.webp", 
    location: "Genève • Cité & Servette", 
    detail: "Étage 4 • Levage télescopique avec balisage sécurisé voirie", 
    badge: "INTERVENTION URBAINE" 
  },
  { 
    src: "/assets/work/real-geneva-2.webp", 
    location: "Genève • Résidentiel Parc", 
    detail: "Dernier étage • Équipe BatiMove & flotte utilitaire de déménagement", 
    badge: "COORDINATION FLOTTE" 
  },
  { 
    src: "/assets/work/real-geneva-3.webp", 
    location: "Genève • Poste de Commande", 
    detail: "Pupitre hydraulique SUVA • Précision millimétrique opérateur", 
    badge: "OPÉRATEUR CERTIFIÉ" 
  },
  { 
    src: "/assets/work/real-geneva-4.webp", 
    location: "Genève • Rive Droite", 
    detail: "Déploiement façade 33m • Technicien en poste & contrôle d'assise", 
    badge: "SÉCURITÉ CHANTIER" 
  },
  { 
    src: "/assets/work/real-geneva-5.webp", 
    location: "Genève • Flotte BatiMove", 
    detail: "Camion monte-meuble autotracté Klaas / Böcker 400kg", 
    badge: "ÉQUIPEMENT DE POINTE" 
  },
  { 
    src: "/assets/work/real-geneva-6.webp", 
    location: "Genève • Grand-Pré", 
    detail: "Accès cour intérieure étroite & sécurisation continue des tiers", 
    badge: "ACCÈS COMPLEXE" 
  },
  { 
    src: "/assets/work/1.webp", 
    location: "Genève • Champel", 
    detail: "Étage 5 • Passage Meuble Traversant", 
    badge: "RÉSIDENTIEL" 
  },
  { 
    src: "/assets/work/2.webp", 
    location: "Genève • Eaux-Vives", 
    detail: "Étage 4 • Déménagement Intégral", 
    badge: "URBAIN" 
  },
  { 
    src: "/assets/work/3.webp", 
    location: "Genève • Plainpalais", 
    detail: "Étage 6 • Rénovation & Matériaux lourds", 
    badge: "CHANTIER" 
  },
  { 
    src: "/assets/work/4.webp", 
    location: "Canton de Vaud • Nyon", 
    detail: "Étage 3 • Canapé Monobloc & Marbre", 
    badge: "PRÉCISION" 
  },
  { 
    src: "/assets/work/5.webp", 
    location: "Genève • Servette", 
    detail: "Étage 7 • Baies Vitrées & Fenêtres", 
    badge: "VITRAGE" 
  },
  { 
    src: "/assets/work/6.webp", 
    location: "Genève • Carouge", 
    detail: "Étage 2 • Cour Intérieure Étroite", 
    badge: "ACCÈS DIFFICILE" 
  },
  { 
    src: "/assets/work/7.webp", 
    location: "Genève • Cologny", 
    detail: "Villa • Levage Toiture & Terrasse", 
    badge: "VILLA DE LUXE" 
  },
  { 
    src: "/assets/work/8.webp", 
    location: "Vaud • Morges", 
    detail: "Étage 4 • Cuisine Équipée Quartz", 
    badge: "BTP & AGENCEMENT" 
  },
  { 
    src: "/assets/work/9.webp", 
    location: "Genève • Vieille-Ville", 
    detail: "Étage 4 • Ruelles Étroites Pavées", 
    badge: "PATRIMOINE" 
  },
  { 
    src: "/assets/work/11.webp", 
    location: "Genève • Florissant", 
    detail: "Étage 8 • Piano à Queue & Coffre", 
    badge: "SPÉCIALISÉ" 
  },
  { 
    src: "/assets/work/12.webp", 
    location: "Genève • Jonction", 
    detail: "Étage 3 • Mobilier Design & Régie", 
    badge: "RÉGIES IMMO" 
  },
  { 
    src: "/assets/work/14.webp", 
    location: "Genève • Chêne-Bougeries", 
    detail: "Étage 2 • Déménagement Sécurisé", 
    badge: "CONFORT" 
  },
  { 
    src: "/assets/work/15.webp", 
    location: "Genève • Pâquis", 
    detail: "Étage 6 • Évacuation Gravats Chantier", 
    badge: "SECOND-OEUVRE" 
  },
  { 
    src: "/assets/work/16.webp", 
    location: "Versoix • Lac", 
    detail: "Étage 5 • Terrasse Vue Panoramique", 
    badge: "HAUTEUR" 
  },
  { 
    src: "/assets/work/20.webp", 
    location: "Vaud • Lausanne", 
    detail: "Étage 6 • Levage Meubles & Agencement", 
    badge: "CANTON DE VAUD" 
  },
  { 
    src: "/assets/work/21.webp", 
    location: "Genève • Petit-Saconnex", 
    detail: "Étage 9 • Nacelle & Échelle Télescopique", 
    badge: "GRANDE HAUTEUR" 
  },
];

export default function WorkShowcase({ onImageClick }: { onImageClick: (src: string) => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(() => {
    return typeof window !== 'undefined' ? window.innerWidth : 1200;
  });
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const thumbnailContainerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Smoothly center the active thumbnail in the preview strip ONLY horizontally inside container
  const isFirstRender = React.useRef(true);

  useEffect(() => {
    // Skip initial mount so we never trigger any scroll or shift on page load/reload
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const container = thumbnailContainerRef.current;
    if (container && container.children[currentIndex]) {
      const activeThumb = container.children[currentIndex] as HTMLElement;
      if (activeThumb) {
        const targetScroll = activeThumb.offsetLeft - (container.clientWidth / 2) + (activeThumb.clientWidth / 2);
        container.scrollTo({ left: Math.max(0, targetScroll), behavior: 'smooth' });
      }
    }
  }, [currentIndex]);

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

  // Auto-advance every 5 seconds when not paused
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    setTouchStart(null);
  };

  // Dynamic layout calculations based on window width
  const { cardClass, stageClass, maxDiff, getTransform } = useMemo(() => {
    const isMobile = windowWidth < 640;
    const isTablet = windowWidth >= 640 && windowWidth < 1024;
    const isDesktop = windowWidth >= 1024 && windowWidth < 1440;
    const isWide = windowWidth >= 1440;

    let stageClass = "h-[500px] sm:h-[580px]";
    let cardClass = "w-[300px] h-[430px] sm:w-[340px] sm:h-[480px]";
    let maxDiff = 1;

    if (isTablet) {
      stageClass = "h-[620px]";
      cardClass = "w-[380px] h-[530px]";
      maxDiff = 2;
    } else if (isDesktop) {
      stageClass = "h-[690px]";
      cardClass = "w-[440px] h-[610px]";
      maxDiff = 3;
    } else if (isWide) {
      stageClass = "h-[750px]";
      cardClass = "w-[490px] h-[650px]";
      maxDiff = 4;
    }

    const getTransform = (diff: number) => {
      const absDiff = Math.abs(diff);
      const sign = Math.sign(diff);

      if (diff === 0) {
        return {
          xOffset: 0,
          scale: isMobile ? 1.0 : 1.05,
          zIndex: 35,
          opacity: 1,
          rotateY: 0,
        };
      }

      if (isMobile) {
        return {
          xOffset: sign * 140,
          scale: 0.84,
          zIndex: 20,
          opacity: 0.7,
          rotateY: -sign * 16,
        };
      }

      if (isTablet) {
        if (absDiff === 1) {
          return {
            xOffset: sign * 260,
            scale: 0.86,
            zIndex: 25,
            opacity: 0.85,
            rotateY: -sign * 15,
          };
        }
        return {
          xOffset: sign * 460,
          scale: 0.72,
          zIndex: 15,
          opacity: 0.45,
          rotateY: -sign * 24,
        };
      }

      // Desktop & Wide Desktop: panoramic spread across the full monitor
      const step1 = isWide ? 380 : 330;
      const step2 = isWide ? 700 : 610;
      const step3 = isWide ? 960 : 840;
      const step4 = isWide ? 1180 : 1030;

      if (absDiff === 1) {
        return {
          xOffset: sign * step1,
          scale: 0.88,
          zIndex: 28,
          opacity: 0.88,
          rotateY: -sign * 14,
        };
      }
      if (absDiff === 2) {
        return {
          xOffset: sign * step2,
          scale: 0.76,
          zIndex: 20,
          opacity: 0.65,
          rotateY: -sign * 22,
        };
      }
      if (absDiff === 3) {
        return {
          xOffset: sign * step3,
          scale: 0.64,
          zIndex: 12,
          opacity: 0.38,
          rotateY: -sign * 28,
        };
      }
      return {
        xOffset: sign * step4,
        scale: 0.52,
        zIndex: 5,
        opacity: 0.18,
        rotateY: -sign * 34,
      };
    };

    return { cardClass, stageClass, maxDiff, getTransform };
  }, [windowWidth]);

  const activeItem = workItems[currentIndex];

  return (
    <section 
      id="realisations" 
      className="relative w-full py-10 md:py-16 select-none overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Clean Swiss Header - Aligned to max-w-7xl grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mb-8 md:mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <p className="text-[#38BDF8] text-xs sm:text-sm font-bold uppercase tracking-widest">
              En Conditions Réelles • Flotte BatiMove
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white tracking-tight">
              Réalisations À Genève & Vaud
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl font-normal leading-relaxed">
              Photographies authentiques de nos interventions sur façades complexes, cours intérieures et grandes hauteurs jusqu’au 10ᵉ étage.
            </p>
          </div>

          {/* Navigation and Autoplay Controls */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              onClick={() => setIsPaused(!isPaused)}
              aria-label={isPaused ? "Reprendre le défilement" : "Mettre en pause"}
              className="h-10 px-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center gap-2 text-xs font-medium transition-all active:scale-95 cursor-pointer backdrop-blur-md"
            >
              {isPaused ? <Play size={14} className="text-[#38BDF8]" /> : <Pause size={14} className="text-[#38BDF8]" />}
              <span className="hidden sm:inline">{isPaused ? "Reprendre" : "Pause"}</span>
            </button>

            <div className="flex items-center gap-1.5">
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
        </div>
      </div>

      {/* Full-Bleed 3D Coverflow Horizon Stage */}
      <div className={cn("relative w-full flex items-center justify-center overflow-hidden", stageClass)}>
        {/* Lateral Ambient Fade Gradients (Apple Stage Style) */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-28 md:w-48 bg-gradient-to-r from-[#0A192F] via-[#0A192F]/80 to-transparent z-40" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-28 md:w-48 bg-gradient-to-l from-[#0A192F] via-[#0A192F]/80 to-transparent z-40" />

        {/* Floating Lateral Chevrons on Stage Edges */}
        <button 
          onClick={prevSlide}
          aria-label="Photo précédente"
          className="hidden sm:flex absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-[#071326]/80 hover:bg-[#0052A3] border border-white/20 text-white items-center justify-center transition-all duration-200 active:scale-90 shadow-2xl backdrop-blur-md cursor-pointer group"
        >
          <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
        </button>

        <button 
          onClick={nextSlide}
          aria-label="Photo suivante"
          className="hidden sm:flex absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-[#071326]/80 hover:bg-[#0052A3] border border-white/20 text-white items-center justify-center transition-all duration-200 active:scale-90 shadow-2xl backdrop-blur-md cursor-pointer group"
        >
          <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Dynamic 3D Card Orbit */}
        <div className="relative w-full h-full flex items-center justify-center">
          {workItems.map((item, idx) => {
            let diff = idx - currentIndex;
            const half = Math.floor(workItems.length / 2);
            if (diff > half) diff -= workItems.length;
            if (diff < -half) diff += workItems.length;

            const isCenter = diff === 0;
            const isVisible = Math.abs(diff) <= maxDiff;

            if (!isVisible) return null;

            const { xOffset, scale, zIndex, opacity, rotateY } = getTransform(diff);

            return (
              <motion.div
                key={item.src}
                className="absolute cursor-pointer will-change-transform"
                animate={{
                  x: xOffset,
                  scale: scale,
                  zIndex: zIndex,
                  opacity: opacity,
                  rotateY: rotateY,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  perspective: 1400,
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
                {/* Visual Card Wrapper */}
                <div className={cn(
                  "relative rounded-2xl md:rounded-3xl overflow-hidden border transition-all duration-300 group select-none",
                  cardClass,
                  isCenter 
                    ? "border-white/40 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.9)] ring-1 ring-white/30" 
                    : "border-white/10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] hover:border-white/25"
                )}>
                  {/* High Quality Photo */}
                  <img 
                    src={item.src} 
                    alt={item.location}
                    loading={isCenter ? "eager" : "lazy"}
                    decoding="async"
                    className="w-full h-full object-cover select-none transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Gradient Scrim - Dark at bottom for clear text legibility */}
                  <div className={cn(
                    "absolute inset-0 transition-opacity duration-300",
                    isCenter 
                      ? "bg-gradient-to-t from-black/90 via-black/30 to-black/5" 
                      : "bg-gradient-to-t from-black/95 via-black/60 to-black/20"
                  )} />

                  {/* Overlay Info */}
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 md:p-8 flex flex-col justify-end text-left">
                    <p className="text-[11px] md:text-xs font-bold text-[#38BDF8] uppercase tracking-wider mb-1.5">
                      {item.badge}
                    </p>
                    <h3 className="text-white font-display font-bold text-lg sm:text-xl md:text-2xl leading-tight drop-shadow-sm">
                      {item.location}
                    </h3>
                    <p className="text-slate-200 text-xs sm:text-sm mt-1.5 line-clamp-2 font-normal leading-relaxed">
                      {item.detail}
                    </p>

                    {/* Magnify Affordance on Active Center Card */}
                    {isCenter && (
                      <div className="mt-4 flex items-center gap-2 text-xs text-white/90 group-hover:text-white transition-colors font-medium">
                        <Maximize2 size={14} className="text-[#38BDF8]" />
                        <span>Agrandir en haute résolution</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom Information & Thumbnails Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mt-6 md:mt-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-2">
          {/* Active Status Counter */}
          <div className="text-xs text-slate-300 font-medium">
            <span className="text-white font-bold text-sm">
              {String(currentIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-slate-400 mx-1.5">/</span>
            <span className="text-slate-400">
              {String(workItems.length).padStart(2, '0')}
            </span>
            <span className="mx-2 text-slate-500">•</span>
            <span className="text-[#38BDF8] font-semibold">
              {activeItem.location}
            </span>
          </div>

          {/* Quick Slide Navigation Dots */}
          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            {workItems.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => setCurrentIndex(dotIdx)}
                aria-label={`Aller à la photo ${dotIdx + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                  currentIndex === dotIdx 
                    ? "w-8 bg-[#38BDF8]" 
                    : "w-1.5 bg-white/20 hover:bg-white/40"
                )}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail Preview Strip */}
        <div 
          ref={thumbnailContainerRef}
          className="mt-4 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
        >
          {workItems.map((item, thumbIdx) => (
            <button
              key={thumbIdx}
              onClick={() => setCurrentIndex(thumbIdx)}
              aria-label={`Sélectionner ${item.location}`}
              className={cn(
                "relative flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border transition-all duration-200 cursor-pointer bg-slate-900",
                currentIndex === thumbIdx 
                  ? "border-[#38BDF8] ring-2 ring-[#38BDF8]/50 opacity-100 scale-105" 
                  : "border-white/15 opacity-70 hover:opacity-100"
              )}
            >
              <img 
                src={item.src} 
                alt={item.location} 
                className="w-full h-full object-cover select-none"
                decoding="async"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
