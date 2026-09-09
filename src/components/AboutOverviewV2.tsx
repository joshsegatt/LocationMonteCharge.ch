import React from 'react';
import { Globe, Clock } from 'lucide-react';

interface AboutOverviewProps {
  onContactClick?: () => void;
}

export default function AboutOverviewV2({ onContactClick }: AboutOverviewProps) {
  return (
    <section id="about" className="py-20 md:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Image Graphic */}
          <div className="flex-1 w-full relative">
            <div className="aspect-square max-w-lg mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#00A388]/20 to-transparent rounded-full transform -rotate-12 scale-105" />
              <img 
                src="/assets/work/7.webp" 
                alt="Logistique Globe" 
                className="w-full h-full object-cover rounded-full shadow-2xl border-8 border-white"
              />
              <img 
                src="/assets/work/6.webp" 
                alt="Camion Monte-Charge BatiMove" 
                className="absolute -bottom-8 -left-6 sm:-left-8 w-56 sm:w-64 h-36 sm:h-40 object-cover object-center rounded-2xl shadow-2xl border-4 border-white ring-1 ring-black/5"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1">
            <p className="text-[#00A388] text-xs sm:text-sm font-bold uppercase tracking-widest mb-2 font-sans">
              BatiMove Sàrl • Division Levage & Monte-Meuble
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-slate-900 mb-6 leading-tight">
              L'Excellence Du Levage <br />
              <span className="text-[#053229]">À Genève & Dans Le Vaud</span>
            </h2>
            <p className="text-slate-600 mb-8 leading-relaxed text-sm sm:text-base">
              Spécialiste agréé et division technique de <a href="https://batimove.ch" target="_blank" rel="noopener noreferrer" className="text-[#053229] font-bold underline decoration-[#00A388] hover:text-[#00A388] transition-colors">BatiMove Sàrl</a>, nous résolvons vos défis d'accès les plus complexes. Du déménagement d'appartement (canapés, pianos, meubles lourds par fenêtre ou balcon) jusqu'à l'approvisionnement de chantiers et rénovations urbaines, notre flotte autotractée jusqu'au 10ᵉ étage (500 kg) assure une prestation rapide, soignée et sans encombre.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex gap-4">
                <div className="shrink-0 mt-1">
                  <Globe size={28} className="text-[#00A388]" />
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
                  <Clock size={28} className="text-[#00A388]" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-1">Conformité SUVA & Voirie Incluse</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Opérateurs qualifiés, assurance RC 5 millions CHF et gestion intégrale des autorisations de voirie auprès des municipalités.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button 
                type="button"
                onClick={onContactClick}
                className="px-8 py-3.5 bg-[#053229] hover:bg-[#084d3f] text-white text-sm font-bold rounded-lg uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
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
