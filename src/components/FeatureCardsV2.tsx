import React from 'react';
import { motion } from 'motion/react';

const features = [
  {
    image: "/assets/features/securite-suva.jpg",
    category: "Normes & Sécurité",
    title: "Sécurité SUVA",
    desc: "Nous transportons vos biens en toute sécurité grâce à un matériel certifié.",
  },
  {
    image: "/assets/features/equipe-qualifiee.jpg",
    category: "Précision & Savoir-faire",
    title: "Équipe Qualifiée",
    desc: "Opérateurs formés pour des levages d'une précision millimétrique.",
  },
  {
    image: "/assets/features/intervention-rapide.jpg",
    category: "Réactivité Express",
    title: "Intervention Rapide",
    desc: "Déploiement en un temps record pour garantir vos délais de chantier.",
  },
  {
    image: "/assets/features/flotte-moderne.jpg",
    category: "Technologie Euro 6",
    title: "Flotte Moderne",
    desc: "Véhicules de dernière génération répondant aux normes environnementales.",
  }
];

export default function FeatureCardsV2() {
  return (
    <div id="services" className="relative z-20 -mt-24 md:-mt-36 max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7">
        {features.map((item, idx) => (
          <motion.div 
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="group bg-white rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.04),0_12px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_40px_rgba(5,50,41,0.12),0_24px_60px_rgba(0,0,0,0.08)] border border-slate-100/80 p-5 flex flex-col justify-between transform hover:-translate-y-2 transition-all duration-500 ease-out h-full"
          >
            <div>
              {/* Image Container with smooth zoom */}
              <div className="relative aspect-[16/11] w-full rounded-[18px] overflow-hidden mb-5 bg-slate-100 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)]">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content with Strong Contrast */}
              <div className="flex flex-col px-1">
                <span className="text-[10px] font-bold tracking-[0.18em] text-[#00A388] uppercase mb-1.5 block">
                  {item.category}
                </span>
                <h3 className="text-[18px] font-display font-bold text-[#053229] tracking-tight mb-2 group-hover:text-[#00A388] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-[13px] text-slate-600 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            </div>

            {/* Subtle Luxury Accent Line */}
            <div className="px-1 pt-4">
              <div className="w-7 h-[2px] bg-slate-200 group-hover:w-14 group-hover:bg-[#00A388] transition-all duration-500 rounded-full" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
