import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { waLink, PHONE_TEL, PHONE_DISPLAY } from '../lib/contact';
import { HOME_FAQS, type FaqItem } from '../data/homeFaqs';

export type { FaqItem };

interface FaqSectionProps {
  faqs?: FaqItem[];
  title?: string;
  tone?: 'white' | 'tint';
  onOpenQuoteModal?: () => void;
}

const LINK = 'text-[#0A192F] font-semibold underline underline-offset-4 decoration-slate-300 hover:decoration-[#0A192F] transition-colors';

export default function FaqSection({ faqs = HOME_FAQS, title = 'Questions fréquentes', tone = 'tint' }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className={`${tone === 'tint' ? 'bg-[#F1F5F8]' : 'bg-white'} py-16 md:py-24`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
        <div className="lg:col-span-4">
          <h2 className="font-display font-semibold text-[32px] sm:text-[40px] leading-[1.08] tracking-[-0.03em] text-[#0A192F]">
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 max-w-sm">
            Une autre question sur votre accès, votre objet ou la date&nbsp;?{' '}
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className={LINK}>
              Écrivez-nous sur WhatsApp
            </a>
            , avec une photo si possible, ou appelez le{' '}
            <a href={PHONE_TEL} className={`${LINK} tabular-nums whitespace-nowrap`}>
              {PHONE_DISPLAY}
            </a>{' '}
            (gratuit).
          </p>
        </div>

        <ul className="lg:col-span-8 border-t border-slate-300">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const id = `faq-${idx}`;
            return (
              <li key={faq.question} className="border-b border-slate-300">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    aria-controls={id}
                    className="group w-full flex items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="font-display font-semibold text-[17px] sm:text-lg tracking-[-0.01em] text-[#0A192F] transition-colors group-hover:text-[#0052A3]">
                      {faq.question}
                    </span>
                    <Plus
                      size={20}
                      aria-hidden="true"
                      className={`shrink-0 text-[#0A192F] transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}
                    />
                  </button>
                </h3>
                {/* Ouverture animée par la hauteur de ligne de grille, sans mesurer le contenu */}
                <div
                  id={id}
                  inert={!isOpen}
                  className={`grid transition-[grid-template-rows] duration-200 motion-reduce:transition-none ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 pr-10 text-base leading-relaxed text-slate-600 max-w-2xl">{faq.answer}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
