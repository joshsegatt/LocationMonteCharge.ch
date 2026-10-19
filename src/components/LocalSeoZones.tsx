import React from 'react';
import { Clock, ShieldCheck, Phone, ArrowRight } from 'lucide-react';

interface ZoneHub {
  region: string;
  eta: string;
  description: string;
  cities: string[];
}

const zones: ZoneHub[] = [
  {
    region: "Canton de Genève",
    eta: "Intervention réactive",
    description: "Intervention sur rendez-vous ou urgence en hypercentre, vieilles rues pavées et cours intérieures. Démarches de voirie SEP et balisage de sécurité réglementaire assurés.",
    cities: [
      "Genève Centre", "Carouge", "Eaux-Vives",
      "Plainpalais", "Champel", "Servette",
      "Meyrin", "Lancy", "Vernier",
      "Cologny", "Chêne-Bougeries", "Versoix"
    ]
  },
  {
    region: "Canton de Vaud & La Côte",
    eta: "Intervention réactive",
    description: "Couverture continue de La Côte à la Riviera. Levage télescopique pour copropriétés, appartements en attique, villas et chantiers.",
    cities: [
      "Nyon", "Morges", "Lausanne",
      "Gland", "Rolle", "Renens",
      "Pully", "Lutry", "Vevey",
      "Montreux", "Saint-Prex", "Coppet"
    ]
  }
];

interface LocalSeoZonesProps {
  onOpenQuoteModal?: () => void;
  navigateTo?: (page: string) => void;
}

const cityRouteMap: Record<string, string> = {
  "Genève Centre": "geneve",
  "Carouge": "carouge",
  "Plainpalais": "plainpalais",
  "Eaux-Vives": "eaux-vives",
  "Champel": "eaux-vives",
  "Cologny": "eaux-vives",
  "Meyrin": "meyrin",
  "Vernier": "meyrin",
  "Lausanne": "lausanne",
  "Nyon": "nyon",
  "Gland": "nyon",
  "Coppet": "nyon",
  "Morges": "morges",
  "Rolle": "morges",
  "Saint-Prex": "morges",
  "Vevey": "vevey",
  "Montreux": "vevey",
};

export default function LocalSeoZones({ onOpenQuoteModal, navigateTo }: LocalSeoZonesProps) {
  return (
    <section id="zones" className="py-12 md:py-16 bg-[#F1F5F8] border-t border-slate-200/80 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Minimal Header without pills */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-[#0A192F] tracking-tight leading-tight mb-2.5">
            Zones d'Intervention <span className="text-[#0052A3]">— Genève & Vaud</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Déploiement direct dans votre commune. Passage par fenêtre ou balcon jusqu'au 10ᵉ étage avec opérateur qualifié formé aux normes SUVA et démarches de voirie prises en charge.
          </p>
        </div>

        {/* 2 Regional Hub Cards - Ultra-clean Apple layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {zones.map((zone, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-[0_4px_20px_rgba(10,25,47,0.04)] hover:shadow-[0_12px_32px_rgba(0,82,163,0.08)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header: Title + Clean Text ETA (No pills) */}
                <div className="flex items-baseline justify-between pb-3.5 mb-3.5 border-b border-slate-100">
                  <h3 className="text-lg sm:text-xl font-display font-extrabold text-[#0A192F]">
                    {zone.region}
                  </h3>
                  <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1.5">
                    <Clock size={13} className="shrink-0" />
                    <span>{zone.eta}</span>
                  </span>
                </div>

                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed mb-5">
                  {zone.description}
                </p>

                {/* Communes Grid - 3 Columns Clean Typographic List */}
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                    Communes desservies au tarif local
                  </div>
                  <div className="grid grid-cols-3 gap-x-2 gap-y-2 text-xs">
                    {zone.cities.map((city, cIdx) => {
                      const route = cityRouteMap[city];
                      return (
                        <div 
                          key={cIdx} 
                          className="flex items-center gap-1.5 text-slate-700"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0052A3]/60 shrink-0" />
                          {route && navigateTo ? (
                            <button
                              type="button"
                              onClick={() => navigateTo(route)}
                              className="truncate font-medium text-left hover:text-[#0052A3] hover:underline cursor-pointer transition-colors"
                              title={`Accéder à la page dédiée Location Monte-Meuble ${city}`}
                            >
                              {city}
                            </button>
                          ) : (
                            <span className="truncate font-medium">{city}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Discreet Trust Footer */}
              <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <ShieldCheck size={14} className="text-[#0052A3]" />
                  Assurance RC Pro jusqu'à 5M CHF
                </span>
                <span className="text-[#0052A3] font-semibold">
                  Démarches voirie prises en charge
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Compact Fast Action Banner */}
        <div className="rounded-2xl bg-[#0A192F] text-white p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="text-center sm:text-left">
            <h4 className="text-sm sm:text-base font-display font-bold text-white">
              Votre meuble ne passe pas dans la cage d'escalier ?
            </h4>
            <p className="text-xs text-slate-300">
              Intervention sur réservation ou créneau d'urgence selon planning à Genève et Vaud.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={onOpenQuoteModal}
              className="px-4 py-2.5 bg-[#E10600] hover:bg-[#C80500] text-white text-xs font-bold rounded-lg uppercase tracking-wider transition-all shadow-md hover:-translate-y-0.5 cursor-pointer inline-flex items-center gap-1.5"
            >
              <span>Devis WhatsApp</span>
              <ArrowRight size={13} />
            </button>
            <a
              href="tel:0800825925"
              className="px-3.5 py-2.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Phone size={13} />
              <span>0800 825 925</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
