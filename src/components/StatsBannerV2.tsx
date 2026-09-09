import React from 'react';
import { ArrowUpFromLine, ShieldCheck, Weight } from 'lucide-react';

export default function StatsBannerV2() {
  return (
    <section className="w-full bg-[#053229] relative overflow-hidden text-white">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_20%_40%,rgba(0,163,136,0.25),transparent_70%)] pointer-events-none" />

      <div className="flex flex-col lg:flex-row min-h-[460px] relative z-10">
        {/* Left Side Content & Metrics */}
        <div className="flex-1 px-6 sm:px-10 md:px-14 lg:px-16 py-16 md:py-20 flex flex-col justify-center max-w-3xl lg:ml-auto w-full lg:w-1/2">
          
          <p className="text-[#38D9BA] text-xs sm:text-sm font-semibold uppercase tracking-widest mb-3">
            Capacité Technique & Sécurité Helvétique
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white leading-[1.1] mb-6 tracking-tight">
            Précision De Levage, <br />
            <span className="text-[#38D9BA]">Sans Limite D'Accès</span>
          </h2>

          <p className="text-slate-200/90 text-sm sm:text-base leading-relaxed mb-12 max-w-xl font-normal">
            BatiMove Sàrl déploie des équipements télescopiques de dernière génération. 
            Nous surmontons les cours étroites, les étages élevés et les charges volumineuses dans l'ensemble des cantons de Genève et Vaud.
          </p>

          {/* 3 Concrete Technical Specs */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 border-t border-white/15 pt-8 mt-auto">
            
            {/* Stat 1: Hauteur */}
            <div className="text-left group">
              <div className="flex items-center gap-2 mb-2 text-[#38D9BA]">
                <ArrowUpFromLine size={20} strokeWidth={1.75} />
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-300">Hauteur</span>
              </div>
              <div className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
                10<span className="text-lg sm:text-xl font-bold text-[#38D9BA] ml-1">ᵉ</span>
              </div>
              <div className="text-[11px] sm:text-xs text-slate-300 mt-1 font-normal">
                Jusqu'au 10ᵉ étage
              </div>
            </div>

            {/* Stat 2: Charge */}
            <div className="text-left border-l border-white/15 pl-4 sm:pl-6 group">
              <div className="flex items-center gap-2 mb-2 text-[#38D9BA]">
                <Weight size={20} strokeWidth={1.75} />
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-300">Charge</span>
              </div>
              <div className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
                500<span className="text-lg sm:text-xl font-bold text-[#38D9BA] ml-0.5">kg</span>
              </div>
              <div className="text-[11px] sm:text-xs text-slate-300 mt-1 font-normal">
                Capacité utile max
              </div>
            </div>

            {/* Stat 3: Assurance */}
            <div className="text-left border-l border-white/15 pl-4 sm:pl-6 group">
              <div className="flex items-center gap-2 mb-2 text-[#38D9BA]">
                <ShieldCheck size={20} strokeWidth={1.75} />
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-300">Garantie</span>
              </div>
              <div className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
                5<span className="text-lg sm:text-xl font-bold text-[#38D9BA] ml-0.5">M</span>
              </div>
              <div className="text-[11px] sm:text-xs text-slate-300 mt-1 font-normal">
                CHF assurance RC
              </div>
            </div>

          </div>
        </div>

        {/* Right Side Image Graphic with seamless fade */}
        <div className="flex-1 relative min-h-[320px] lg:min-h-full w-full lg:w-1/2">
          <img 
            src="/assets/work/18.webp" 
            alt="Monte-Charge en opération" 
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Subtle gradient blend on left edge of the photo */}
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#053229] via-[#053229]/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
