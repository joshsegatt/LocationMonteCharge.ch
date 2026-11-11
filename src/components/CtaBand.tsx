import React from 'react';
import { Phone } from 'lucide-react';
import { waLink, PHONE_TEL, PHONE_DISPLAY, DEFAULT_WA_TEXT } from '../lib/contact';
import { WhatsAppGlyph } from './WhatsAppGlyph';
import { frTypoText } from '../lib/typo';
import { avifSrcSet } from '../lib/photo';
import Reveal from './Reveal';

interface CtaBandProps {
  title?: string;
  text?: string;
  ctaLabel?: string;
  waText?: string;
}

const PHOTO = '/assets/work/19.webp';
const PHOTO_SIZES = '(min-width: 1024px) 46vw, 100vw';

const FACTS: { value: React.ReactNode; label: string }[] = [
  { value: 'BatiMove Sàrl', label: 'entreprise genevoise' },
  { value: <>CHF&nbsp;5’000’000</>, label: 'RC professionnelle' },
  { value: 'Genève et Vaud', label: 'zone d’intervention' },
];

// Dernier appel à l'action de la page. Pas de carte : une bande bleu nuit sur toute la largeur,
// qui se prolonge dans le pied de page, avec la photo d'un opérateur qui se fond dans le fond.
export default function CtaBand({
  title = "Votre meuble ne passe pas par l'escalier ?",
  text = "Envoyez une photo de l'objet, l'étage et la commune sur WhatsApp. Nous répondons avec un devis gratuit et sans engagement.",
  ctaLabel = 'Devis gratuit sur WhatsApp',
  waText = DEFAULT_WA_TEXT,
}: CtaBandProps) {
  const avif = avifSrcSet(PHOTO);
  return (
    <section className="relative bg-[#0A192F] text-white overflow-hidden">
      {/* Photo réelle : bandeau en haut sur mobile, moitié droite pleine hauteur sur desktop */}
      <figure className="relative h-[74vw] min-h-[240px] max-h-[440px] lg:absolute lg:inset-y-0 lg:right-0 lg:w-[46%] lg:h-auto lg:min-h-0 lg:max-h-none">
        <picture>
          {avif && <source type="image/avif" srcSet={avif} sizes={PHOTO_SIZES} />}
          <img
            src={PHOTO}
            alt="Opérateur BatiMove devant le camion monte-meuble, échelle déployée contre la façade"
            width={1536}
            height={2048}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-[50%_50%] lg:object-center"
          />
        </picture>
        {/* La photo se fond dans le bleu nuit : vers le bas sur mobile, vers le texte sur desktop */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0A192F] to-transparent lg:hidden" aria-hidden="true" />
        <div className="hidden lg:block absolute inset-y-0 left-0 w-3/5 bg-gradient-to-r from-[#0A192F] via-[#0A192F]/50 to-transparent" aria-hidden="true" />
      </figure>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <Reveal className="-mt-5 pb-12 sm:pb-16 lg:mt-0 lg:w-[54%] lg:pr-12 lg:py-24 xl:py-28">
          <h2 className="font-display font-semibold text-[34px] sm:text-[48px] leading-[1.05] tracking-[-0.035em] text-white text-balance max-w-[16ch]">
            {frTypoText(title)}
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-white/80 max-w-[31rem]">{frTypoText(text)}</p>

          <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row sm:flex-wrap gap-3">
            <a
              href={waLink(waText)}
              target="_blank"
              rel="noopener noreferrer"
              className="press inline-flex items-center justify-center gap-2.5 h-14 px-6 sm:px-7 rounded-full bg-[#E10600] hover:bg-[#C80500] text-white text-[16px] font-semibold whitespace-nowrap"
            >
              <WhatsAppGlyph className="w-5 h-5" />
              {ctaLabel}
            </a>
            <a
              href={PHONE_TEL}
              className="press inline-flex items-center justify-center gap-2.5 h-14 px-7 rounded-full border border-white/40 hover:border-white text-white text-[16px] whitespace-nowrap"
            >
              <Phone size={17} aria-hidden="true" />
              <span className="font-display font-semibold tabular-nums">{PHONE_DISPLAY}</span>
              <span className="text-white/70">gratuit</span>
            </a>
          </div>

          {/* Mobile : lignes fines valeur / libellé. À partir de sm : trois colonnes, valeur au-dessus. */}
          <dl className="mt-9 sm:mt-12 max-w-[34rem] border-t border-white/15 divide-y divide-white/15 sm:divide-y-0 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:pt-6">
            {FACTS.map((f) => (
              <div
                key={f.label}
                className="flex flex-row-reverse items-baseline justify-between gap-4 py-3.5 sm:py-0 sm:flex-col-reverse sm:justify-end sm:items-start sm:gap-0"
              >
                <dt className="text-[15px] sm:text-[13px] leading-snug text-white/70 sm:mt-1">{f.label}</dt>
                <dd className="font-display text-[16px] sm:text-lg font-semibold tracking-[-0.02em] text-white whitespace-nowrap">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
