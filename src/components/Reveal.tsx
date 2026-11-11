import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Décalage en secondes, pour échelonner quelques blocs d'une même rangée. */
  delay?: number;
}

type RevealState = 'static' | 'armed' | 'in';

// Apparition au défilement, une seule fois, en CSS pur.
// Le HTML pré-rendu reste visible : seuls les blocs encore sous l'écran sont masqués après
// le montage, puis révélés à l'approche. Sans mouvement si l'utilisateur l'a demandé.
export default function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<RevealState>('static');

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    setState('armed');
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setState('in');
          io.disconnect();
        }
      },
      // Marge haute très grande : un bloc dépassé pendant un défilement rapide (ou un à-coup du
      // navigateur) compte comme vu et s'affiche, il ne reste jamais masqué au-dessus de l'écran.
      { rootMargin: '100000px 0px -10% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const stateClass = state === 'armed' ? 'reveal-armed' : state === 'in' ? 'reveal-in' : '';

  return (
    <div
      ref={ref}
      className={[className, stateClass].filter(Boolean).join(' ') || undefined}
      style={state === 'in' && delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
