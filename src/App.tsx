import React, { useEffect, useState, Suspense, lazy } from 'react';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck } from 'lucide-react';
import { MCLogo } from './components/MCLogo';
import QuickQuoteDrawer from './components/QuickQuoteDrawer';
import WhatsAppWidget from './components/WhatsAppWidget';
import ImageZoomModal from './components/ImageZoomModal';
import { regionalZones } from './data/regionalZones';

const ContactPage = lazy(() => import('./components/ContactPage'));
const WorkShowcase = lazy(() => import('./components/WorkShowcase'));
const NavV2 = lazy(() => import('./components/NavV2'));
const HeroV2 = lazy(() => import('./components/HeroV2'));
const AboutOverviewV2 = lazy(() => import('./components/AboutOverviewV2'));
const StatsBannerV2 = lazy(() => import('./components/StatsBannerV2'));
const LocalSeoZones = lazy(() => import('./components/LocalSeoZones'));
const FaqSection = lazy(() => import('./components/FaqSection'));
const RegionalLandingPage = lazy(() => import('./components/RegionalLandingPage'));

const getInitialPage = (): string => {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname.replace(/^\//, '').toLowerCase();
  if (path === 'contact') return 'contact';
  if (path && regionalZones[path]) return path;
  return 'home';
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>(getInitialPage);
  const [activeModal, setActiveModal] = useState<'mentions' | 'security' | null>(null);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  // Signal custom refined preloader that the application is ready
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const timer = setTimeout(() => {
        window.dispatchEvent(new CustomEvent('bm-app-ready'));
      }, 450);
      return () => clearTimeout(timer);
    }
  }, []);

  // Lenis Luxury Inertia Smooth Scroll Engine
  useEffect(() => {
    const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || window.matchMedia('(pointer: coarse)').matches);
    if (isTouch) return;

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
      const path = window.location.pathname.replace(/^\//, '').toLowerCase();
      if (path === 'contact') {
        setCurrentPage('contact');
      } else if (path && regionalZones[path]) {
        setCurrentPage(path);
      } else {
        setCurrentPage('home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Metadata update for main pages
  useEffect(() => {
    if (currentPage === 'home') {
      document.title = "Monte-Charge Genève & Vaud | BatiMove Sàrl dès 150 CHF/h";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', "Location monte-meuble et monte-charge avec opérateur qualifié à Genève et Vaud. Jusqu'au 10ᵉ étage (33m, 400kg). Intervention express 7j/7 dès 150 CHF/h.");
      }
    } else if (currentPage === 'contact') {
      document.title = "Demande de Devis Monte-Charge | Genève & Vaud | BatiMove";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', "Contactez BatiMove Sàrl pour votre réservation de monte-meuble ou monte-charge à Genève et Vaud. Devis gratuit et intervention rapide.");
      }
    }
  }, [currentPage]);

  const navigateTo = (page: string) => {
    let url = '/';
    if (page === 'contact') {
      url = '/contact';
    } else if (page === 'home') {
      url = '/';
    } else if (regionalZones[page]) {
      url = `/${page}`;
    }
    window.history.pushState({}, '', url);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isRegional = Boolean(regionalZones[currentPage]);

  return (
    <div className="bg-[#F1F5F8] text-slate-900 min-h-screen selection:bg-[#0052A3] selection:text-white">
      <Suspense fallback={<div className="h-16 bg-[#F1F5F8]" />}>
        <NavV2 currentPage={currentPage} navigateTo={navigateTo} />
      </Suspense>
      
      <AnimatePresence mode="wait">
        {currentPage === 'home' ? (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col">
            
            <Suspense fallback={<div className="h-screen bg-white animate-pulse" />}>
              <HeroV2 
                onOpenQuoteModal={() => setIsQuoteModalOpen(true)} 
                onImageClick={(src) => setSelectedImg(src)}
              />
            </Suspense>

            <Suspense fallback={<div className="h-64 bg-[#F1F5F8] animate-pulse" />}>
              <AboutOverviewV2 onContactClick={() => navigateTo('contact')} />
            </Suspense>

            <div className="bg-[#0A192F] relative overflow-hidden text-white perspective-1200 py-12 md:py-16">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_15%,rgba(0,82,163,0.2),transparent_70%)] pointer-events-none" />
              <Suspense fallback={<div className="h-96 flex items-center justify-center animate-pulse text-[#38BDF8]">Chargement des réalisations...</div>}>
                <WorkShowcase onImageClick={(src) => setSelectedImg(src)} />
              </Suspense>
            </div>

            <Suspense fallback={<div className="h-64 bg-[#0A192F] animate-pulse" />}>
              <StatsBannerV2 />
            </Suspense>

            <Suspense fallback={<div className="h-96 bg-[#F1F5F8] animate-pulse" />}>
              <LocalSeoZones onOpenQuoteModal={() => setIsQuoteModalOpen(true)} navigateTo={navigateTo} />
            </Suspense>

            <Suspense fallback={<div className="h-96 bg-[#F1F5F8] animate-pulse" />}>
              <FaqSection onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />
            </Suspense>

          </motion.div>
        ) : currentPage === 'contact' ? (
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-[#0052A3] animate-pulse">Chargement de la page de contact...</div>}>
            <ContactPage key="contact" navigateTo={navigateTo} />
          </Suspense>
        ) : isRegional ? (
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-[#0052A3] animate-pulse">Chargement de la zone régionale...</div>}>
            <RegionalLandingPage
              key={currentPage}
              zone={regionalZones[currentPage]}
              onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
              onImageClick={(src) => setSelectedImg(src)}
              navigateTo={navigateTo}
            />
          </Suspense>
        ) : null}
      </AnimatePresence>

      {/* REFINED SWISS ENTERPRISE FOOTER (Shared across Home & All Regional Landing Pages) */}
      {currentPage !== 'contact' && (
        <footer className="py-14 sm:py-16 border-t border-white/10 bg-[#071326] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
            {/* Main Footer Grid: 5 columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 pb-12 border-b border-white/10">
              
              {/* Col 1: Identity & Official Registry */}
              <div className="space-y-4 lg:col-span-1">
                <div 
                  className="flex items-center gap-2.5 cursor-pointer"
                  onClick={() => {
                    if (currentPage === 'home') {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                      navigateTo('home');
                    }
                  }}
                >
                  <MCLogo size={34} />
                  <div className="flex flex-col">
                    <span className="text-lg font-display font-bold tracking-tight uppercase text-white leading-none">
                      Monte Charge
                    </span>
                    <span className="text-[10px] font-bold tracking-wider text-[#38BDF8] uppercase mt-1 leading-none">
                      Genève • BatiMove Sàrl
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Spécialiste du levage télescopique par façade jusqu'au 10ᵉ étage. Sécurisation complète des accès difficiles dans les cantons de Genève et Vaud.
                </p>
                <div className="pt-0.5">
                  <a 
                    href="https://batimove.ch" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1.5 text-xs text-[#38BDF8] hover:underline font-semibold"
                  >
                    <span>Groupe BatiMove Sàrl (batimove.ch)</span>
                    <span>↗</span>
                  </a>
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  IDE / UID : <span className="text-white font-semibold">CHE-143.091.230</span>
                </div>
              </div>

              {/* Col 2: Active Navigation */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-[#38BDF8] mb-4">
                  Navigation
                </h4>
                <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
                  <li>
                    <button 
                      onClick={() => {
                        if (currentPage === 'home') {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        } else {
                          navigateTo('home');
                        }
                      }} 
                      className="hover:text-white transition-colors cursor-pointer"
                    >
                      Accueil
                    </button>
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
                      className="hover:text-white transition-colors cursor-pointer"
                    >
                      À propos &amp; Flotte
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
                      className="hover:text-white transition-colors cursor-pointer"
                    >
                      Galerie des Réalisations
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
                      className="hover:text-white transition-colors cursor-pointer"
                    >
                      Questions Fréquentes (FAQ)
                    </a>
                  </li>
                  <li>
                    <button 
                      onClick={() => navigateTo('contact')} 
                      className="hover:text-[#38BDF8] text-white transition-colors cursor-pointer font-bold"
                    >
                      Demande d'Intervention
                    </button>
                  </li>
                </ul>
              </div>

              {/* Col 3: Canton de Vaud Hubs */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-[#38BDF8] mb-4">
                  Canton de Vaud
                </h4>
                <ul className="space-y-2 text-xs text-slate-300 font-medium">
                  <li>
                    <a 
                      href="/lausanne" 
                      onClick={(e) => { e.preventDefault(); navigateTo('lausanne'); }} 
                      className="hover:text-white transition-colors block"
                    >
                      <span className="font-semibold text-white">Lausanne</span>
                      <span className="block text-[11px] text-slate-400">Pully, Renens, Lutry</span>
                    </a>
                  </li>
                  <li>
                    <a 
                      href="/nyon" 
                      onClick={(e) => { e.preventDefault(); navigateTo('nyon'); }} 
                      className="hover:text-white transition-colors block"
                    >
                      <span className="font-semibold text-white">Nyon &amp; La Côte</span>
                      <span className="block text-[11px] text-slate-400">Gland, Rolle, Coppet</span>
                    </a>
                  </li>
                  <li>
                    <a 
                      href="/morges" 
                      onClick={(e) => { e.preventDefault(); navigateTo('morges'); }} 
                      className="hover:text-white transition-colors block"
                    >
                      <span className="font-semibold text-white">Morges</span>
                      <span className="block text-[11px] text-slate-400">Tolochenaz, Saint-Prex</span>
                    </a>
                  </li>
                  <li>
                    <a 
                      href="/vevey" 
                      onClick={(e) => { e.preventDefault(); navigateTo('vevey'); }} 
                      className="hover:text-white transition-colors block"
                    >
                      <span className="font-semibold text-white">Vevey &amp; Montreux</span>
                      <span className="block text-[11px] text-slate-400">Riviera, Tour-de-Peilz</span>
                    </a>
                  </li>
                </ul>
              </div>

              {/* Col 4: Canton de Genève Hubs */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-[#38BDF8] mb-4">
                  Canton de Genève
                </h4>
                <ul className="space-y-2 text-xs text-slate-300 font-medium">
                  <li>
                    <a 
                      href="/geneve" 
                      onClick={(e) => { e.preventDefault(); navigateTo('geneve'); }} 
                      className="hover:text-white transition-colors block"
                    >
                      <span className="font-semibold text-white">Genève Centre</span>
                      <span className="block text-[11px] text-slate-400">Vieille-Ville, Servette</span>
                    </a>
                  </li>
                  <li>
                    <a 
                      href="/carouge" 
                      onClick={(e) => { e.preventDefault(); navigateTo('carouge'); }} 
                      className="hover:text-white transition-colors block"
                    >
                      <span className="font-semibold text-white">Carouge &amp; Lancy</span>
                      <span className="block text-[11px] text-slate-400">Acacias, Rondeau</span>
                    </a>
                  </li>
                  <li>
                    <a 
                      href="/plainpalais" 
                      onClick={(e) => { e.preventDefault(); navigateTo('plainpalais'); }} 
                      className="hover:text-white transition-colors block"
                    >
                      <span className="font-semibold text-white">Plainpalais &amp; Jonction</span>
                      <span className="block text-[11px] text-slate-400">Bains, Philosophes</span>
                    </a>
                  </li>
                  <li>
                    <a 
                      href="/eaux-vives" 
                      onClick={(e) => { e.preventDefault(); navigateTo('eaux-vives'); }} 
                      className="hover:text-white transition-colors block"
                    >
                      <span className="font-semibold text-white">Eaux-Vives &amp; Champel</span>
                      <span className="block text-[11px] text-slate-400">Cologny, Malagnou</span>
                    </a>
                  </li>
                  <li>
                    <a 
                      href="/meyrin" 
                      onClick={(e) => { e.preventDefault(); navigateTo('meyrin'); }} 
                      className="hover:text-white transition-colors block"
                    >
                      <span className="font-semibold text-white">Meyrin &amp; Vernier</span>
                      <span className="block text-[11px] text-slate-400">Avanchets, Satigny</span>
                    </a>
                  </li>
                </ul>
              </div>

              {/* Col 5: Compliance & Direct Contact */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-[#38BDF8] mb-3">
                    Sécurité &amp; Légal
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300 font-medium">
                    <li>
                      <button 
                        onClick={() => setActiveModal('security')} 
                        className="hover:text-white transition-colors cursor-pointer text-left"
                      >
                        Normes SUVA &amp; Sécurité
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => setActiveModal('mentions')} 
                        className="hover:text-white transition-colors cursor-pointer text-left"
                      >
                        Mentions Légales &amp; Registre
                      </button>
                    </li>
                    <li className="text-[11px] text-slate-400 pt-0.5">
                      RC Pro : <strong className="text-white font-semibold">5'000'000 CHF</strong>
                    </li>
                  </ul>
                </div>

                <div className="pt-2 border-t border-white/10 space-y-2 text-xs">
                  <a 
                    href="tel:0800825925" 
                    className="flex items-center gap-2 text-white hover:text-[#38BDF8] transition-colors font-bold"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
                    <span>0800 825 925 (Gratuit)</span>
                  </a>
                  <a 
                    href="https://wa.me/41798896406" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
                  >
                    <span>WhatsApp : 079 889 64 06</span>
                  </a>
                  <a 
                    href="mailto:info@batimove.ch" 
                    className="block text-slate-300 hover:text-white transition-colors"
                  >
                    Email : info@batimove.ch
                  </a>
                </div>
              </div>

            </div>

            {/* Bottom Bar: Copyright & Author Credit */}
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 pb-12 sm:pb-2">
              <p>© 2026 Monte-Charge Suisse • BatiMove Sàrl. Tous droits réservés.</p>
              
              <a 
                href="https://joshsegatt.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all group backdrop-blur-md sm:mr-24"
              >
                <span>Made with</span>
                <span className="text-[#E10600]">❤️</span>
                <span>by</span>
                <span className="text-white font-bold group-hover:text-[#38BDF8] transition-colors">joshsegatt</span>
              </a>
            </div>
          </div>
        </footer>
      )}

      {/* LEGAL MODALS */}
      <AnimatePresence>
        {activeModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[130] flex items-center justify-center p-4">
            <motion.div onClick={() => setActiveModal(null)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm cursor-pointer" />
            <motion.div initial={{ scale: 0.96, opacity: 0, y: 15 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.96, opacity: 0, y: 15 }} className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col shadow-2xl">
              <div className="p-6 sm:p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <div className="space-y-1">
                  <span className="font-sans text-xs text-[#0052A3] uppercase tracking-wider font-bold">Document Officiel Suisse</span>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-950 tracking-tight">
                    {activeModal === 'mentions' ? 'Mentions Légales & Registre' : 'Standards Sécurité & SUVA'}
                  </h2>
                </div>
                <button 
                  onClick={() => setActiveModal(null)} 
                  className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                  aria-label="Fermer"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-6 sm:p-8 space-y-6 text-sm text-slate-600 leading-relaxed font-normal">
                {activeModal === 'mentions' ? (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <p className="font-display font-bold text-slate-950 text-base">BATIMOVE Sàrl</p>
                      <p className="text-xs text-[#0052A3] font-semibold"><span className="font-mono">UID: CHE-143.091.230</span> • Registre du Commerce de Genève</p>
                      <p className="text-xs text-slate-600 mt-1 font-normal">Siège social : Rue De-MONTHOUX 64, 1201 Genève, Suisse</p>
                    </div>
                    <div className="space-y-2 text-xs">
                      <p><strong className="text-slate-900 font-semibold">Assurance Responsabilité Civile :</strong> Couverture professionnelle entreprise à hauteur de 5'000'000 CHF auprès d'une compagnie d'assurance helvétique agréée.</p>
                      <p><strong className="text-slate-900 font-semibold">Activité :</strong> Prestations spécialisées de levage vertical, location de monte-meuble et monte-charge autotracté avec opérateur qualifié à Genève, Vaud et toute la Suisse Romande.</p>
                      <p><strong className="text-slate-900 font-semibold">Contact légal :</strong> info@batimove.ch • <strong className="tabular-nums">0800 825 925</strong></p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 text-xs">
                    <p><strong className="text-slate-900 font-semibold">Conformité SUVA :</strong> Tous nos techniciens d'exploitation sont formés et certifiés selon les directives suisses de prévention des accidents de la SUVA. Les équipements subissent un contrôle technique semestriel strict.</p>
                    <p><strong className="text-slate-900 font-semibold">Voirie et Domaine Public :</strong> BatiMove Sàrl assure la gestion complète des demandes d'autorisation d'occupation du domaine public auprès du Service de l'espace public (SEP) de la Ville de Genève et des communes vaudoises.</p>
                    <p><strong className="text-slate-900 font-semibold">Sécurisation des Tiers :</strong> Mise en place systématique d'un périmètre de sécurité avec balisage réglementaire et cônes homologués avant tout déploiement télescopique.</p>
                  </div>
                )}
              </div>
              <div className="p-4 border-t border-slate-100 text-center bg-slate-50">
                <p className="text-[11px] font-sans text-slate-500 font-normal">Monte Charge Suisse • BatiMove Sàrl • Précis. Sécurisé. Suisse.</p>
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
