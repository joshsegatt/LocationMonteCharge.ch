import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FaqItem[] = [
  {
    category: "Réservation & Processus",
    question: "Comment louer un monte-meuble à Genève ou dans le canton de Vaud ?",
    answer: "La réservation s'effectue en quelques clics via notre bouton « Demander un devis » (directement sur WhatsApp), par notre formulaire en ligne ou par téléphone gratuit au 0800 825 925. Les experts de BatiMove Sàrl vérifient l'accès technique de votre bâtiment (rue, cour intérieure, balcon ou fenêtre), planifient le créneau et dépêchent un camion élévateur avec son technicien opérateur certifié SUVA."
  },
  {
    category: "Capacités & Limites",
    question: "Quelle est la hauteur maximale et la charge utile de vos monte-charges ?",
    answer: "Nos monte-meubles télescopiques atteignent jusqu'au 10ᵉ étage (plus de 30 mètres de hauteur) avec une capacité de charge utile certifiée de 500 kg par montée. Cette puissance permet d'élever sans difficulté aussi bien des canapés d'angle, pianos à queue, baies vitrées et cuisines que des palettes de carrelage, plaques de plâtre ou gravats de chantier."
  },
  {
    category: "Législation & Voirie",
    question: "L'autorisation de stationnement sur le domaine public (voirie) est-elle prise en charge ?",
    answer: "Oui, à 100%. BatiMove Sàrl prend en charge toutes les formalités officielles d'autorisation d'occupation du domaine public auprès du Service de l'espace public (SEP) de la Ville de Genève ainsi que des municipalités vaudoises (Lausanne, Nyon, Morges, etc.). Nous installons également le balisage de sécurité obligatoire (panneaux et cônes homologués)."
  },
  {
    category: "Appartements & Particuliers",
    question: "Peut-on monter des meubles volumineux par le balcon ou la fenêtre d'un appartement ?",
    answer: "C'est la mission principale de notre flotte ! Lorsqu'un canapé, un sommier, un piano ou un frigo américain ne passe pas par l'ascenseur ou la cage d'escalier étroite, notre nacelle élévatrice le dépose directement sur votre balcon ou à l'intérieur de la pièce par la fenêtre, sans aucun risque d'abîmer les murs de la copropriété."
  },
  {
    category: "Entreprise & Synergie",
    question: "Quelle est la relation entre ce site et l'entreprise BatiMove Sàrl ?",
    answer: "Ce service spécialisé de monte-charge est opéré directement par BatiMove Sàrl (CHE-143.091.230), entreprise suisse de référence basée Rue De-Monthoux 64 à Genève, également accessible sur batimove.ch. Nous disposons d'une assurance Responsabilité Civile professionnelle entreprise de 5 millions de francs suisses garantissant chaque opération."
  },
  {
    category: "Sécurité & Personnel",
    question: "Le technicien opérateur est-il obligatoirement inclus avec la location ?",
    answer: "Oui, un opérateur qualifié et formé aux normes suisses SUVA est obligatoirement fourni avec la machine. Il s'occupe de la mise à niveau, du déploiement de l'échelle télescopique, du chargement sécurisé sur le plateau et du pilotage des commandes pour une sécurité totale des biens et des personnes."
  }
];

export default function FaqSection({ onOpenQuoteModal }: { onOpenQuoteModal?: () => void }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-white border-t border-slate-100 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center justify-center gap-2 text-[#00A388] text-xs sm:text-sm font-bold uppercase tracking-widest mb-3 text-center">
            <HelpCircle size={15} className="shrink-0" />
            <span>Foire Aux Questions • FAQ Suisse</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tight leading-tight mb-4">
            Tout Savoir Sur La <br className="hidden sm:block" />
            <span className="text-[#053229]">Location De Monte-Charge</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Réponses aux questions les plus fréquentes pour vos passages par fenêtre, déménagements d'appartements et chantiers à Genève, Vaud et en Suisse Romande.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={faq.question}
                className="rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-all overflow-hidden shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-[#00A388] uppercase tracking-wider block">
                      {faq.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-display font-bold text-slate-900 leading-snug">
                      {faq.question}
                    </h3>
                  </div>
                  <div className={"shrink-0 w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#053229] transition-transform duration-300 " + (isOpen ? "rotate-180 bg-[#053229] text-white border-transparent" : "")}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-600 text-sm sm:text-[15px] leading-relaxed border-t border-slate-200/40">
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Help Banner CTA */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#021813] to-[#053229] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-display font-bold text-white">
              Une question spécifique pour votre passage par fenêtre ou balcon ?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Nos conseillers techniques BatiMove Sàrl vous répondent immédiatement par WhatsApp ou appel gratuit.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenQuoteModal}
              className="px-6 py-3 bg-[#00876c] hover:bg-[#009b7c] text-white text-xs sm:text-sm font-bold rounded-lg uppercase tracking-wider transition-all shadow-md hover:-translate-y-0.5 cursor-pointer"
            >
              Demander un devis
            </button>
            <a
              href="tel:0800825925"
              className="px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <PhoneCall size={16} />
              <span>0800 825 925</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
