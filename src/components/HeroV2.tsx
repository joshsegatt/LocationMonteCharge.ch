import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Phone, Star, ArrowUpRight } from 'lucide-react';
import { waLink, PHONE_TEL, PHONE_DISPLAY } from '../lib/contact';
import { WhatsAppGlyph } from './WhatsAppGlyph';
import { servicePages } from '../data/servicePages';
import { SERVICE_NAV } from '../lib/serviceNav';
import { entrancesEnabled } from '../lib/firstPaint';

interface HeroV2Props {
  onOpenQuoteModal?: () => void;
  onImageClick?: (src: string) => void;
  navigateTo?: (page: string) => void;
}

const EASE = [0.23, 1, 0.32, 1] as const;

// Ombre du hero sur grand écran. Elle suit la colonne de texte (alignée sur le conteneur
// max-w-7xl) et s'éteint avant l'échelle, quelle que soit la largeur de la fenêtre.
const TEXT_LEFT = 'max(3rem, calc((100vw - 80rem) / 2 + 3rem))';
const SCRIM = `linear-gradient(90deg, rgba(10,25,47,0.78) 0, rgba(10,25,47,0.72) calc(${TEXT_LEFT} + 22rem), rgba(10,25,47,0.52) calc(${TEXT_LEFT} + 38rem), rgba(10,25,47,0.2) calc(${TEXT_LEFT} + 48rem), rgba(10,25,47,0) calc(${TEXT_LEFT} + 58rem))`;

// Largeur réelle d'affichage de la photo (object-cover). Sur téléphone et tablette la section
// est plus haute que large : la photo est calée sur la hauteur et déborde l'écran en largeur.
// Les mêmes valeurs servent au <link rel="preload"> de index.html.
const HERO_SIZES_PORTRAIT = '160vw';
const HERO_SIZES_WIDE = '(max-width: 1023px) 130vw, 100vw';

const SPECS: { value: React.ReactNode; label: string }[] = [
  { value: <>10<sup>e</sup>&nbsp;étage</>, label: 'hauteur maximale' },
  { value: <>500&nbsp;kg</>, label: 'par montée' },
  { value: 'Opérateur', label: 'formé SUVA, compris' },
  { value: 'Voirie', label: 'prise en charge' },
];

// Hero de l'accueil : photo d'intervention réelle en pleine largeur, puis le sélecteur
// de cas qui chevauche le bas de la photo.
export default function HeroV2({ onOpenQuoteModal, navigateTo }: HeroV2Props) {
  const reduce = useReducedMotion();
  // Pas d'animation d'entrée sur le HTML pré-rendu : seulement après une navigation interne.
  const [entrance] = useState(entrancesEnabled);

  // Entrée du premier écran : un seul mouvement, décalé de quelques dixièmes par bloc.
  const rise = (delay: number) =>
    reduce || !entrance
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay } },
        };

  return (
    <>
      <section className="relative isolate bg-[#0A192F] text-white">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <picture>
            {/* Sur téléphone la photo est calée sur la hauteur de la section : elle s'affiche plus large que l'écran. */}
            <source
              media="(max-width: 767px)"
              type="image/avif"
              srcSet="/assets/hero/facade-portrait-1000.avif 1000w, /assets/hero/facade-portrait-1400.avif 1400w"
              sizes={HERO_SIZES_PORTRAIT}
            />
            <source
              media="(max-width: 767px)"
              type="image/webp"
              srcSet="/assets/hero/facade-portrait-1000.webp 1000w, /assets/hero/facade-portrait-1400.webp 1400w"
              sizes={HERO_SIZES_PORTRAIT}
            />
            <source
              type="image/avif"
              srcSet="/assets/hero/facade-wide-960.avif 960w, /assets/hero/facade-wide-1360.avif 1360w, /assets/hero/facade-wide-1920.avif 1920w"
              sizes={HERO_SIZES_WIDE}
            />
            <img
              src="/assets/hero/facade-wide-1360.webp"
              srcSet="/assets/hero/facade-wide-960.webp 960w, /assets/hero/facade-wide-1360.webp 1360w, /assets/hero/facade-wide-1920.webp 1920w"
              sizes={HERO_SIZES_WIDE}
              alt="Monte-meuble BatiMove déployé le long de la façade d’un immeuble, jusqu’aux étages supérieurs"
              width={1360}
              height={1500}
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-[50%_22%] md:object-[60%_8%]"
            />
          </picture>
          {/* Ombre neutre, sans teinte : uniforme tant que le texte couvre la photo, puis
              limitée à la colonne de texte pour laisser l'échelle et la façade au naturel. */}
          <div className="absolute inset-0 bg-[#0A192F]/60 lg:hidden" />
          <div className="absolute inset-0 hidden lg:block" style={{ background: SCRIM }} />
          <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#0A192F]/55 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-28 sm:pt-36 lg:pt-40 pb-36 sm:pb-44 lg:min-h-[min(100svh,900px)] flex flex-col justify-center">
          <div className="max-w-[50rem]">
            <motion.h1
              {...rise(0)}
              className="font-display font-semibold text-[38px] leading-[1.04] sm:text-[56px] xl:text-[62px] tracking-[-0.035em] text-white"
            >
              <span className="block">Trop grand pour l’escalier&nbsp;?</span>
              <span className="block">On passe par la fenêtre.</span>
            </motion.h1>

            <motion.p
              {...rise(0.08)}
              className="mt-5 sm:mt-7 max-w-[34rem] text-[16px] sm:text-[19px] leading-[1.55] text-white/85"
            >
              Location de monte-meuble avec opérateur à Genève et dans le canton de Vaud. Canapé, piano, armoire ou
              vitrage montent par la façade, sans passer par la cage d’escalier.
            </motion.p>

            <motion.div {...rise(0.16)}>
              <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row gap-3">
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="press inline-flex items-center justify-center gap-2.5 h-14 px-7 rounded-full bg-[#E10600] hover:bg-[#C80500] text-white text-[16px] font-semibold"
                >
                  <WhatsAppGlyph className="w-5 h-5" />
                  Devis gratuit sur WhatsApp
                </a>
                <a
                  href={PHONE_TEL}
                  className="press inline-flex items-center justify-center gap-2.5 h-14 px-7 rounded-full border border-white/40 hover:border-white text-white text-[16px] transition-colors"
                >
                  <Phone size={17} aria-hidden="true" />
                  <span className="font-display font-semibold tabular-nums">{PHONE_DISPLAY}</span>
                  <span className="text-white/75 text-[14px]">gratuit</span>
                </a>
              </div>

              <p className="mt-4 max-w-[34rem] text-[14px] leading-relaxed text-white/80">
                Envoyez une photo de l’objet, l’étage et la commune. Nous répondons avec le devis.{' '}
                <button
                  type="button"
                  onClick={onOpenQuoteModal}
                  className="font-semibold text-white underline underline-offset-4 decoration-white/45 hover:decoration-white transition-colors"
                >
                  Remplir le formulaire
                </button>
              </p>

              <a
                href="https://www.google.com/search?q=Location+monte-meuble+BATIMOVE+SARL"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2.5 py-1 text-[14px] text-white/90 hover:text-white transition-colors"
              >
                <span className="flex gap-0.5" aria-hidden="true">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                  ))}
                </span>
                <span className="underline underline-offset-4 decoration-white/40">5,0 sur Google, 4&nbsp;avis</span>
              </a>
            </motion.div>

            <motion.dl
              {...rise(0.24)}
              className="mt-8 sm:mt-10 pt-6 max-w-[44rem] border-t border-white/20 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4"
            >
              {SPECS.map((s) => (
                <div key={s.label}>
                  <dt className="font-display font-semibold text-[17px] sm:text-[18px] tracking-[-0.01em] text-white">
                    {s.value}
                  </dt>
                  <dd className="mt-0.5 text-[13px] leading-snug text-white/75">{s.label}</dd>
                </div>
              ))}
            </motion.dl>
          </div>
        </div>
      </section>

      <div className="relative z-10 -mt-24 sm:-mt-28">
        <motion.div {...rise(0.32)} className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="rounded-[28px] bg-white p-5 sm:p-8 shadow-[0_28px_70px_-28px_rgba(10,25,47,0.45)]">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-1.5 sm:gap-8">
              <h2 className="shrink-0 whitespace-nowrap font-display font-semibold text-[24px] sm:text-[30px] leading-[1.1] tracking-[-0.03em] text-[#0A192F]">
                Que faut-il monter&nbsp;?
              </h2>
              <p className="text-[15px] leading-relaxed text-slate-600 sm:text-right">
                Choisissez votre cas pour voir comment se déroule l’intervention.
              </p>
            </div>

            <ul className="mt-5 sm:mt-7 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-2.5 sm:gap-3">
              {SERVICE_NAV.map(({ slug, Icon }) => (
                <li key={slug}>
                  <a
                    href={`/${slug}`}
                    onClick={(e) => {
                      if (!navigateTo) return;
                      e.preventDefault();
                      navigateTo(slug);
                    }}
                    className="press group flex h-full min-h-[120px] sm:min-h-[136px] flex-col justify-between rounded-[20px] bg-[#F1F5F8] hover:bg-[#E2E8F0] p-4 sm:p-5 transition-colors duration-200"
                  >
                    <span className="flex items-start justify-between">
                      <Icon size={28} strokeWidth={1.5} className="text-[#0052A3]" aria-hidden="true" />
                      <ArrowUpRight
                        size={18}
                        aria-hidden="true"
                        className="text-slate-500 group-hover:text-[#0A192F] transition-colors duration-200"
                      />
                    </span>
                    <span className="mt-4 font-display font-semibold text-[15px] sm:text-[17px] leading-[1.2] tracking-[-0.01em] text-[#0A192F]">
                      {servicePages[slug].navLabel}
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="press group flex h-full min-h-[120px] sm:min-h-[136px] flex-col justify-between rounded-[20px] bg-[#0A192F] hover:bg-[#0F2440] p-4 sm:p-5 transition-colors duration-200"
                >
                  <span className="flex items-start justify-between text-white">
                    <WhatsAppGlyph className="w-7 h-7" />
                    <ArrowUpRight size={18} aria-hidden="true" className="text-white/70 group-hover:text-white transition-colors duration-200" />
                  </span>
                  <span className="mt-4 font-display font-semibold text-[15px] sm:text-[17px] leading-[1.2] tracking-[-0.01em] text-white">
                    Autre objet
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </>
  );
}
