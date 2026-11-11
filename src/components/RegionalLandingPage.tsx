import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { RegionalZone, regionalZones } from '../data/regionalZones';
import { servicePages, serviceSlugs } from '../data/servicePages';
import { zonePhoto } from '../data/zonePhotos';
import { zoneFaqs } from '../data/zoneFaqs';
import WorkShowcase from './WorkShowcase';
import FaqSection from './FaqSection';
import PageHero from './PageHero';
import CtaBand from './CtaBand';

const LINK_CLASS =
  'inline-block py-0.5 text-[#0A192F] underline underline-offset-4 decoration-slate-300 hover:decoration-[#0A192F] transition-colors';

const OTHER_ZONES = ['geneve', 'carouge', 'plainpalais', 'eaux-vives', 'meyrin', 'lausanne', 'nyon', 'morges', 'vevey'];

interface RegionalLandingPageProps {
  zone: RegionalZone;
  onOpenQuoteModal: () => void;
  onImageClick: (src: string) => void;
  navigateTo: (page: string) => void;
}

export default function RegionalLandingPage({
  zone,
  onOpenQuoteModal,
  onImageClick,
  navigateTo,
}: RegionalLandingPageProps) {

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [zone]);

  const photo = zonePhoto(zone.slug);
  const waText = `Bonjour, je souhaite un devis pour un monte-meuble à ${zone.cityName}. Objet : \nÉtage : \nAdresse : `;
  const ctaLabel = `Devis gratuit à ${zone.cityName}`;

  return (
    <motion.div
      key={zone.slug}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col bg-[#F1F5F8] text-slate-900"
    >
      <PageHero
        line1={zone.h1Primary}
        line2={zone.h1Secondary}
        lead={zone.subtitle}
        photo={photo.src}
        photoAlt={`Monte-meuble BatiMove en intervention, ${photo.caption}`}
        captionTitle={photo.caption}
        captionText={photo.detail}
        ctaLabel={ctaLabel}
        waText={waText}
        breadcrumb={{ label: zone.cityName, section: "Zones", onHome: () => navigateTo("home") }}
        onOpenQuoteModal={onOpenQuoteModal}
        onImageClick={onImageClick}
      />

      <section className="bg-[#F1F5F8] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="font-display font-semibold text-[32px] sm:text-[40px] leading-[1.08] tracking-[-0.03em] text-[#0A192F]">
                Intervention à {zone.cityName}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Rues étroites, cours intérieures ou pentes&nbsp;: nous vérifions l’accès avant l’intervention et
                préparons les démarches auprès de la commune.
              </p>

              <h3 className="mt-9 font-display font-semibold text-lg tracking-[-0.01em] text-[#0A192F]">
                Secteurs et communes desservis
              </h3>
              <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-base text-slate-600">
                {zone.specificCommunes.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-slate-600 tabular-nums">
                Codes postaux&nbsp;: {zone.postalCodes.slice(0, 5).join(', ')}
              </p>
            </div>

            <dl className="lg:col-span-7 border-t border-slate-300 self-start">
              <div className="grid sm:grid-cols-[220px_1fr] gap-1 sm:gap-6 py-5 border-b border-slate-300">
                <dt className="font-display font-semibold text-[#0A192F]">Autorisation de stationnement</dt>
                <dd className="text-base leading-relaxed text-slate-600">{zone.voirieInfo}</dd>
              </div>
              <div className="grid sm:grid-cols-[220px_1fr] gap-1 sm:gap-6 py-5 border-b border-slate-300">
                <dt className="font-display font-semibold text-[#0A192F]">Sécurité des passants</dt>
                <dd className="text-base leading-relaxed text-slate-600">
                  Pose d’un périmètre de sécurité avec cônes homologués, calage au sol pour préserver le bitume et
                  surveillance continue par notre opérateur.
                </dd>
              </div>
              <div className="grid sm:grid-cols-[220px_1fr] gap-1 sm:gap-6 py-5 border-b border-slate-300">
                <dt className="font-display font-semibold text-[#0A192F]">Assurance RC professionnelle</dt>
                <dd className="text-base leading-relaxed text-slate-600">Chaque intervention est couverte jusqu’à CHF&nbsp;5’000’000.</dd>
              </div>
            </dl>
          </div>

          <div className="mt-14 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            <nav aria-label={`Prestations à ${zone.cityName}`}>
              <h3 className="font-display font-semibold text-lg tracking-[-0.01em] text-[#0A192F]">
                Nos prestations à {zone.cityName}
              </h3>
              <ul className="mt-4 space-y-2.5 text-base">
                {serviceSlugs.map((slug) => (
                  <li key={slug}>
                    <a
                      href={`/${slug}`}
                      onClick={(e) => { e.preventDefault(); navigateTo(slug); }}
                      className={LINK_CLASS}
                    >
                      {servicePages[slug].navLabel}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Autres zones">
              <h3 className="font-display font-semibold text-lg tracking-[-0.01em] text-[#0A192F]">Autres zones</h3>
              <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-base">
                {OTHER_ZONES.filter((slug) => slug !== zone.slug).map((slug) => (
                  <li key={slug}>
                    <a
                      href={`/${slug}`}
                      onClick={(e) => { e.preventDefault(); navigateTo(slug); }}
                      className={LINK_CLASS}
                    >
                      {regionalZones[slug]?.cityName ?? slug}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </section>

      <WorkShowcase onImageClick={onImageClick} />

      <FaqSection faqs={zoneFaqs(zone)} title={`Questions fréquentes à ${zone.cityName}`} />

      <CtaBand ctaLabel={ctaLabel} waText={waText} />
    </motion.div>
  );
}
