import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import { frTypo } from '../lib/typo';
import Reveal from './Reveal';

interface LocalSeoZonesProps {
  onOpenQuoteModal?: () => void;
  navigateTo?: (page: string) => void;
}

// Une carte par commune où nous avons une photo d'intervention prise sur place.
// Les autres communes figurent dans la liste, sans photo empruntée ailleurs.
const CARDS: { route: string; city: string; file: string; detail: string }[] = frTypo([
  { route: 'geneve', city: 'Genève', file: '11.webp', detail: 'Piano à queue au 8ᵉ étage, Florissant' },
  { route: 'carouge', city: 'Carouge', file: '6.webp', detail: 'Cour intérieure étroite, 2ᵉ étage' },
  { route: 'plainpalais', city: 'Plainpalais', file: '3.webp', detail: 'Matériaux de rénovation au 6ᵉ étage' },
  { route: 'eaux-vives', city: 'Eaux-Vives', file: '2.webp', detail: 'Déménagement au 4ᵉ étage' },
  { route: 'lausanne', city: 'Lausanne', file: '20.webp', detail: 'Meubles au 6ᵉ étage' },
  { route: 'nyon', city: 'Nyon', file: '4.webp', detail: 'Canapé monobloc au 3ᵉ étage' },
  { route: 'morges', city: 'Morges', file: '8.webp', detail: 'Cuisine en quartz au 4ᵉ étage' },
]);

const REGIONS: { name: string; cities: { label: string; route?: string }[] }[] = [
  {
    name: 'Canton de Genève',
    cities: [
      { label: 'Genève centre', route: 'geneve' },
      { label: 'Carouge', route: 'carouge' },
      { label: 'Plainpalais', route: 'plainpalais' },
      { label: 'Eaux-Vives', route: 'eaux-vives' },
      { label: 'Champel', route: 'eaux-vives' },
      { label: 'Cologny', route: 'eaux-vives' },
      { label: 'Meyrin', route: 'meyrin' },
      { label: 'Vernier', route: 'meyrin' },
      { label: 'Lancy' },
      { label: 'Servette' },
      { label: 'Chêne-Bougeries' },
      { label: 'Versoix' },
    ],
  },
  {
    name: 'Canton de Vaud',
    cities: [
      { label: 'Lausanne', route: 'lausanne' },
      { label: 'Nyon', route: 'nyon' },
      { label: 'Gland', route: 'nyon' },
      { label: 'Coppet', route: 'nyon' },
      { label: 'Morges', route: 'morges' },
      { label: 'Rolle', route: 'morges' },
      { label: 'Saint-Prex', route: 'morges' },
      { label: 'Vevey', route: 'vevey' },
      { label: 'Montreux', route: 'vevey' },
      { label: 'Renens' },
      { label: 'Pully' },
      { label: 'Lutry' },
    ],
  },
];

const ARROW =
  'press w-12 h-12 inline-flex items-center justify-center rounded-full border border-slate-300 text-[#0A192F] hover:border-[#0A192F] transition-colors duration-200 disabled:opacity-35 disabled:hover:border-slate-300 disabled:cursor-default';

export default function LocalSeoZones({ navigateTo }: LocalSeoZonesProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const reduce = useReducedMotion();
  const [edges, setEdges] = useState({ start: true, end: false });

  // Les flèches se désactivent en bout de piste.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const update = () =>
      setEdges({
        start: el.scrollLeft <= 4,
        end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
      });
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const slide = (dir: 1 | -1) => {
    const el = trackRef.current;
    const card = el?.querySelector('li');
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: dir * (card.getBoundingClientRect().width + gap), behavior: reduce ? 'auto' : 'smooth' });
  };

  const go = (route: string) => (e: React.MouseEvent) => {
    if (!navigateTo) return;
    e.preventDefault();
    navigateTo(route);
  };

  return (
    <section id="zones" className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <Reveal className="flex items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="font-display font-semibold text-[34px] sm:text-[48px] leading-[1.05] tracking-[-0.035em] text-[#0A192F]">
              Où nous intervenons
            </h2>
            <p className="mt-4 max-w-xl text-base sm:text-lg leading-relaxed text-slate-600">
              Dans tout le canton de Genève et le canton de Vaud, de La Côte à la Riviera. Nous préparons la demande de
              voirie auprès de chaque commune.
            </p>
          </div>
          <div className="hidden sm:flex gap-2 shrink-0">
            <button type="button" onClick={() => slide(-1)} disabled={edges.start} aria-label="Communes précédentes" className={ARROW}>
              <ArrowLeft size={20} aria-hidden="true" />
            </button>
            <button type="button" onClick={() => slide(1)} disabled={edges.end} aria-label="Communes suivantes" className={ARROW}>
              <ArrowRight size={20} aria-hidden="true" />
            </button>
          </div>
        </Reveal>

        <ul
          ref={trackRef}
          className="mt-8 md:mt-12 -mx-4 px-4 scroll-px-4 sm:-mx-6 sm:px-6 sm:scroll-px-6 md:-mx-12 md:px-12 md:scroll-px-12 lg:mx-0 lg:px-0 lg:scroll-px-0 flex gap-4 md:gap-5 overflow-x-auto overscroll-x-contain snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {CARDS.map((c) => (
            <li key={c.route} className="snap-start shrink-0 w-[72vw] sm:w-[300px] lg:w-[calc((100%-3*1.25rem)/4)]">
              <a
                href={`/${c.route}`}
                onClick={go(c.route)}
                className="group relative block aspect-[3/4] overflow-hidden rounded-[28px] bg-[#0A192F] focus-visible:-outline-offset-4"
              >
                <img
                  src={`/assets/work/md/${c.file}`}
                  alt={`${c.detail}, ${c.city}`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04] motion-reduce:transition-none"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/55 to-transparent"
                />
                <span
                  aria-hidden="true"
                  className="absolute top-4 right-4 w-10 h-10 inline-flex items-center justify-center rounded-full bg-white text-[#0A192F]"
                >
                  <ArrowUpRight size={18} />
                </span>
                <span className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <span className="block font-display font-semibold text-[26px] sm:text-[28px] leading-[1.1] tracking-[-0.03em]">
                    {c.city}
                  </span>
                  <span className="mt-1.5 block text-[14px] leading-snug text-white/85">{c.detail}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-10 md:mt-14 border-t border-slate-200">
          {REGIONS.map((r) => (
            <div key={r.name} className="grid lg:grid-cols-[220px_1fr] gap-3 lg:gap-8 py-6 border-b border-slate-200">
              <h3 className="font-display font-semibold text-lg tracking-[-0.01em] text-[#0A192F]">{r.name}</h3>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-base">
                {r.cities.map((c) => (
                  <li key={c.label}>
                    {c.route && navigateTo ? (
                      <a
                        href={`/${c.route}`}
                        onClick={go(c.route)}
                        className="inline-block py-0.5 text-[#0A192F] underline underline-offset-4 decoration-slate-300 hover:decoration-[#0A192F] transition-colors"
                      >
                        {c.label}
                      </a>
                    ) : (
                      <span className="inline-block py-0.5 text-slate-600">{c.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
