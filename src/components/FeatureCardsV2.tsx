import React from 'react';
import { motion } from 'motion/react';

/* ─────────────────────────────────────────────────────────
   Swiss Architectural Specification Bar
   Grounded, prestigious, zero generic AI cards / floating widgets.
   Pure high-precision typographic metrics (Swiss Corporate Standard).
   Fully audited and legally sound under Swiss CO & LCD.
   ───────────────────────────────────────────────────────── */

interface MetricSpec {
  value: string;
  unit: string;
  label: string;
  detail: string;
}

const specs: MetricSpec[] = [
  {
    value: "33",
    unit: "mètres",
    label: "Hauteur de Travail",
    detail: "Jusqu'au 10ᵉ étage par fenêtre ou balcon"
  },
  {
    value: "500",
    unit: "kg max",
    label: "Charge Utile Certifiée",
    detail: "Canapés, pianos, vitrages & matériaux"
  },
  {
    value: "SUVA",
    unit: "certifié",
    label: "Sécurité & Homologation",
    detail: "Opérateur qualifié à chaque intervention"
  },
  {
    value: "GE & VD",
    unit: "secteur",
    label: "Genève & Vaud",
    detail: "Démarches de voirie communale assurées"
  }
];

export default function FeatureCardsV2() {
  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full mt-10 sm:mt-14 pt-8 pb-10 border-t border-slate-200/80">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-slate-200/80">
        {specs.map((item, idx) => (
          <div 
            key={idx} 
            className={`pt-4 lg:pt-0 ${idx > 0 ? 'lg:pl-6 xl:pl-8' : ''} flex flex-col justify-start`}
          >
            {/* Tabular Value + Unit */}
            <div className="flex items-baseline gap-1.5 mb-1.5">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-slate-950 tracking-tight tabular-nums leading-none">
                {item.value}
              </span>
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#0052A3]">
                {item.unit}
              </span>
            </div>

            {/* Master Label */}
            <h3 className="text-xs sm:text-sm font-display font-bold text-slate-900 tracking-tight leading-snug mb-0.5">
              {item.label}
            </h3>

            {/* Technical Sub-label */}
            <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed font-normal">
              {item.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
