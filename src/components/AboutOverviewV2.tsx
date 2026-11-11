import React, { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';
import Reveal from './Reveal';

interface AboutOverviewProps {
  onContactClick?: () => void;
}

const CARD = 'rounded-[28px] p-7 sm:p-8 flex flex-col justify-end min-h-[13.5rem]';
const CARD_TITLE = 'font-display font-semibold leading-[1.08] tracking-[-0.03em]';

// Présentation de l'entreprise : la vidéo d'une intervention réelle et quatre cartes
// de tailles différentes, une par engagement.
// 720p sur téléphone et tablette (1,9 Mo), 1080p sur grand écran (3,9 Mo). Les deux fichiers sont
// en couleurs standard (bt709) : l'original HLG coûtait une conversion à chaque image.
// Appelé seulement une fois la vidéo à l'écran, donc toujours dans le navigateur.
const liftVideo = () =>
  window.matchMedia('(min-width: 1024px)').matches ? '/assets/batimove-lift-1080.mp4' : '/assets/batimove-lift-720.mp4';

export default function AboutOverviewV2(_props: AboutOverviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  // La vidéo ne se charge que lorsqu'elle approche de l'écran
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: '200px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section id="about" className="py-16 md:py-24 bg-[#F1F5F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <Reveal className="grid lg:grid-cols-12 gap-6 lg:gap-16 lg:items-end">
          <h2 className="lg:col-span-7 font-display font-semibold text-[34px] sm:text-[48px] leading-[1.05] tracking-[-0.035em] text-[#0A192F] text-balance">
            Le monte-meuble de BatiMove Sàrl, entreprise genevoise.
          </h2>
          <div className="lg:col-span-5">
            <p className="text-base sm:text-[17px] leading-relaxed text-slate-600">
              Monte Charge est le service de levage de{' '}
              <a
                href="https://batimove.ch"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0A192F] font-semibold underline underline-offset-4 decoration-slate-300 hover:decoration-[#0A192F] transition-colors"
              >
                BatiMove Sàrl
              </a>
              , inscrite au registre du commerce de Genève. Nous montons et descendons par la façade ce qui ne passe
              pas par l’escalier.
            </p>
            <a
              href="https://batimove.ch"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block py-1 text-base font-semibold text-[#0A192F] underline underline-offset-4 decoration-slate-300 hover:decoration-[#0A192F] transition-colors"
            >
              Découvrir batimove.ch
            </a>
          </div>
        </Reveal>

        <div className="mt-10 md:mt-14 grid sm:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-5">
          {/* Vidéo d'intervention réelle */}
          <Reveal className="sm:col-span-2 lg:col-span-5 lg:row-span-2">
            <div
              ref={frameRef}
              className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[35rem] rounded-[28px] overflow-hidden bg-[#0A192F] select-none"
            >
              <video
                ref={videoRef}
                src={inView ? liftVideo() : undefined}
                poster="/assets/batimove-lift-poster.webp"
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                className="absolute inset-0 w-full h-full object-cover object-[center_35%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/80 via-transparent to-transparent pointer-events-none" />
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Mettre la vidéo en pause' : 'Lire la vidéo'}
                className="absolute inset-0 w-full h-full flex items-center justify-center rounded-[28px] focus-visible:-outline-offset-4"
              >
                <span
                  aria-hidden="true"
                  className={`w-14 h-14 rounded-full bg-white text-[#0A192F] flex items-center justify-center transition-[opacity,scale] duration-200 ${
                    isPlaying ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                  }`}
                >
                  <Play size={22} className="translate-x-0.5 fill-current" />
                </span>
              </button>
              <span className="absolute bottom-6 left-6 right-6 text-white text-[14px] leading-snug font-medium pointer-events-none">
                Levage au 3ᵉ&nbsp;étage, en vidéo
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.06} className={`${CARD} sm:col-span-2 lg:col-span-4 bg-[#0A192F] text-white`}>
            <h3 className={`${CARD_TITLE} text-white text-[30px] sm:text-[36px]`}>
              Jusqu’au 10<sup>e</sup>&nbsp;étage, 500&nbsp;kg par montée.
            </h3>
            <p className="mt-3 text-base leading-relaxed text-white/80">
              Mobilier, pianos, vitrages et matériaux de chantier.
            </p>
          </Reveal>

          <Reveal delay={0.12} className={`${CARD} lg:col-span-3 bg-[#0052A3] text-white`}>
            <h3 className={`${CARD_TITLE} text-white text-[24px] sm:text-[26px]`}>Opérateur formé SUVA</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-white/85">
              Un opérateur formé aux prescriptions SUVA installe et pilote l’échelle à chaque intervention.
            </p>
          </Reveal>

          <Reveal delay={0.12} className={`${CARD} lg:col-span-3 bg-white text-[#0A192F]`}>
            <h3 className={`${CARD_TITLE} text-[24px] sm:text-[26px]`}>Voirie prise en charge</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
              Nous préparons la demande d’occupation du domaine public auprès de votre commune.
            </p>
          </Reveal>

          <Reveal delay={0.18} className={`${CARD} sm:col-span-2 lg:col-span-4 bg-white text-[#0A192F]`}>
            <h3 className={`${CARD_TITLE} text-[30px] sm:text-[36px]`}>RC professionnelle</h3>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Chaque intervention est couverte jusqu’à CHF&nbsp;5’000’000.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
