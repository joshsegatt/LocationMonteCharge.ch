import React from 'react';
import { motion } from 'motion/react';

/* ─────────────────────────────────────────────────────────
   Ultra-Clean Minimalist Spec Console
   Seamless, invisible borders, zero clipart icons or tags.
   Pure high-precision typographic metrics (Apple Pro standard).
   ───────────────────────────────────────────────────────── */

interface MetricSpec {
  value: string;
  unit: string;
  label: string;
  detail: string;
  accent: string;
}

const specs: MetricSpec[] = [
  {
    value: "15",
    unit: "min",
    label: "Déploiement Express",
    detail: "Sur site à Genève & La Côte",
    accent: "text-[#38BDF8]"
  },
  {
    value: "10ᵉ",
    unit: "étage",
    label: "Hauteur Maximale",
    detail: "Passage direct fenêtre ou balcon",
    accent: "text-amber-400"
  },
  {
    value: "500",
    unit: "kg max",
    label: "Charge Utile",
    detail: "Canapés, pianos & matériaux",
    accent: "text-[#38BDF8]"
  },
  {
    value: "100%",
    unit: "inclus",
    label: "Sécurité & Voirie",
    detail: "Opérateur SUVA & Permis ville",
    accent: "text-emerald-400"
  }
];

export default function FeatureCardsV2() {
  return (
    <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full -mt-8 sm:-mt-12 lg:-mt-14 pb-12 sm:pb-16">
      {/* ── Seamless Glass Console with Ultra-Subtle/Invisible Borders ── */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative bg-[#0A192F]/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/[0.06] shadow-[0_20px_50px_rgba(0,0,0,0.4)] p-6 sm:p-8 overflow-hidden"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.06]">
          {specs.map((item, idx) => (
            <div 
              key={idx} 
              className={`pt-4 lg:pt-0 ${idx > 0 ? 'lg:pl-6 xl:pl-8' : ''} flex flex-col justify-start`}
            >
              {/* Tabular Value + Unit */}
              <div className="flex items-baseline gap-1.5 mb-2">
                <span className="text-3xl sm:text-4xl lg:text-[42px] font-display font-black text-white tracking-tight tabular-nums leading-none">
                  {item.value}
                </span>
                <span className={`text-xs sm:text-sm font-bold uppercase tracking-wider ${item.accent}`}>
                  {item.unit}
                </span>
              </div>

              {/* Master Label */}
              <h3 className="text-xs sm:text-sm font-display font-bold text-slate-100 tracking-tight leading-snug mb-1">
                {item.label}
              </h3>

              {/* Technical Sub-label */}
              <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed font-normal">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
