// Centralized SPA meta management: keeps title, description, canonical and
// social tags in sync with the current page so every route has correct SEO.

export const BASE_URL = 'https://www.locationmontecharge.ch';

export const DEFAULT_META = {
  title: 'Location Monte-Meuble Genève & Vaud | BatiMove Sàrl',
  description:
    "Location de monte-meuble à Genève et Vaud avec opérateur SUVA. Passage par fenêtre jusqu'au 10ᵉ étage (500 kg). Devis immédiat au 0800 825 925 ou WhatsApp.",
};

function setContent(selector: string, value: string) {
  const el = document.querySelector(selector);
  if (el) el.setAttribute('content', value);
}

export interface PageMeta {
  title: string;
  description: string;
  /** Path starting with "/", e.g. "/geneve" or "/" for home. */
  path: string;
}

export function setPageMeta({ title, description, path }: PageMeta) {
  const url = `${BASE_URL}${path === '/' ? '/' : path}`;

  document.title = title;
  setContent('meta[name="description"]', description);
  setContent('meta[property="og:title"]', title);
  setContent('meta[property="og:description"]', description);
  setContent('meta[property="og:url"]', url);
  setContent('meta[name="twitter:title"]', title);
  setContent('meta[name="twitter:description"]', description);

  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', url);

  document
    .querySelectorAll('link[rel="alternate"][hreflang]')
    .forEach((l) => l.setAttribute('href', url));
}
