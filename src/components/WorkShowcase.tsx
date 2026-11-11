import React, { useState } from 'react';
import { frTypo } from '../lib/typo';

interface WorkItem {
  file: string;
  place: string;
  detail: string;
}

// Photos de chantiers réels. Lieu et opération sous chaque photo.
const WORK: WorkItem[] = frTypo([
  { file: '4.webp', place: 'Nyon', detail: 'Canapé monobloc au 3ᵉ étage' },
  { file: '5.webp', place: 'Genève, Servette', detail: 'Baies vitrées au 7ᵉ étage' },
  { file: '11.webp', place: 'Genève, Florissant', detail: 'Piano à queue au 8ᵉ étage' },
  { file: '20.webp', place: 'Lausanne', detail: 'Meubles au 6ᵉ étage' },
  { file: 'real-geneva-4.webp', place: 'Genève, Rive droite', detail: 'Échelle déployée en façade' },
  { file: '3.webp', place: 'Genève, Plainpalais', detail: 'Matériaux de rénovation au 6ᵉ étage' },
  { file: 'real-geneva-1.webp', place: 'Genève, Cité et Servette', detail: 'Levage au 4ᵉ étage' },
  { file: '8.webp', place: 'Morges', detail: 'Cuisine en quartz au 4ᵉ étage' },
  { file: 'real-geneva-6.webp', place: 'Genève, Grand-Pré', detail: 'Accès par une cour intérieure étroite' },
  { file: '2.webp', place: 'Genève, Eaux-Vives', detail: 'Déménagement au 4ᵉ étage' },
  { file: '21.webp', place: 'Genève, Petit-Saconnex', detail: 'Levage au 9ᵉ étage' },
  { file: '7.webp', place: 'Cologny', detail: 'Villa, levage en toiture' },
  { file: '1.webp', place: 'Genève, Champel', detail: 'Meuble au 5ᵉ étage' },
  { file: '6.webp', place: 'Carouge', detail: 'Cour intérieure étroite, 2ᵉ étage' },
  { file: '9.webp', place: 'Genève, Vieille-Ville', detail: 'Ruelle pavée, 4ᵉ étage' },
  { file: '12.webp', place: 'Genève, Jonction', detail: 'Mobilier au 3ᵉ étage' },
  { file: '14.webp', place: 'Chêne-Bougeries', detail: 'Déménagement au 2ᵉ étage' },
  { file: '15.webp', place: 'Genève, Pâquis', detail: 'Évacuation de gravats au 6ᵉ étage' },
  { file: '16.webp', place: 'Versoix', detail: 'Terrasse au 5ᵉ étage' },
  { file: 'real-geneva-2.webp', place: 'Genève', detail: 'Déménagement au dernier étage' },
  { file: 'real-geneva-3.webp', place: 'Genève', detail: 'Opérateur au poste de commande' },
  { file: 'real-geneva-5.webp', place: 'Genève', detail: 'Camion monte-meuble, 500 kg' },
]);

const INITIAL = 4;

export default function WorkShowcase({
  onImageClick,
  title = 'Nos interventions en photos',
  tone = 'white',
}: {
  onImageClick: (src: string) => void;
  title?: string;
  tone?: 'white' | 'tint';
}) {
  const [showAll, setShowAll] = useState(false);
  const items = showAll ? WORK : WORK.slice(0, INITIAL);

  return (
    <section id="realisations" className={`${tone === 'tint' ? 'bg-[#F1F5F8]' : 'bg-white'} py-16 md:py-24`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="max-w-2xl mb-8 md:mb-10">
          <h2 className="font-display font-semibold text-[32px] sm:text-[40px] leading-[1.08] tracking-[-0.03em] text-[#0A192F]">
            {title}
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600">
            Photos prises sur nos chantiers à Genève et dans le canton de Vaud.
          </p>
        </div>

        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 sm:gap-x-5 gap-y-7 sm:gap-y-9">
          {items.map((w) => (
            <li key={w.file}>
              <button
                type="button"
                onClick={() => onImageClick(`/assets/work/${w.file}`)}
                className="group block w-full text-left cursor-zoom-in"
              >
                <span className="block overflow-hidden rounded-2xl bg-slate-200">
                  <img
                    src={`/assets/work/md/${w.file}`}
                    alt={`${w.detail}, ${w.place}`}
                    width={720}
                    height={540}
                    loading="lazy"
                    decoding="async"
                    className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none"
                  />
                </span>
                {/* Le nom du bouton vient du texte alternatif de la photo : la légende visible le répéterait. */}
                <span aria-hidden="true" className="block mt-3">
                  <span className="block text-[15px] font-medium text-[#0A192F] leading-snug">{w.place}</span>
                  <span className="block text-sm text-slate-600 leading-snug">{w.detail}</span>
                </span>
                <span className="sr-only">, agrandir la photo</span>
              </button>
            </li>
          ))}
        </ul>

        {!showAll && (
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="mt-9 sm:mt-10 py-2 text-base font-semibold text-[#0A192F] underline underline-offset-4 decoration-slate-300 hover:decoration-[#0A192F] transition-colors"
          >
            Voir les {WORK.length - INITIAL} autres photos
          </button>
        )}
      </div>
    </section>
  );
}
