import React from 'react';
import { Phone, ChevronRight, Star } from 'lucide-react';
import { waLink, PHONE_TEL, PHONE_DISPLAY, DEFAULT_WA_TEXT } from '../lib/contact';
import { WhatsAppGlyph } from './WhatsAppGlyph';
import { frTypoText } from '../lib/typo';
import { avifSrcSet, avifMobileSrcSet, PAGE_HERO_SIZES, PAGE_HERO_MOBILE_MEDIA } from '../lib/photo';

export interface PageHeroProps {
  line1: string;
  line2: string;
  lead: string;
  photo: string;
  photoAlt: string;
  photoWidth?: number;
  photoHeight?: number;
  captionTitle: string;
  captionText: string;
  ctaLabel?: string;
  waText?: string;
  breadcrumb?: { label: string; onHome: () => void; section: string };
  onOpenQuoteModal?: () => void;
  onImageClick?: (src: string) => void;
}

// L'ordinal est composé avec <sup> : la police des titres n'a pas de « ᵉ ».
const SPECS: { label: string; value: React.ReactNode }[] = [
  { label: 'hauteur maximale', value: <>10<sup>e</sup>&nbsp;étage</> },
  { label: 'par montée', value: <>500&nbsp;kg</> },
  { label: 'formé SUVA, compris', value: 'Opérateur' },
  { label: 'démarches prises en charge', value: 'Voirie' },
];

export default function PageHero({
  line1,
  line2,
  lead,
  photo,
  photoAlt,
  photoWidth = 1200,
  photoHeight = 1600,
  captionTitle,
  captionText,
  ctaLabel = 'Devis gratuit sur WhatsApp',
  waText = DEFAULT_WA_TEXT,
  breadcrumb,
  onOpenQuoteModal,
  onImageClick,
}: PageHeroProps) {
  const avif = avifSrcSet(photo);
  const avifMobile = avifMobileSrcSet(photo);
  return (
    <section className="relative bg-white text-[#0A192F] overflow-hidden lg:min-h-[min(100svh,860px)]">
      {/* Photo réelle : bandeau sur mobile, moitié droite pleine hauteur sur desktop */}
      <figure className="relative mt-16 h-[28svh] min-h-[190px] max-h-[380px] sm:h-[38svh] sm:min-h-[240px] lg:mt-0 lg:max-h-none lg:absolute lg:inset-y-0 lg:right-0 lg:w-[44%] lg:h-auto">
        <picture>
          {avifMobile && <source type="image/avif" media={PAGE_HERO_MOBILE_MEDIA} srcSet={avifMobile} sizes="100vw" />}
          {avif && <source type="image/avif" srcSet={avif} sizes={PAGE_HERO_SIZES} />}
          <img
            src={photo}
            alt={photoAlt}
            width={photoWidth}
            height={photoHeight}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-[50%_30%]"
          />
        </picture>
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0A192F]/70 to-transparent" aria-hidden="true" />
        {onImageClick && (
          <button
            type="button"
            onClick={() => onImageClick(photo)}
            aria-label="Agrandir la photo"
            className="absolute inset-0 w-full h-full cursor-zoom-in focus-visible:-outline-offset-4"
          />
        )}
        <figcaption className="absolute left-4 right-4 bottom-4 sm:left-6 sm:bottom-6 text-white text-[13px] leading-snug pointer-events-none">
          {frTypoText(captionText)}, {captionTitle}
        </figcaption>
      </figure>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="lg:w-[56%] lg:pr-12 xl:pr-16 pt-6 pb-12 sm:pt-10 lg:pt-32 xl:pt-36 lg:pb-16">
          {breadcrumb && (
            <nav aria-label="Fil d’Ariane" className="flex flex-wrap items-center gap-1.5 text-[13px] text-slate-500 mb-5 lg:mb-8">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  breadcrumb.onHome();
                }}
                className="underline underline-offset-4 decoration-slate-300 hover:text-[#0A192F] hover:decoration-[#0A192F] transition-colors"
              >
                Accueil
              </a>
              <ChevronRight size={12} className="text-slate-400" aria-hidden="true" />
              <span>{breadcrumb.section}</span>
              <ChevronRight size={12} className="text-slate-400" aria-hidden="true" />
              <span className="text-[#0A192F]" aria-current="page">{breadcrumb.label}</span>
            </nav>
          )}

          <h1 className="font-display font-semibold text-[38px] leading-[1.04] sm:text-[56px] xl:text-[68px] tracking-[-0.035em] text-[#0A192F]">
            <span className="block">{frTypoText(line1)}</span>
            <span className="block">{frTypoText(line2)}</span>
          </h1>

          <p className="mt-5 sm:mt-7 max-w-[33rem] text-[16px] sm:text-[19px] leading-[1.55] text-slate-600">
            {frTypoText(lead)}
          </p>

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
              className="press inline-flex items-center justify-center gap-2.5 h-14 px-7 rounded-full border border-slate-300 hover:border-[#0A192F] text-[#0A192F] text-[16px] whitespace-nowrap"
            >
              <Phone size={17} aria-hidden="true" />
              <span className="font-display font-semibold tabular-nums">{PHONE_DISPLAY}</span>
              <span className="text-slate-500">gratuit</span>
            </a>
          </div>

          <p className="mt-4 text-sm text-slate-500 leading-relaxed max-w-[33rem]">
            Envoyez une photo de l’objet, l’étage et la commune. Nous répondons avec le devis.{' '}
            {onOpenQuoteModal && (
              <button
                type="button"
                onClick={onOpenQuoteModal}
                className="text-[#0A192F] underline underline-offset-4 decoration-slate-300 hover:decoration-[#0A192F] transition-colors"
              >
                Remplir le formulaire
              </button>
            )}
          </p>

          <dl className="mt-10 sm:mt-14 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-6 border-t border-slate-200 pt-6">
            {SPECS.map((s) => (
              <div key={s.label} className="flex flex-col-reverse justify-end">
                <dt className="text-[13px] leading-snug text-slate-500 mt-1">{s.label}</dt>
                <dd className="font-display text-[17px] sm:text-lg font-semibold tracking-[-0.02em] text-[#0A192F]">{s.value}</dd>
              </div>
            ))}
          </dl>

          <a
            href="https://www.google.com/search?q=Location+monte-meuble+BATIMOVE+SARL"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-7 inline-flex items-center gap-2.5 text-sm text-slate-600 hover:text-[#0A192F] transition-colors"
          >
            <span className="flex gap-0.5 text-[#0A192F]" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
              ))}
            </span>
            <span className="underline underline-offset-4 decoration-slate-300 group-hover:decoration-[#0A192F] transition-colors">
              5,0 sur Google, 4 avis
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
