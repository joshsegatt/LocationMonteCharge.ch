// Variantes AVIF allégées des photos de chantier (public/assets/work/lg),
// générées pour les photos affichées en grand : hero des pages, cartes d'étapes et bande de contact.
const LG = new Set([
  '2', '3', '4', '5', '6', '8', '11', '15', '16', '19', '20', '21',
  'real-geneva-1', 'real-geneva-3',
]);

/** Largeur occupée par la photo du hero des pages dédiées, à partir de 1024 px. */
export const PAGE_HERO_SIZES = '(min-width: 1024px) 44vw, 100vw';

/** En dessous de 1024 px, le hero est un bandeau pleine largeur : variante recadrée, moitié moins lourde. */
export const PAGE_HERO_MOBILE_MEDIA = 'not all and (min-width: 1024px)';
export const PAGE_HERO_DESKTOP_MEDIA = '(min-width: 1024px)';

// Photos de hero avec variante mobile 3:2 (lg/<nom>-m800.avif et -m1200.avif), même cadrage
// que object-cover à 30 % de hauteur. Les sources de moins de 1200 px n'ont que la variante 800.
const HERO_MOBILE = new Set(['2', '3', '4', '5', '6', '8', '11', '16', '20', '21', 'real-geneva-1']);
const HERO_MOBILE_SMALL = new Set(['real-geneva-1']);

/** "/assets/work/20.webp" → srcset AVIF du bandeau mobile, ou undefined si la variante n'existe pas. */
export function avifMobileSrcSet(src: string): string | undefined {
  const m = /^\/assets\/work\/([\w-]+)\.webp$/.exec(src);
  if (!m || !HERO_MOBILE.has(m[1])) return undefined;
  const small = `/assets/work/lg/${m[1]}-m800.avif 800w`;
  return HERO_MOBILE_SMALL.has(m[1]) ? small : `${small}, /assets/work/lg/${m[1]}-m1200.avif 1200w`;
}

/** "/assets/work/20.webp" → srcset AVIF 800w + 1200w, ou undefined si la variante n'existe pas. */
export function avifSrcSet(src: string): string | undefined {
  const m = /^\/assets\/work\/([\w-]+)\.webp$/.exec(src);
  if (!m || !LG.has(m[1])) return undefined;
  return `/assets/work/lg/${m[1]}-800.avif 800w, /assets/work/lg/${m[1]}-1200.avif 1200w`;
}
