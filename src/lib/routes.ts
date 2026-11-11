import { regionalZones } from '../data/regionalZones';
import { servicePages } from '../data/servicePages';

// Pages avec URL propre : contact, zones régionales et services
export const isRoutedPage = (page: string) =>
  page === 'contact' || Boolean(regionalZones[page]) || Boolean(servicePages[page]);

/** "/geneve/" → "geneve" ; toute adresse inconnue retombe sur l'accueil. */
export const pageFromPath = (pathname: string): string => {
  const page = pathname.replace(/^\//, '').replace(/\/$/, '').toLowerCase();
  return page && isRoutedPage(page) ? page : 'home';
};

export const pathFromPage = (page: string): string => (page === 'home' ? '/' : `/${page}`);

/** Toutes les pages du site, pré-rendues une à une au build. */
export const ALL_PAGES: string[] = ['home', ...Object.keys(servicePages), ...Object.keys(regionalZones), 'contact'];
