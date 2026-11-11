import { StrictMode } from 'react';
import { prerender } from 'react-dom/static';
import App from './App';
import { regionalZones } from './data/regionalZones';
import { getPageSeo, renderHead } from './lib/seo';

export { ALL_PAGES, pathFromPage } from './lib/routes';

export type PageKind = 'home' | 'contact' | 'zone' | 'service';

export const pageKind = (page: string): PageKind =>
  page === 'home' || page === 'contact' ? page : regionalZones[page] ? 'zone' : 'service';

/** Rend une page complète en HTML (composants lazy inclus) et son bloc <head>. Utilisé par scripts/prerender.mjs. */
export async function render(page: string): Promise<{ html: string; head: string; url: string; image: string }> {
  const { prelude } = await prerender(
    <StrictMode>
      <App initialPage={page} />
    </StrictMode>,
  );
  const html = await new Response(prelude as unknown as BodyInit).text();
  const seo = getPageSeo(page);
  return { html, head: renderHead(seo), url: seo.url, image: seo.image };
}
