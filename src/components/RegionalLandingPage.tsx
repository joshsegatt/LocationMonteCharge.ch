import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Phone, ArrowRight, ShieldCheck, Clock, MapPin, Maximize2, ChevronRight } from 'lucide-react';
import { RegionalZone } from '../data/regionalZones';
import StatsBannerV2 from './StatsBannerV2';
import WorkShowcase from './WorkShowcase';
import FaqSection from './FaqSection';

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

  // Dynamically update page title, meta description, and canonical URL on mount
  useEffect(() => {
    document.title = zone.metaTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', zone.metaDescription);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [zone]);

  return (
    <motion.div
      key={zone.slug}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col bg-[#F1F5F8] text-slate-900"
    >
      {/* ── SECTION 1: Monumental Regional Hero (Strict Swiss Optical Standard) ── */}
      <section className="relative w-full overflow-hidden bg-white text-slate-900 pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 border-b border-slate-100">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full">
          
          {/* Breadcrumb Navigation */}
          <nav aria-label="Fil d'Ariane" className="flex items-center gap-1.5 text-xs text-slate-500 mb-6 font-medium">
            <button 
              onClick={() => navigateTo('home')} 
              className="hover:text-[#0052A3] transition-colors cursor-pointer"
            >
              Accueil
            </button>
            <ChevronRight size={13} className="text-slate-400" />
            <span className="text-slate-400">Zones &amp; Villes</span>
            <ChevronRight size={13} className="text-slate-400" />
            <span className="text-slate-900 font-bold">{zone.cityName}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Typography & CTAs */}
            <div className="lg:col-span-5 flex flex-col items-start text-left z-20">
              {/* Category */}
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-[#0052A3] mb-1.5 font-sans">
                {zone.heroCategory}
              </p>

              {/* Verified Google Business Profile Link */}
              <a 
                href="https://www.google.com/search?q=Location+monte-meuble+BATIMOVE+SARL" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-slate-700 hover:text-[#0052A3] transition-colors mb-4 group cursor-pointer"
                title="Consulter la fiche officielle Location monte-meuble BATIMOVE SARL sur Google"
              >
                <span className="text-[#F59E0B] tracking-tight text-sm">★★★★★</span>
                <span className="font-extrabold text-slate-900">5.0</span>
                <span className="text-slate-500 font-medium group-hover:underline">sur Google (4 avis clients vérifiés)</span>
              </a>

              {/* H1 Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[48px] xl:text-[54px] font-display font-black text-slate-950 tracking-[-0.035em] leading-[1.05] mb-5">
                <span>{zone.h1Primary}</span> <br />
                <span className="bg-gradient-to-r from-[#0052A3] via-[#0066CC] to-[#0A2540] bg-clip-text text-transparent">
                  {zone.h1Secondary}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-slate-600 text-sm sm:text-base lg:text-[17px] leading-relaxed mb-7 max-w-xl font-normal text-pretty">
                {zone.subtitle}
              </p>

              {/* High-Conversion Direct Action CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto mb-6">
                <button 
                  type="button"
                  onClick={onOpenQuoteModal}
                  className="group relative px-7 sm:px-8 py-3.5 sm:py-4 bg-[#E10600] hover:bg-[#C80500] text-white text-xs sm:text-sm font-bold rounded-xl uppercase tracking-wider transition-all duration-300 shadow-[0_8px_25px_rgba(225,6,0,0.32)] hover:shadow-[0_12px_32px_rgba(225,6,0,0.48)] hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center gap-2.5 cursor-pointer overflow-hidden"
                >
                  <span className="relative z-10">Devis direct à {zone.cityName}</span>
                  <ArrowRight size={15} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <a
                  href="tel:0800825925"
                  className="px-6 py-3.5 sm:py-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-900 text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 inline-flex items-center gap-2 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:border-slate-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <Phone size={15} className="text-[#0052A3]" />
                  <span>0800 825 925 (Gratuit)</span>
                </a>
              </div>

              {/* Status and ETA */}
              <p className="text-xs text-slate-500 font-medium">
                Secteur {zone.cityName} • {zone.eta} • Devis sans engagement sur WhatsApp
              </p>
            </div>

            {/* Right Column: Dual Authentic Swiss Photos */}
            <div className="lg:col-span-7 relative flex items-center justify-center lg:justify-end">
              <div 
                className="absolute -inset-2 sm:-inset-4 bg-gradient-to-tr from-[#0052A3]/10 via-[#38BDF8]/06 to-transparent rounded-3xl blur-2xl pointer-events-none -z-10" 
                aria-hidden="true"
              />
              <div 
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[92%] h-8 bg-slate-950/20 blur-xl rounded-[100%] pointer-events-none -z-10" 
                aria-hidden="true"
              />

              <div className="grid grid-cols-12 gap-3 sm:gap-4 w-full items-center">
                {/* Photo 1: Road & Alps */}
                <div 
                  onClick={() => onImageClick('/assets/hero-swiss-road.jpg')}
                  className="col-span-5 relative rounded-2xl lg:rounded-3xl overflow-hidden border border-slate-200/90 ring-1 ring-black/[0.04] shadow-[0_20px_50px_rgba(10,25,47,0.12)] bg-slate-100 group cursor-pointer transition-all duration-500 hover:shadow-[0_28px_60px_rgba(0,82,163,0.18)] hover:-translate-y-1"
                  title="Cliquer pour afficher la vue en plein écran"
                >
                  <picture>
                    <source srcSet="/assets/hero-swiss-road.webp" type="image/webp" />
                    <img 
                      src="/assets/hero-swiss-road.webp" 
                      alt={`Camion monte-meuble BatiMove sur route en direction de ${zone.cityName}`}
                      width="600"
                      height="800"
                      loading="eager"
                      fetchPriority="high"
                      className="w-full h-[260px] sm:h-[340px] lg:h-[400px] object-cover object-[center_35%] select-none transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-left">
                    <span className="text-[10px] sm:text-xs font-bold text-white block drop-shadow-sm">
                      {zone.canton}
                    </span>
                    <span className="text-[9px] sm:text-[11px] text-slate-300 font-normal">
                      Flotte active • {zone.cityName}
                    </span>
                  </div>
                </div>

                {/* Photo 2: Truck Profile */}
                <div 
                  onClick={() => onImageClick('/assets/hero-swiss-profile.webp')}
                  className="col-span-7 relative rounded-2xl lg:rounded-3xl overflow-hidden border border-slate-200/90 ring-1 ring-black/[0.04] shadow-[0_24px_55px_rgba(10,25,47,0.14)] bg-slate-100 group cursor-pointer transition-all duration-500 hover:shadow-[0_32px_65px_rgba(0,82,163,0.22)] hover:-translate-y-1"
                  title="Cliquer pour afficher la vue profil en plein écran"
                >
                  <picture>
                    <source srcSet="/assets/hero-swiss-profile.webp" type="image/webp" />
                    <img 
                      src="/assets/hero-swiss-profile.webp" 
                      alt={`Véhicule monte-meuble télescopique BatiMove déployé pour ${zone.cityName}`}
                      width="800"
                      height="600"
                      loading="eager"
                      fetchPriority="high"
                      className="w-full h-[260px] sm:h-[340px] lg:h-[400px] object-cover object-[center_40%] select-none transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between">
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-white block drop-shadow-sm">
                        Élévateur Télescopique 33m
                      </span>
                      <span className="text-[10px] sm:text-xs text-slate-300 font-normal">
                        Jusqu'au 10ᵉ étage (500 kg) • Normes SUVA
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#0052A3] transition-colors">
                      <Maximize2 size={13} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 2: Official KPI Ribbon ── */}
      <section className="bg-white border-b border-slate-200/80 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            <div>
              <div className="text-2xl sm:text-3xl font-display font-black text-slate-950">
                33 <span className="text-xs sm:text-sm text-[#0052A3] font-bold uppercase">Mètres</span>
              </div>
              <div className="text-xs text-slate-600 font-medium mt-0.5">
                Hauteur utile jusqu'au 10ᵉ étage
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-display font-black text-slate-950">
                500 <span className="text-xs sm:text-sm text-[#0052A3] font-bold uppercase">KG MAX</span>
              </div>
              <div className="text-xs text-slate-600 font-medium mt-0.5">
                Capacité certifiée canapés &amp; pianos
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-display font-black text-slate-950">
                SUVA <span className="text-xs sm:text-sm text-emerald-600 font-bold uppercase">Certifié</span>
              </div>
              <div className="text-xs text-slate-600 font-medium mt-0.5">
                Opérateur qualifié à chaque montée
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-display font-black text-slate-950 truncate">
                {zone.cityName.toUpperCase()}
              </div>
              <div className="text-xs text-slate-600 font-medium mt-0.5">
                Démarches de voirie locale incluses
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: Dedicated Local Coverage & Municipal Permitting Hub ── */}
      <section className="py-12 md:py-16 bg-[#F1F5F8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-slate-950 tracking-tight leading-tight mb-2.5">
              Intervention Locale <span className="text-[#0052A3]">— {zone.cityName}</span>
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Déploiement sur-mesure dans votre quartier. Prise en charge des contraintes d'accès (rues étroites, cours intérieures, pentes) et formalités officielles.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
            {/* Card 1: Specific Sub-localities & Communes */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-[0_4px_20px_rgba(10,25,47,0.04)]">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2 text-slate-900 font-display font-bold text-lg">
                  <MapPin size={20} className="text-[#0052A3]" />
                  <span>Secteurs &amp; Communes Desservis</span>
                </div>
                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                  <Clock size={13} />
                  <span>{zone.eta}</span>
                </span>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                Nos camions monte-meubles interviennent quotidiennement sur l'ensemble des quartiers de {zone.cityName} et des communes limitrophes sans surcoût de déplacement.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                {zone.specificCommunes.map((c, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-slate-700 py-1 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0052A3] shrink-0" />
                    <span className="truncate">{c}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>Codes postaux prioritaires : <strong className="text-slate-800">{zone.postalCodes.slice(0, 5).join(', ')}...</strong></span>
                <span className="text-[#0052A3] font-semibold">Tarif local direct</span>
              </div>
            </div>

            {/* Card 2: Permitting and Safety Compliance */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-[0_4px_20px_rgba(10,25,47,0.04)] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-slate-900 font-display font-bold text-lg pb-4 mb-4 border-b border-slate-100">
                  <ShieldCheck size={20} className="text-[#0052A3]" />
                  <span>Voirie &amp; Sécurité Réglementaire</span>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <p>
                    <strong className="text-slate-900 font-semibold block mb-1">Autorisation de Stationnement :</strong>
                    {zone.voirieInfo}
                  </p>
                  <p>
                    <strong className="text-slate-900 font-semibold block mb-1">Sécurisation des Tiers (SUVA) :</strong>
                    Pose obligatoire d'un périmètre de sécurité avec cônes homologués, calage au sol pour préserver le bitume et surveillance continue par notre technicien.
                  </p>
                  <p>
                    <strong className="text-slate-900 font-semibold block mb-1">Assurance RC Professionnelle :</strong>
                    Couverture globale à hauteur de 5'000'000 CHF pour chaque mission.
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onOpenQuoteModal}
                  className="w-full py-3 bg-[#0A192F] hover:bg-[#0052A3] text-white text-xs font-bold rounded-xl uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Demander un devis pour {zone.cityName}</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>

          {/* Other Regional Hubs Quick Switcher */}
          <div className="p-4 sm:p-6 bg-white rounded-2xl border border-slate-200/90 flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-600 font-medium text-center md:text-left">
              Vous avez besoin d'une intervention dans une autre région de Suisse Romande ?
            </span>
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {['lausanne', 'nyon', 'morges', 'vevey', 'geneve', 'carouge', 'plainpalais', 'eaux-vives', 'meyrin'].map((slug) => (
                <button
                  key={slug}
                  onClick={() => navigateTo(slug)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    slug === zone.slug 
                      ? "bg-[#0052A3] text-white" 
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {slug.charAt(0).toUpperCase() + slug.slice(1)}
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 4: Technical Capabilities Banner ── */}
      <StatsBannerV2 />

      {/* ── SECTION 5: Real-World 3D Coverflow Showcase (22 Authentic Photos) ── */}
      <div className="bg-[#0A192F] relative overflow-hidden text-white perspective-1200 py-6 md:py-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_15%,rgba(0,82,163,0.2),transparent_70%)] pointer-events-none" />
        <WorkShowcase onImageClick={onImageClick} />
      </div>

      {/* ── SECTION 6: FAQ ── */}
      <FaqSection onOpenQuoteModal={onOpenQuoteModal} />
    </motion.div>
  );
}
