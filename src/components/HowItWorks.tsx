import React, { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useReducedMotionSafe } from '../lib/useReducedMotionSafe';
import { avifSrcSet } from '../lib/photo';
import { frTypo } from '../lib/typo';
import { waLink } from '../lib/contact';
import Reveal from './Reveal';

export interface StepPoint {
  label: string;
  value: string;
}

export interface Step {
  title: string;
  text: string;
  /** Ce que l'étape contient concrètement : trois lignes au plus, des faits déjà validés. */
  points?: StepPoint[];
}

const HOME_STEPS: Step[] = frTypo([
  {
    title: 'Envoyez une photo',
    text: "Une photo de l'objet et de la fenêtre ou du balcon suffit pour commencer. Ajoutez l'étage et la commune, nous vérifions l'accès à la façade avant de chiffrer.",
    points: [
      { label: 'À envoyer', value: "Photo de l'objet, étage et commune" },
      { label: 'Accès vérifié', value: 'Rue, cour, balcon ou fenêtre' },
      { label: 'Par téléphone', value: '0800 825 925, appel gratuit' },
    ],
  },
  {
    title: 'Recevez votre devis',
    text: "Le devis est gratuit et sans engagement. Il comprend le camion monte-meuble, son opérateur et la demande d'occupation du domaine public auprès de votre commune.",
    points: [
      { label: 'Compris', value: 'Camion monte-meuble et opérateur formé SUVA' },
      { label: 'Voirie', value: 'Démarches auprès de la commune comprises' },
      { label: 'Date', value: 'Fixée avec vous' },
    ],
  },
  {
    title: 'On monte par la fenêtre',
    text: "Le jour de l'intervention, le camion se stabilise au pied de l'immeuble, l'échelle se déploie jusqu'à votre fenêtre ou balcon et l'objet est déposé directement chez vous.",
    points: [
      { label: 'Capacité', value: "Jusqu'au 10ᵉ étage, 500 kg par montée" },
      { label: 'Sécurité', value: 'Balisage posé, opérateur SUVA aux commandes' },
      { label: 'Assurance', value: "RC professionnelle jusqu'à CHF 5'000'000" },
    ],
  },
]);

// Une teinte par carte, toutes issues de la palette.
const TONES = [
  { card: 'bg-[#F1F5F8]', title: 'text-[#0A192F]', body: 'text-slate-600', num: 'text-[#0052A3]', rule: 'border-[#0A192F]/10' },
  { card: 'bg-[#0F2440]', title: 'text-white', body: 'text-white/80', num: 'text-white/60', rule: 'border-white/15' },
  { card: 'bg-[#0052A3]', title: 'text-white', body: 'text-white/85', num: 'text-white/70', rule: 'border-white/20' },
  { card: 'bg-[#0A192F]', title: 'text-white', body: 'text-white/80', num: 'text-white/60', rule: 'border-white/15' },
];

// Photos d'interventions réelles, dans l'ordre du déroulé : la façade, le camion balisé,
// l'échelle déployée, l'opérateur aux commandes.
const MEDIA = [
  { src: '/assets/work/15.webp', alt: 'Monte-meuble déployé le long d’une façade, vu depuis la rue' },
  { src: '/assets/work/21.webp', alt: 'Camion monte-meuble BatiMove stabilisé au pied d’un immeuble, cône de balisage posé' },
  { src: '/assets/work/real-geneva-1.webp', alt: 'Échelle du monte-meuble déployée jusqu’au dernier étage, opérateur au pied du camion' },
  { src: '/assets/work/real-geneva-3.webp', alt: 'Opérateur BatiMove aux commandes du monte-meuble' },
];

interface StepCardProps {
  step: Step;
  index: number;
  count: number;
  progress: MotionValue<number>;
  animate: boolean;
  key?: React.Key;
}

function StepCard({ step, index, count, progress, animate }: StepCardProps) {
  const tone = TONES[index % TONES.length];
  const media = MEDIA[index % MEDIA.length];
  // Une carte recule légèrement à mesure que les suivantes viennent la recouvrir.
  const depth = count - 1 - index;
  const scale = useTransform(progress, [index / count, Math.max((count - 1) / count, (index + 1) / count)], [1, 1 - depth * 0.035], {
    clamp: true,
  });

  return (
    <li
      className="[@media(min-height:780px)]:sticky lg:[@media(min-height:700px)]:sticky mb-4 md:mb-5 last:mb-0"
      style={{ top: `calc(var(--stick) + ${index} * var(--peek))` }}
    >
      <motion.div
        style={animate && depth > 0 ? { scale } : undefined}
        className={`origin-top grid lg:grid-cols-12 lg:grid-rows-[minmax(0,1fr)] lg:min-h-[27rem] overflow-hidden rounded-[28px] md:rounded-[36px] ${tone.card}`}
      >
        <div className="lg:col-span-7 flex flex-col justify-between gap-6 sm:gap-8 p-6 sm:p-9 lg:p-11">
          <div>
            <span
              aria-hidden="true"
              className={`block font-display font-semibold text-[44px] sm:text-[52px] leading-none tracking-[-0.04em] ${tone.num}`}
            >
              {index + 1}
            </span>
            <h3
              className={`mt-3 sm:mt-4 font-display font-semibold text-[26px] sm:text-[34px] leading-[1.08] tracking-[-0.03em] ${tone.title}`}
            >
              {step.title}
            </h3>
            <p className={`mt-2.5 sm:mt-3 max-w-[35rem] text-[16px] sm:text-[17px] leading-[1.55] ${tone.body}`}>
              {step.text}
            </p>
          </div>

          {step.points && step.points.length > 0 && (
            <dl className={`border-t ${tone.rule}`}>
              {step.points.map((point) => (
                <div
                  key={point.label}
                  className={`flex items-baseline gap-4 py-2.5 sm:py-3 border-b last:border-b-0 last:pb-0 ${tone.rule}`}
                >
                  <dt className={`w-[6.5rem] sm:w-36 shrink-0 text-[15px] leading-snug ${tone.body}`}>{point.label}</dt>
                  <dd className={`min-w-0 flex-1 text-[15px] sm:text-[16px] font-medium leading-snug ${tone.title}`}>
                    {point.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
        <div className="lg:col-span-5 px-2.5 pb-2.5 lg:p-2.5 lg:pl-0">
          {/* Le cadre porte la hauteur : l'image en absolu ne peut pas étirer la carte. */}
          <div className="relative h-44 sm:h-64 lg:h-full overflow-hidden rounded-[18px] md:rounded-[26px]">
            <picture>
              {avifSrcSet(media.src) && (
                <source type="image/avif" srcSet={avifSrcSet(media.src)} sizes="(min-width: 1024px) 34vw, 100vw" />
              )}
              <img
                src={media.src}
                alt={media.alt}
                width={900}
                height={1200}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </picture>
          </div>
        </div>
      </motion.div>
    </li>
  );
}

interface HowItWorksProps {
  steps?: Step[];
  title?: string;
  /** Une phrase qui situe le déroulé, à droite du titre. */
  intro?: string;
  /** Message prérempli du lien WhatsApp sous les cartes. */
  waText?: string;
}

const HOME_TITLE = 'Louer un monte-meuble en trois étapes';
const HOME_INTRO = frTypo(
  "Une photo, un devis, une intervention. BatiMove fournit le camion et l'opérateur et s'occupe de la voirie, à Genève et dans le canton de Vaud.",
);

// Les étapes s'empilent au défilement : chaque carte vient se poser sur la précédente.
export default function HowItWorks({ steps = HOME_STEPS, title = HOME_TITLE, intro = HOME_INTRO, waText }: HowItWorksProps) {
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start start', 'end start'] });

  return (
    <section id="comment" className="bg-white pt-20 md:pt-28 pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid gap-4 lg:grid-cols-12 lg:items-end lg:gap-10">
          <Reveal className="lg:col-span-7">
            <h2 className="font-display font-semibold text-[34px] sm:text-[48px] leading-[1.05] tracking-[-0.035em] text-[#0A192F]">
              {title}
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={0.08}>
            <p className="max-w-[34rem] text-[17px] sm:text-[18px] leading-[1.55] text-slate-600 lg:pb-1.5">{intro}</p>
          </Reveal>
        </div>

        <ol
          ref={listRef}
          className="mt-8 md:mt-12 [--stick:4.75rem] [--peek:0.75rem] md:[--stick:5.5rem] md:[--peek:1.125rem]"
        >
          {steps.map((s, i) => (
            <StepCard key={s.title} step={s} index={i} count={steps.length} progress={scrollYProgress} animate={!reduce} />
          ))}
        </ol>

        <p className="mt-8 md:mt-10 text-[16px] sm:text-[17px] leading-[1.55] text-slate-600">
          Un doute sur l’accès&#8239;?{' '}
          <a
            href={waLink(waText)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#0A192F] underline underline-offset-4 decoration-slate-300 hover:decoration-[#0A192F] transition-colors"
          >
            Envoyez une photo de la façade sur WhatsApp
          </a>
          , nous vous disons si le monte-meuble passe.
        </p>
      </div>
    </section>
  );
}
