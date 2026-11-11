import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Phone, ChevronDown, ArrowUpRight } from 'lucide-react';
import { MCLogo } from './MCLogo';
import { WhatsAppGlyph } from './WhatsAppGlyph';
import { PHONE_TEL, PHONE_DISPLAY, waLink } from '../lib/contact';
import { servicePages } from '../data/servicePages';
import { SERVICE_NAV } from '../lib/serviceNav';

interface NavProps {
  navigateTo: (page: string) => void;
  currentPage: string;
}

interface NavLink {
  label: string;
  href: string;
  page?: string;
  action?: () => void;
}

const EASE = [0.23, 1, 0.32, 1] as const;

// Sections de l'accueil suivies au défilement, dans l'ordre de la page.
const SECTION_IDS = ['realisations', 'about', 'zones', 'faq'];

export default function NavV2({ navigateTo, currentPage }: NavProps) {
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const servicesBtnRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const lastPointer = useRef('');

  const onServicePage = Boolean(servicePages[currentPage]);

  // Une lecture par image : la barre devient une capsule blanche dès qu'on quitte le haut de la
  // page et, sur l'accueil, le lien de la section qui passe sous le regard reste marqué.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 8);
      if (currentPage !== 'home') {
        setActiveSection('');
        return;
      }
      const line = window.innerHeight * 0.4;
      let current = '';
      for (const id of SECTION_IDS) {
        const rect = document.getElementById(id)?.getBoundingClientRect();
        if (rect && rect.top <= line && rect.bottom > line) current = id;
      }
      setActiveSection(current);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, [currentPage]);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [currentPage]);

  // Le menu mobile s'ouvre avec la liste des services déjà dépliée sur une page de service.
  useEffect(() => {
    if (mobileOpen) setMobileServices(onServicePage);
  }, [mobileOpen, onServicePage]);

  // Échap ferme ce qui est ouvert et rend le focus au bouton d'origine.
  useEffect(() => {
    if (!mobileOpen && !servicesOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (servicesOpen) {
        setServicesOpen(false);
        servicesBtnRef.current?.focus();
      }
      setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen, servicesOpen]);

  // Un clic en dehors referme le menu « Services ».
  useEffect(() => {
    if (!servicesOpen) return;
    const onDown = (e: PointerEvent) => {
      if (!servicesRef.current?.contains(e.target as Node)) setServicesOpen(false);
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [servicesOpen]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const goHome = () => {
    if (currentPage === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigateTo('home');
    }
  };

  const home: NavLink = { label: 'Accueil', href: '/', page: 'home', action: goHome };
  // Le logo ramène à l'accueil : le lien « Accueil » n'apparaît que dans le menu mobile.
  const navLinks: NavLink[] = [
    { label: 'Réalisations', href: '/#realisations' },
    { label: 'À propos', href: '/#about' },
    { label: 'Zones', href: '/#zones' },
    { label: 'FAQ', href: '/#faq' },
    { label: 'Contact', href: '/contact', page: 'contact', action: () => navigateTo('contact') },
  ];

  const isActive = (link: NavLink) =>
    link.page ? link.page === currentPage : link.href === `/#${activeSection}`;
  const ariaCurrent = (link: NavLink) => {
    if (!isActive(link)) return undefined;
    return link.page ? 'page' : 'location';
  };

  const handleLinkClick = (e: React.MouseEvent, link: NavLink) => {
    e.preventDefault();
    setMobileOpen(false);
    if (link.action) {
      link.action();
      return;
    }
    const id = link.href.replace('/#', '');
    const scrollToSection = () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    if (currentPage !== 'home') {
      navigateTo('home');
      setTimeout(scrollToSection, 150);
    } else {
      scrollToSection();
    }
  };

  const goService = (slug: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setServicesOpen(false);
    setMobileOpen(false);
    navigateTo(slug);
  };

  // À la souris, le menu « Services » s'ouvre au survol et se referme après un court délai.
  const hoverOpen = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    window.clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const hoverClose = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setServicesOpen(false), 140);
  };

  // Sur l'accueil, la barre est transparente tant qu'elle repose sur la photo du hero.
  const overHero = currentPage === 'home' && !scrolled && !mobileOpen;

  const linkClass = `inline-flex items-center gap-1.5 h-10 px-3.5 xl:px-4 rounded-full whitespace-nowrap text-[15px] font-medium transition-colors duration-200 ${
    overHero
      ? 'text-white/90 hover:text-white hover:bg-white/15 data-[active=true]:text-white data-[active=true]:bg-white/15'
      : 'text-slate-600 hover:text-[#0A192F] hover:bg-[#F1F5F8] data-[active=true]:text-[#0A192F] data-[active=true]:bg-[#F1F5F8]'
  }`;

  return (
    // L'en-tête ne capte pas les clics : seuls la capsule, le voile et le panneau mobile le font.
    <header className="fixed top-0 inset-x-0 z-[1000] pointer-events-none">
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="menu-scrim"
            aria-hidden="true"
            onClick={() => setMobileOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2, ease: EASE } }}
            exit={{ opacity: 0, transition: { duration: 0.12, ease: 'easeOut' } }}
            className="lg:hidden pointer-events-auto fixed inset-0 bg-[#0A192F]/55"
          />
        )}
      </AnimatePresence>

      <div className="relative max-w-7xl mx-auto px-1.5 sm:px-3 md:px-9 pt-2 lg:pt-3">
        <div
          className={`pointer-events-auto h-14 lg:h-16 pl-2.5 pr-1.5 sm:pl-3 lg:pr-2.5 flex items-center justify-between gap-4 rounded-full transition-[background-color,box-shadow] duration-200 ${
            overHero
              ? 'bg-transparent shadow-none'
              : 'bg-white shadow-[0_14px_34px_-14px_rgba(10,25,47,0.32),0_2px_6px_-2px_rgba(10,25,47,0.1)]'
          }`}
        >
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setMobileOpen(false);
              goHome();
            }}
            className="flex items-center gap-2.5 lg:gap-3 shrink-0 rounded-xl"
          >
            <MCLogo size={44} className="shrink-0 h-10 w-auto lg:h-11" onDark={overHero} />
            <span className="flex flex-col">
              <span
                className={`font-display font-semibold text-[18px] lg:text-[19px] leading-none tracking-[-0.025em] transition-colors duration-200 ${
                  overHero ? 'text-white' : 'text-[#0A192F]'
                }`}
              >
                Monte Charge
              </span>
              <span
                className={`mt-[5px] text-[12px] font-medium leading-none transition-colors duration-200 ${
                  overHero ? 'text-white/80' : 'text-slate-500'
                }`}
              >
                BatiMove Genève
              </span>
            </span>
          </a>

          <nav aria-label="Navigation principale" className="hidden lg:flex items-center gap-0.5">
            <div
              ref={servicesRef}
              className="relative"
              onPointerEnter={hoverOpen}
              onPointerLeave={hoverClose}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setServicesOpen(false);
              }}
            >
              <button
                ref={servicesBtnRef}
                type="button"
                aria-expanded={servicesOpen}
                aria-controls="menu-services"
                data-active={servicesOpen || onServicePage}
                onPointerDown={(e) => {
                  lastPointer.current = e.pointerType;
                }}
                onClick={() => {
                  // À la souris le survol a déjà ouvert le menu : le clic ne doit pas le refermer.
                  const byMouse = lastPointer.current === 'mouse';
                  lastPointer.current = '';
                  setServicesOpen((open) => (byMouse ? true : !open));
                }}
                className={linkClass}
              >
                Services
                <ChevronDown
                  size={16}
                  aria-hidden="true"
                  className={`-mr-1 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    id="menu-services"
                    initial={{ opacity: 0, y: reduce ? 0 : -6 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.18, ease: EASE } }}
                    exit={{ opacity: 0, transition: { duration: 0.1, ease: 'easeOut' } }}
                    className="absolute -left-3 top-full pt-[22px]"
                  >
                    <div className="w-[24rem] rounded-[24px] bg-white p-2 shadow-[0_24px_60px_-20px_rgba(10,25,47,0.4)]">
                      <ul>
                        {SERVICE_NAV.map(({ slug, Icon, hint }) => (
                          <li key={slug}>
                            <a
                              href={`/${slug}`}
                              onClick={goService(slug)}
                              aria-current={currentPage === slug ? 'page' : undefined}
                              className="group flex items-center gap-3.5 p-2 pr-3.5 rounded-2xl hover:bg-[#F1F5F8] aria-[current=page]:bg-[#F1F5F8] transition-colors duration-200"
                            >
                              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#F1F5F8] text-[#0052A3] group-hover:bg-white group-aria-[current=page]:bg-white transition-colors duration-200">
                                <Icon size={21} strokeWidth={1.6} aria-hidden="true" />
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block text-[15px] font-semibold leading-tight text-[#0A192F]">
                                  {servicePages[slug].navLabel}
                                </span>
                                <span className="mt-1 block truncate text-[13px] leading-tight text-slate-600">
                                  {hint}
                                </span>
                              </span>
                              <ArrowUpRight
                                size={16}
                                aria-hidden="true"
                                className="shrink-0 text-slate-400 group-hover:text-[#0A192F] transition-colors duration-200"
                              />
                            </a>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-2 border-t border-slate-200 pt-2">
                        <a
                          href={waLink()}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setServicesOpen(false)}
                          className="group flex items-center gap-3.5 h-12 pl-2 pr-3.5 rounded-2xl text-[14px] font-medium text-[#0A192F] hover:bg-[#F1F5F8] transition-colors duration-200"
                        >
                          <span className="grid w-11 shrink-0 place-items-center">
                            <WhatsAppGlyph className="h-[18px] w-[18px] text-[#0052A3]" />
                          </span>
                          <span className="flex-1 whitespace-nowrap">Un autre objet&#8239;? Envoyez une photo</span>
                          <ArrowUpRight
                            size={16}
                            aria-hidden="true"
                            className="shrink-0 text-slate-400 group-hover:text-[#0A192F] transition-colors duration-200"
                          />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link)}
                aria-current={ariaCurrent(link)}
                data-active={isActive(link)}
                className={linkClass}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <a
              href={PHONE_TEL}
              className={`press inline-flex items-center justify-center gap-2 h-10 w-10 sm:h-11 sm:w-auto sm:px-5 rounded-full text-[15px] font-semibold tabular-nums whitespace-nowrap ${
                overHero
                  ? 'bg-white hover:bg-[#F1F5F8] text-[#0A192F]'
                  : 'bg-[#E10600] hover:bg-[#C80500] text-white'
              }`}
            >
              <Phone size={16} aria-hidden="true" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">{PHONE_DISPLAY}</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label="Menu"
              aria-expanded={mobileOpen}
              aria-controls="menu-mobile"
              className={`lg:hidden w-11 h-11 inline-flex items-center justify-center rounded-full transition-colors duration-200 ${
                overHero ? 'text-white' : 'text-[#0A192F] hover:bg-[#F1F5F8]'
              }`}
            >
              <span aria-hidden="true" className="relative block w-[22px] h-4">
                <span
                  className={`absolute inset-x-0 top-1/2 -mt-px h-0.5 rounded-full bg-current transition-transform duration-200 ${
                    mobileOpen ? 'rotate-45' : '-translate-y-[4.5px]'
                  }`}
                />
                <span
                  className={`absolute inset-x-0 top-1/2 -mt-px h-0.5 rounded-full bg-current transition-transform duration-200 ${
                    mobileOpen ? '-rotate-45' : 'translate-y-[4.5px]'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="menu-panel"
              id="menu-mobile"
              initial={{ opacity: 0, y: reduce ? 0 : -8 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.2, ease: EASE } }}
              exit={{ opacity: 0, transition: { duration: 0.12, ease: 'easeOut' } }}
              data-lenis-prevent
              className="lg:hidden pointer-events-auto absolute top-full inset-x-1.5 sm:inset-x-3 md:inset-x-9 mt-2 max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain rounded-[28px] bg-white shadow-[0_24px_60px_-20px_rgba(10,25,47,0.45)]"
            >
              <nav aria-label="Navigation principale" className="px-5 sm:px-7 pt-1.5 pb-5">
                <ul>
                  <li className="border-b border-slate-200">
                    <a
                      href={home.href}
                      onClick={(e) => handleLinkClick(e, home)}
                      aria-current={currentPage === 'home' ? 'page' : undefined}
                      className={MOBILE_LINK}
                    >
                      {home.label}
                    </a>
                  </li>
                  <li className="border-b border-slate-200">
                    <button
                      type="button"
                      aria-expanded={mobileServices}
                      aria-controls="menu-mobile-services"
                      onClick={() => setMobileServices((open) => !open)}
                      className={`${MOBILE_LINK} w-full justify-between`}
                    >
                      Services
                      <ChevronDown
                        size={20}
                        aria-hidden="true"
                        className={`text-slate-500 transition-transform duration-200 ${mobileServices ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <div
                      id="menu-mobile-services"
                      inert={!mobileServices}
                      className={`grid transition-[grid-template-rows] duration-200 motion-reduce:transition-none ${
                        mobileServices ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                      }`}
                    >
                      <ul className="overflow-hidden">
                        {SERVICE_NAV.map(({ slug, Icon }) => (
                          <li key={slug} className="last:pb-3">
                            <a
                              href={`/${slug}`}
                              onClick={goService(slug)}
                              aria-current={currentPage === slug ? 'page' : undefined}
                              className="flex items-center gap-3 h-[52px] text-[16px] font-medium text-[#0A192F]"
                            >
                              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-[#F1F5F8] text-[#0052A3]">
                                <Icon size={19} strokeWidth={1.6} aria-hidden="true" />
                              </span>
                              {servicePages[slug].navLabel}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                  {navLinks.map((link) => (
                    <li key={link.label} className="border-b border-slate-200">
                      <a
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link)}
                        aria-current={link.page && link.page === currentPage ? 'page' : undefined}
                        className={MOBILE_LINK}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <a
                    href={waLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="press flex items-center justify-center gap-2.5 h-14 px-6 rounded-full bg-[#E10600] hover:bg-[#C80500] text-white text-base font-semibold"
                  >
                    <WhatsAppGlyph className="w-5 h-5" />
                    Devis gratuit sur WhatsApp
                  </a>
                  <a
                    href={PHONE_TEL}
                    className="press flex items-center justify-center gap-2.5 h-14 px-6 rounded-full border border-slate-300 hover:border-[#0A192F] text-[#0A192F] text-base font-semibold tabular-nums"
                  >
                    <Phone size={18} aria-hidden="true" />
                    {PHONE_DISPLAY}
                  </a>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

const MOBILE_LINK =
  'flex items-center h-[54px] font-display font-semibold text-[19px] tracking-[-0.02em] text-[#0A192F]';
