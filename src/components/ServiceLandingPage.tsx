import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ServicePage, servicePages, serviceSlugs } from '../data/servicePages';
import { regionalZones } from '../data/regionalZones';
import WorkShowcase from './WorkShowcase';
import PageHero from './PageHero';
import HowItWorks from './HowItWorks';
import FaqSection from './FaqSection';
import CtaBand from './CtaBand';

interface ServiceLandingPageProps {
  service: ServicePage;
  onOpenQuoteModal: () => void;
  onImageClick: (src: string) => void;
  navigateTo: (page: string) => void;
}

const STEPS_INTRO =
  'Du devis au levage, BatiMove s’occupe du camion, de l’opérateur et de la voirie. Voici comment se déroule une intervention.';

export default function ServiceLandingPage({
  service,
  onOpenQuoteModal,
  onImageClick,
  navigateTo,
}: ServiceLandingPageProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [service]);


  const cityLinks = ['geneve', 'carouge', 'plainpalais', 'eaux-vives', 'meyrin', 'lausanne', 'nyon', 'morges', 'vevey'];

  return (
    <motion.div
      key={service.slug}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col bg-[#F1F5F8] text-slate-900"
    >
      <PageHero
        line1={service.h1Primary}
        line2={service.h1Secondary}
        lead={service.subtitle}
        photo={service.photo}
        photoAlt={service.photoAlt}
        captionTitle={service.photoPlace}
        captionText={service.photoDetail}
        ctaLabel={service.ctaLabel}
        waText={service.whatsappText}
        breadcrumb={{ label: service.navLabel, section: "Services", onHome: () => navigateTo("home") }}
        onOpenQuoteModal={onOpenQuoteModal}
        onImageClick={onImageClick}
      />

      <HowItWorks
        steps={service.steps}
        title="Votre levage en quatre étapes"
        intro={STEPS_INTRO}
        waText={service.whatsappText}
      />

      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="font-display font-semibold text-[28px] sm:text-[34px] leading-[1.1] tracking-[-0.03em] text-[#0A192F]">Ce que nous montons</h2>
            <ul className="mt-6 border-t border-slate-200">
              {service.objects.map((o) => (
                <li key={o} className="py-3.5 border-b border-slate-200 text-base text-[#0A192F]">
                  {o}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <h2 className="font-display font-semibold text-[28px] sm:text-[34px] leading-[1.1] tracking-[-0.03em] text-[#0A192F]">{service.advantagesTitle}</h2>
            <dl className="mt-6 border-t border-slate-200">
              {service.advantages.map((a) => (
                <div key={a.title} className="grid sm:grid-cols-[220px_1fr] gap-1 sm:gap-6 py-5 border-b border-slate-200">
                  <dt className="font-display font-semibold text-[#0A192F]">{a.title}</dt>
                  <dd className="text-base leading-relaxed text-slate-600">{a.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <WorkShowcase onImageClick={onImageClick} tone="tint" />

      <FaqSection faqs={service.faqs} tone="white" />

      <section className="bg-[#F1F5F8] py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <nav aria-label="Autres services">
            <h2 className="font-display font-semibold text-lg tracking-[-0.01em] text-[#0A192F]">Autres services</h2>
            <ul className="mt-4 space-y-2.5 text-base">
              {serviceSlugs
                .filter((slug) => slug !== service.slug)
                .map((slug) => (
                  <li key={slug}>
                    <a
                      href={`/${slug}`}
                      onClick={(e) => { e.preventDefault(); navigateTo(slug); }}
                      className="inline-block py-0.5 text-[#0A192F] underline underline-offset-4 decoration-slate-300 hover:decoration-[#0A192F] transition-colors"
                    >
                      {servicePages[slug].navLabel}
                    </a>
                  </li>
                ))}
            </ul>
          </nav>
          <nav aria-label="Par ville">
            <h2 className="font-display font-semibold text-lg tracking-[-0.01em] text-[#0A192F]">Par ville</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-base">
              {cityLinks.map((slug) => (
                <li key={slug}>
                  <a
                    href={`/${slug}`}
                    onClick={(e) => { e.preventDefault(); navigateTo(slug); }}
                    className="inline-block py-0.5 text-[#0A192F] underline underline-offset-4 decoration-slate-300 hover:decoration-[#0A192F] transition-colors"
                  >
                    {regionalZones[slug]?.cityName ?? slug}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <CtaBand ctaLabel={service.ctaLabel} waText={service.whatsappText} />
    </motion.div>
  );
}
