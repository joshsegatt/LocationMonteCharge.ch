import React, { useRef, useState } from 'react';
import { Globe, Clock, Volume2, VolumeX, Play } from 'lucide-react';

interface AboutOverviewProps {
  onContactClick?: () => void;
}

export default function AboutOverviewV2({ onContactClick }: AboutOverviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <section id="about" className="py-16 md:py-28 bg-[#F1F5F8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Image Graphic */}
          <div className="flex-1 w-full relative">
            <div className="aspect-square max-w-sm sm:max-w-md lg:max-w-lg mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0052A3]/20 to-transparent rounded-full transform -rotate-6 scale-100 sm:scale-105 pointer-events-none" />
              <img 
                src="/assets/work/7.webp" 
                alt="Logistique Globe" 
                className="w-full h-full object-cover rounded-full shadow-2xl border-4 sm:border-8 border-white"
              />
              
              {/* Interactive Video Card in Action */}
              <div 
                onClick={togglePlay}
                className="absolute -bottom-4 sm:-bottom-8 left-0 sm:-left-6 lg:-left-8 w-44 sm:w-56 lg:w-60 h-56 sm:h-72 lg:h-80 rounded-2xl shadow-2xl border-4 border-white ring-1 ring-black/10 overflow-hidden bg-slate-950 group cursor-pointer select-none transition-transform duration-300 hover:scale-[1.02]"
                title="Cliquez pour mettre en pause / lecture"
              >
                <video
                  ref={videoRef}
                  src="/assets/batimove-lift.mp4"
                  poster="/assets/batimove-lift-poster.webp"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover object-[center_35%]"
                >
                  <source src="/assets/batimove-lift.mp4" type="video/mp4" />
                </video>

                {/* Subtle gradient vignette for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/35 pointer-events-none" />


                {/* Paused state overlay */}
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px] pointer-events-none">
                    <div className="w-11 h-11 rounded-full bg-white/95 text-slate-900 flex items-center justify-center shadow-xl">
                      <Play size={20} className="translate-x-0.5 fill-slate-900 text-slate-900" />
                    </div>
                  </div>
                )}

                {/* Bottom Info & Audio Toggle */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2">
                  <span className="text-[10px] sm:text-xs font-bold text-white/95 drop-shadow truncate pointer-events-none">
                    Levage 3ᵉ étage • BatiMove
                  </span>
                  <button
                    type="button"
                    onClick={toggleAudio}
                    aria-label={isMuted ? "Activer le son" : "Couper le son"}
                    className="p-1.5 rounded-full bg-slate-950/80 hover:bg-slate-900 text-white/90 hover:text-white backdrop-blur-md border border-white/20 transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-sm shrink-0"
                    title={isMuted ? "Activer le son" : "Couper le son"}
                  >
                    {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1">
            <p className="text-[#0052A3] text-xs sm:text-sm font-bold uppercase tracking-widest mb-2 font-sans">
              BatiMove Sàrl • Division Levage & Monte-Meuble
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-slate-900 mb-6 leading-tight">
              L'Excellence Du Levage <br />
              <span className="text-[#0052A3]">À Genève & Dans Le Vaud</span>
            </h2>
            <p className="text-slate-600 mb-8 leading-relaxed text-sm sm:text-base">
              Spécialiste agréé et division technique de <a href="https://batimove.ch" target="_blank" rel="noopener noreferrer" className="text-[#0052A3] font-bold underline decoration-[#0052A3] hover:text-[#0066CC] transition-colors">BatiMove Sàrl</a>, nous résolvons vos défis d'accès les plus complexes. Du déménagement d'appartement (canapés, pianos, meubles lourds par fenêtre ou balcon) jusqu'à l'approvisionnement de chantiers et rénovations urbaines, notre flotte autotractée jusqu'au 10ᵉ étage (500 kg) assure une prestation rapide, soignée et sans encombre.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex gap-4">
                <div className="shrink-0 mt-1">
                  <Globe size={28} className="text-[#0052A3]" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-1">Couverture Cantonale Complète</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Déploiement à Genève (Carouge, Meyrin, Lancy, Cologny, Versoix) et dans le canton de Vaud (Nyon, Gland, Rolle, Morges, Lausanne, Vevey, Montreux).
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 mt-1">
                  <Clock size={28} className="text-[#0052A3]" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-1">Conformité SUVA & Démarches de Voirie</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Opérateurs qualifiés formés aux normes SUVA, couverture RC professionnelle jusqu'à CHF 5'000'000 et accompagnement pour l'obtention des autorisations de voirie communale.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button 
                type="button"
                onClick={onContactClick}
                className="px-8 py-3.5 bg-[#E10600] hover:bg-[#C80500] text-white text-sm font-bold rounded-lg uppercase tracking-wider transition-all duration-300 shadow-[0_4px_16px_rgba(225,6,0,0.35)] hover:shadow-[0_8px_25px_rgba(225,6,0,0.5)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                Faites connaissance &rarr;
              </button>
              <a 
                href="https://batimove.ch" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-5 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 text-xs sm:text-sm font-semibold rounded-lg transition-colors inline-flex items-center gap-2"
              >
                <span>Découvrir batimove.ch</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
