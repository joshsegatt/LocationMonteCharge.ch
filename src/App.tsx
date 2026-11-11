import React, { useEffect, useState, Suspense, lazy } from 'react';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { MCLogo } from './components/MCLogo';
import QuickQuoteDrawer from './components/QuickQuoteDrawer';
import WhatsAppWidget from './components/WhatsAppWidget';
import ImageZoomModal from './components/ImageZoomModal';
import { regionalZones } from './data/regionalZones';
import { servicePages, serviceSlugs } from './data/servicePages';
import { applyPageSeo, getPageSeo } from './lib/seo';
import { isRoutedPage, pageFromPath, pathFromPage } from './lib/routes';
import { enableEntrances } from './lib/firstPaint';
import { initAnalytics, trackPageView } from './lib/analytics';

const ContactPage = lazy(() => import('./components/ContactPage'));
const WorkShowcase = lazy(() => import('./components/WorkShowcase'));
const NavV2 = lazy(() => import('./components/NavV2'));
const HeroV2 = lazy(() => import('./components/HeroV2'));
const AboutOverviewV2 = lazy(() => import('./components/AboutOverviewV2'));
const HowItWorks = lazy(() => import('./components/HowItWorks'));
const LocalSeoZones = lazy(() => import('./components/LocalSeoZones'));
const FaqSection = lazy(() => import('./components/FaqSection'));
const CtaBand = lazy(() => import('./components/CtaBand'));
const RegionalLandingPage = lazy(() => import('./components/RegionalLandingPage'));
const ServiceLandingPage = lazy(() => import('./components/ServiceLandingPage'));

interface AppProps {
  /** Page affichée au premier rendu : celle du HTML pré-rendu, ou celle de l'adresse. */
  initialPage?: string;
}

export default function App({ initialPage = 'home' }: AppProps) {
  const [currentPage, setCurrentPage] = useState<string>(initialPage);
  const [activeModal, setActiveModal] = useState<'mentions' | 'security' | null>(null);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  // Conversion tracking (Google Ads / GA4 / Meta Pixel — no-op until IDs are set)
  useEffect(() => {
    initAnalytics();
  }, []);

  // Normalize unknown URLs to "/" so soft-404 paths don't keep a bad address
  useEffect(() => {
    const path = window.location.pathname.replace(/^\//, '').replace(/\/$/, '').toLowerCase();
    if (path && !isRoutedPage(path)) {
      window.history.replaceState({}, '', '/');
    }
  }, []);

  // Smooth scroll (desktop only, off when the visitor prefers reduced motion)
  useEffect(() => {
    const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || window.matchMedia('(pointer: coarse)').matches);
    if (isTouch) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      syncTouch: false,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Browser History Navigation (Back / Forward)
  useEffect(() => {
    const handlePopState = () => {
      enableEntrances();
      setCurrentPage(pageFromPath(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Titre, description, canonical et données structurées de la page courante
  useEffect(() => {
    applyPageSeo(getPageSeo(currentPage));
    trackPageView(window.location.pathname);
  }, [currentPage]);

  const navigateTo = (page: string) => {
    const target = page === 'home' || isRoutedPage(page) ? page : 'home';
    enableEntrances();
    window.history.pushState({}, '', pathFromPage(target));
    setCurrentPage(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goHome = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigateTo('home');
    }
  };

  // Les fenêtres légales se ferment avec Échap
  useEffect(() => {
    if (!activeModal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModal(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeModal]);

  const isRegional = Boolean(regionalZones[currentPage]);
  const isService = Boolean(servicePages[currentPage]);

  return (
    <div className="bg-white text-slate-900 min-h-screen selection:bg-[#0052A3] selection:text-white">
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[20000] focus:px-4 focus:py-2.5 focus:rounded-lg focus:bg-[#0A192F] focus:text-white focus:text-sm focus:font-semibold"
      >
        Aller au contenu
      </a>
      <Suspense fallback={null}>
        <NavV2 currentPage={currentPage} navigateTo={navigateTo} />
      </Suspense>

      <main id="contenu" tabIndex={-1} className="outline-none">
        <AnimatePresence mode="wait" initial={false}>
          {currentPage === 'home' ? (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col">

              <Suspense fallback={<div className="h-screen bg-[#0A192F]" />}>
                <HeroV2
                  onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
                  onImageClick={(src) => setSelectedImg(src)}
                  navigateTo={navigateTo}
                />
              </Suspense>

              <Suspense fallback={<div className="h-64 bg-white" />}>
                <HowItWorks />
              </Suspense>

              <Suspense fallback={<div className="h-96 bg-white" />}>
                <WorkShowcase onImageClick={(src) => setSelectedImg(src)} />
              </Suspense>

              <Suspense fallback={<div className="h-64 bg-[#F1F5F8]" />}>
                <AboutOverviewV2 onContactClick={() => navigateTo('contact')} />
              </Suspense>

              <Suspense fallback={<div className="h-96 bg-white" />}>
                <LocalSeoZones navigateTo={navigateTo} />
              </Suspense>

              <Suspense fallback={<div className="h-96 bg-[#F1F5F8]" />}>
                <FaqSection />
              </Suspense>

              <Suspense fallback={<div className="h-64 bg-white" />}>
                <CtaBand />
              </Suspense>

            </motion.div>
          ) : currentPage === 'contact' ? (
            <Suspense key="contact" fallback={<div className="min-h-screen bg-white" />}>
              <ContactPage navigateTo={navigateTo} />
            </Suspense>
          ) : isRegional ? (
            <Suspense key={currentPage} fallback={<div className="min-h-screen bg-white" />}>
              <RegionalLandingPage
                zone={regionalZones[currentPage]}
                onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
                onImageClick={(src) => setSelectedImg(src)}
                navigateTo={navigateTo}
              />
            </Suspense>
          ) : isService ? (
            <Suspense key={currentPage} fallback={<div className="min-h-screen bg-white" />}>
              <ServiceLandingPage
                service={servicePages[currentPage]}
                onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
                onImageClick={(src) => setSelectedImg(src)}
                navigateTo={navigateTo}
              />
            </Suspense>
          ) : null}
        </AnimatePresence>
      </main>

      <footer className="py-14 sm:py-16 border-t border-white/10 bg-[#071326] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          {/* Main Footer Grid: 5 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 pb-12 border-b border-white/10">

            {/* Col 1: Identity & Official Registry */}
            <div className="space-y-4 lg:col-span-1">
              <a href="/" onClick={goHome} className="inline-flex items-center gap-2.5 rounded-md">
                <MCLogo size={48} onDark />
                <span className="flex flex-col">
                  <span className="font-display font-semibold text-[19px] tracking-[-0.02em] text-white leading-none">
                    Monte Charge
                  </span>
                  <span className="text-[12px] font-medium text-slate-400 mt-[5px] leading-none">
                    BatiMove Genève
                  </span>
                </span>
              </a>
              <p className="text-sm text-slate-300 leading-relaxed">
                Location de monte-meuble avec opérateur à Genève et dans le canton de Vaud. Un service de BatiMove Sàrl.
              </p>
              <div className="pt-0.5">
                <a
                  href="https://batimove.ch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white font-semibold underline underline-offset-4 decoration-white/40 hover:decoration-white transition-colors"
                >
                  Groupe BatiMove Sàrl (batimove.ch)
                </a>
              </div>
              <div className="text-[13px] text-slate-400 tabular-nums">
                IDE&nbsp;: <span className="text-white font-semibold">CHE-143.091.230</span>
              </div>
            </div>

            {/* Col 2: Active Navigation */}
            <div>
              <h2 className="text-sm font-semibold text-white mb-4">
                Navigation
              </h2>
              <ul className="space-y-1 text-sm text-slate-300 font-medium">
                <li>
                  <a href="/" onClick={goHome} className="inline-block py-1 hover:text-white transition-colors">
                    Accueil
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage !== 'home') {
                        navigateTo('home');
                        setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 150);
                      } else {
                        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="inline-block py-1 hover:text-white transition-colors"
                  >
                    À propos
                  </a>
                </li>
                <li>
                  <a
                    href="#realisations"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage !== 'home') {
                        navigateTo('home');
                        setTimeout(() => document.getElementById('realisations')?.scrollIntoView({ behavior: 'smooth' }), 150);
                      } else {
                        document.getElementById('realisations')?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="inline-block py-1 hover:text-white transition-colors"
                  >
                    Réalisations
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage !== 'home') {
                        navigateTo('home');
                        setTimeout(() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }), 150);
                      } else {
                        document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="inline-block py-1 hover:text-white transition-colors"
                  >
                    Questions fréquentes
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    onClick={(e) => { e.preventDefault(); navigateTo('contact'); }}
                    className="inline-block py-1 text-white font-semibold underline underline-offset-4 decoration-white/40 hover:decoration-white transition-colors"
                  >
                    Demander un devis
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Canton de Vaud Hubs */}
            <div>
              <h2 className="text-sm font-semibold text-white mb-4">
                Canton de Vaud
              </h2>
              <ul className="space-y-3 text-sm text-slate-300 font-medium">
                <li>
                  <a
                    href="/lausanne"
                    onClick={(e) => { e.preventDefault(); navigateTo('lausanne'); }}
                    className="hover:text-white transition-colors block"
                  >
                    <span className="font-semibold text-white">Lausanne</span>
                    <span className="block text-[13px] text-slate-400">Pully, Renens, Lutry</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/nyon"
                    onClick={(e) => { e.preventDefault(); navigateTo('nyon'); }}
                    className="hover:text-white transition-colors block"
                  >
                    <span className="font-semibold text-white">Nyon &amp; La Côte</span>
                    <span className="block text-[13px] text-slate-400">Gland, Rolle, Coppet</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/morges"
                    onClick={(e) => { e.preventDefault(); navigateTo('morges'); }}
                    className="hover:text-white transition-colors block"
                  >
                    <span className="font-semibold text-white">Morges</span>
                    <span className="block text-[13px] text-slate-400">Tolochenaz, Saint-Prex</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/vevey"
                    onClick={(e) => { e.preventDefault(); navigateTo('vevey'); }}
                    className="hover:text-white transition-colors block"
                  >
                    <span className="font-semibold text-white">Vevey &amp; Montreux</span>
                    <span className="block text-[13px] text-slate-400">Riviera, Tour-de-Peilz</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 4: Canton de Genève Hubs */}
            <div>
              <h2 className="text-sm font-semibold text-white mb-4">
                Canton de Genève
              </h2>
              <ul className="space-y-3 text-sm text-slate-300 font-medium">
                <li>
                  <a
                    href="/geneve"
                    onClick={(e) => { e.preventDefault(); navigateTo('geneve'); }}
                    className="hover:text-white transition-colors block"
                  >
                    <span className="font-semibold text-white">Genève Centre</span>
                    <span className="block text-[13px] text-slate-400">Vieille-Ville, Servette</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/carouge"
                    onClick={(e) => { e.preventDefault(); navigateTo('carouge'); }}
                    className="hover:text-white transition-colors block"
                  >
                    <span className="font-semibold text-white">Carouge &amp; Lancy</span>
                    <span className="block text-[13px] text-slate-400">Acacias, Rondeau</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/plainpalais"
                    onClick={(e) => { e.preventDefault(); navigateTo('plainpalais'); }}
                    className="hover:text-white transition-colors block"
                  >
                    <span className="font-semibold text-white">Plainpalais &amp; Jonction</span>
                    <span className="block text-[13px] text-slate-400">Bains, Philosophes</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/eaux-vives"
                    onClick={(e) => { e.preventDefault(); navigateTo('eaux-vives'); }}
                    className="hover:text-white transition-colors block"
                  >
                    <span className="font-semibold text-white">Eaux-Vives &amp; Champel</span>
                    <span className="block text-[13px] text-slate-400">Cologny, Malagnou</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/meyrin"
                    onClick={(e) => { e.preventDefault(); navigateTo('meyrin'); }}
                    className="hover:text-white transition-colors block"
                  >
                    <span className="font-semibold text-white">Meyrin &amp; Vernier</span>
                    <span className="block text-[13px] text-slate-400">Avanchets, Satigny</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 5: Compliance & Direct Contact */}
            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-semibold text-white mb-3">
                  Sécurité et mentions légales
                </h2>
                <ul className="space-y-1 text-sm text-slate-300 font-medium">
                  <li>
                    <button
                      onClick={() => setActiveModal('security')}
                      className="py-1 hover:text-white transition-colors text-left"
                    >
                      Normes SUVA et sécurité
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveModal('mentions')}
                      className="py-1 hover:text-white transition-colors text-left"
                    >
                      Mentions légales
                    </button>
                  </li>
                  <li className="text-[13px] text-slate-400 pt-1.5 tabular-nums">
                    RC Pro&nbsp;: <strong className="text-white font-semibold">5’000’000&nbsp;CHF</strong>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2 text-sm">
                <a
                  href="tel:0800825925"
                  className="block text-white font-semibold tabular-nums underline underline-offset-4 decoration-transparent hover:decoration-white transition-colors"
                >
                  0800&nbsp;825&nbsp;925 (gratuit)
                </a>
                <a
                  href="https://wa.me/41798896406"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-slate-300 hover:text-white transition-colors tabular-nums"
                >
                  WhatsApp&nbsp;: 079&nbsp;889&nbsp;64&nbsp;06
                </a>
                <a
                  href="mailto:info@batimove.ch"
                  className="block text-slate-300 hover:text-white transition-colors"
                >
                  E-mail&nbsp;: info@batimove.ch
                </a>
              </div>
            </div>

          </div>

          {/* Services par la fenêtre (pages dédiées) */}
          <div className="py-6 border-b border-white/10 flex flex-col md:flex-row md:items-center gap-3">
            <h2 className="text-sm font-semibold text-white shrink-0">
              Services
            </h2>
            <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-300 font-medium md:ml-4">
              {serviceSlugs.map((slug) => (
                <li key={slug}>
                  <a
                    href={`/${slug}`}
                    onClick={(e) => { e.preventDefault(); navigateTo(slug); }}
                    className="inline-block py-1 hover:text-white transition-colors"
                  >
                    {servicePages[slug].navLabel}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom Bar: Copyright & Author Credit */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-slate-400 pb-12 sm:pb-2">
            <p>© 2026 BatiMove Sàrl, Genève. Tous droits réservés.</p>

            <a
              href="https://joshsegatt.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors sm:mr-24"
            >
              Site réalisé par <span className="font-semibold text-slate-200">joshsegatt</span>
            </a>
          </div>
        </div>
      </footer>

      {/* Fenêtres légales */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] } }}
            exit={{ opacity: 0, transition: { duration: 0.15, ease: 'easeOut' } }}
            className="fixed inset-0 z-[11000] flex items-center justify-center p-4"
          >
            <div onClick={() => setActiveModal(null)} aria-hidden="true" className="absolute inset-0 bg-[#0A192F]/60" />
            <motion.div
              initial={{ scale: 0.97, y: 8 }}
              animate={{ scale: 1, y: 0, transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] } }}
              exit={{ scale: 0.98, transition: { duration: 0.15, ease: 'easeOut' } }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="legal-title"
              data-lenis-prevent
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto overscroll-contain bg-white rounded-xl shadow-[0_24px_60px_-20px_rgba(10,25,47,0.5)]"
            >
              <div className="px-6 sm:px-8 pt-6 sm:pt-7 pb-5 border-b border-slate-200 flex justify-between items-start gap-6">
                <h2 id="legal-title" className="text-2xl sm:text-[28px] leading-tight font-display font-semibold text-[#0A192F] tracking-[-0.02em]">
                  {activeModal === 'mentions' ? 'Mentions légales' : 'Sécurité et normes SUVA'}
                </h2>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="-mr-2.5 -mt-1 shrink-0 w-11 h-11 rounded-lg flex items-center justify-center text-[#0A192F] hover:bg-[#F1F5F8] transition-colors"
                  aria-label="Fermer"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>

              <div className="px-6 sm:px-8 py-6 sm:py-7 space-y-4 text-[15px] leading-relaxed text-slate-600">
                {activeModal === 'mentions' ? (
                  <>
                    <p>
                      <strong className="block font-display font-semibold text-lg text-[#0A192F]">BatiMove Sàrl</strong>
                      <span className="tabular-nums">IDE CHE-143.091.230, Registre du commerce de Genève</span>
                      <br />
                      Siège social&nbsp;: Rue De-Monthoux 64, 1201 Genève, Suisse
                    </p>
                    <p><strong className="text-[#0A192F] font-semibold">Assurance responsabilité civile&nbsp;:</strong> Couverture professionnelle entreprise à hauteur de 5’000’000&nbsp;CHF auprès d’une compagnie d’assurance helvétique agréée.</p>
                    <p><strong className="text-[#0A192F] font-semibold">Activité&nbsp;:</strong> Prestations spécialisées de levage vertical, location de monte-meuble et monte-charge autotracté avec opérateur qualifié à Genève, Vaud et toute la Suisse romande.</p>
                    <p><strong className="text-[#0A192F] font-semibold">Contact légal&nbsp;:</strong> info@batimove.ch, <strong className="font-semibold tabular-nums whitespace-nowrap">0800&nbsp;825&nbsp;925</strong></p>
                  </>
                ) : (
                  <>
                    <p><strong className="text-[#0A192F] font-semibold">Conformité SUVA&nbsp;:</strong> Tous nos techniciens d’exploitation sont formés et certifiés selon les directives suisses de prévention des accidents de la SUVA. Les équipements subissent un contrôle technique semestriel strict.</p>
                    <p><strong className="text-[#0A192F] font-semibold">Voirie et domaine public&nbsp;:</strong> BatiMove Sàrl assure la gestion complète des demandes d’autorisation d’occupation du domaine public auprès du Service de l’espace public (SEP) de la Ville de Genève et des communes vaudoises.</p>
                    <p><strong className="text-[#0A192F] font-semibold">Sécurité des tiers&nbsp;:</strong> Mise en place systématique d’un périmètre de sécurité avec balisage réglementaire et cônes homologués avant tout déploiement télescopique.</p>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <QuickQuoteDrawer isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />

      <WhatsAppWidget />

      <AnimatePresence>
        {selectedImg && (
          <ImageZoomModal src={selectedImg} onClose={() => setSelectedImg(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
