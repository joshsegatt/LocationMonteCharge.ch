// SEO par page : une seule source pour le HTML pré-rendu au build (renderHead)
// et pour la navigation dans l'application (applyPageSeo).

import { regionalZones } from '../data/regionalZones';
import { servicePages } from '../data/servicePages';
import { HOME_FAQS, type FaqItem } from '../data/homeFaqs';
import { zoneFaqs } from '../data/zoneFaqs';
import { zonePhoto } from '../data/zonePhotos';
import { avifSrcSet, avifMobileSrcSet, PAGE_HERO_SIZES, PAGE_HERO_MOBILE_MEDIA, PAGE_HERO_DESKTOP_MEDIA } from './photo';
import { pathFromPage } from './routes';

export const BASE_URL = 'https://www.locationmontecharge.ch';

const BUSINESS_ID = `${BASE_URL}/#business`;
const WEBSITE_ID = `${BASE_URL}/#website`;
const OG_IMAGE = `${BASE_URL}/og-monte-meuble.jpg`;
const OG_IMAGE_ALT = "Camion monte-meuble BatiMove déployé devant une façade d'immeuble à Genève";

const HOME_TITLE = 'Location Monte-Meuble Genève & Vaud | BatiMove Sàrl';
const HOME_DESCRIPTION =
  "Location de monte-meuble avec opérateur à Genève et Vaud. Passage par la fenêtre jusqu'au 10ᵉ étage (500 kg). Devis gratuit au 0800 825 925 ou sur WhatsApp.";

const CONTACT_TITLE = 'Devis Monte-Meuble Genève & Vaud | BatiMove Sàrl';
const CONTACT_DESCRIPTION =
  'Réservez un monte-meuble ou un monte-charge à Genève et Vaud avec BatiMove Sàrl. Devis gratuit et sans engagement au 0800 825 925 ou sur WhatsApp.';

export interface ImagePreload {
  type?: string;
  media?: string;
  href?: string;
  srcset?: string;
  sizes?: string;
}

export interface PageSeo {
  title: string;
  description: string;
  /** Adresse canonique complète. */
  url: string;
  ogImage: string;
  ogImageAlt: string;
  /** Image principale de la page (adresse complète), reprise dans le sitemap. */
  image: string;
  /** Image du premier écran (LCP), préchargée dans le HTML pré-rendu. */
  preloads: ImagePreload[];
  jsonLd: Record<string, unknown>;
}

// Mêmes sources que le <picture> de HeroV2
const HOME_PRELOADS: ImagePreload[] = [
  {
    type: 'image/avif',
    media: '(max-width: 767px)',
    srcset: '/assets/hero/facade-portrait-1000.avif 1000w, /assets/hero/facade-portrait-1400.avif 1400w',
    sizes: '160vw',
  },
  {
    type: 'image/avif',
    media: '(min-width: 768px)',
    srcset:
      '/assets/hero/facade-wide-960.avif 960w, /assets/hero/facade-wide-1360.avif 1360w, /assets/hero/facade-wide-1920.avif 1920w',
    sizes: '(max-width: 1023px) 130vw, 100vw',
  },
];

// Même source que le <picture> de PageHero
const pageHeroPreload = (photo: string): ImagePreload[] => {
  const srcset = avifSrcSet(photo);
  if (!srcset) return [{ href: photo }];
  const mobile = avifMobileSrcSet(photo);
  if (!mobile) return [{ type: 'image/avif', srcset, sizes: PAGE_HERO_SIZES }];
  return [
    { type: 'image/avif', media: PAGE_HERO_MOBILE_MEDIA, srcset: mobile, sizes: '100vw' },
    { type: 'image/avif', media: PAGE_HERO_DESKTOP_MEDIA, srcset, sizes: PAGE_HERO_SIZES },
  ];
};

const businessNode = () => ({
  '@type': ['LocalBusiness', 'MovingCompany'],
  '@id': BUSINESS_ID,
  name: 'Location monte-meuble BATIMOVE SARL',
  legalName: 'BatiMove Sàrl',
  alternateName: [
    'Monte-Charge Genève, BatiMove Sàrl',
    'Location Monte-Meuble Genève',
    'Location Monte Charge Suisse',
    'Monte-Charge BatiMove',
    'BatiMove Levage',
    'Monte-Meuble Lausanne',
  ],
  identifier: 'CHE-143.091.230',
  image: OG_IMAGE,
  logo: `${BASE_URL}/favicon-512x512.png`,
  telephone: '+41798896406',
  email: 'info@batimove.ch',
  url: `${BASE_URL}/`,
  sameAs: [
    'https://batimove.ch',
    'https://wa.me/41798896406',
    'https://www.google.com/search?q=Location+monte-meuble+BATIMOVE+SARL',
    'https://maps.google.com/?q=Location+monte-meuble+BATIMOVE+SARL',
  ],
  hasMap: 'https://maps.google.com/?q=Location+monte-meuble+BATIMOVE+SARL',
  parentOrganization: {
    '@type': 'Organization',
    '@id': 'https://batimove.ch/#organization',
    name: 'BatiMove Sàrl',
    url: 'https://batimove.ch',
    identifier: 'CHE-143.091.230',
  },
  priceRange: 'CHF',
  currenciesAccepted: 'CHF',
  paymentAccepted: 'Cash, Credit Card, Bank Transfer, TWINT, QR-Facture',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rue De-Monthoux 64',
    addressLocality: 'Genève',
    postalCode: '1201',
    addressRegion: 'Genève',
    addressCountry: 'CH',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 46.2115, longitude: 6.1485 },
  openingHours: 'Mo-Sa 07:00-20:00',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '07:00',
      closes: '20:00',
    },
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+41800825925',
      contactType: 'customer service',
      contactOption: 'TollFree',
      areaServed: ['CH-GE', 'CH-VD'],
      availableLanguage: ['French', 'English', 'Portuguese', 'Spanish'],
    },
    {
      '@type': 'ContactPoint',
      telephone: '+41798896406',
      contactType: 'sales',
      areaServed: ['CH-GE', 'CH-VD'],
      availableLanguage: ['French', 'English', 'Portuguese', 'Spanish'],
    },
  ],
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Canton de Genève' },
    { '@type': 'AdministrativeArea', name: 'Canton de Vaud' },
    ...[
      ['Genève', '1201'], ['Carouge', '1227'], ['Meyrin', '1217'], ['Lancy', '1212'], ['Vernier', '1214'],
      ['Cologny', '1223'], ['Versoix', '1290'], ['Chêne-Bougeries', '1224'], ['Nyon', '1260'], ['Gland', '1196'],
      ['Rolle', '1180'], ['Morges', '1110'], ['Lausanne', '1003'], ['Vevey', '1800'], ['Montreux', '1820'],
      ['Renens', '1020'], ['Pully', '1009'], ['Lutry', '1095'],
    ].map(([name, postalCode]) => ({ '@type': 'City', name, postalCode })),
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services de levage et monte-meuble BatiMove Sàrl',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Location de monte-meuble pour particuliers',
          description:
            "Passage par fenêtre et balcon de canapés, pianos et meubles lourds jusqu'au 10ᵉ étage, avec opérateur formé aux prescriptions SUVA et autorisation de voirie à Genève et Vaud.",
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Location de monte-charge pour professionnels et chantiers',
          description:
            "Approvisionnement de chantiers en plaques de plâtre, carrelage, vitrages et évacuation de gravats, jusqu'à 500 kg de charge utile par montée.",
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Autorisations de voirie et balisage',
          description:
            "Demandes d'occupation du domaine public auprès du Service de l'espace public (SEP) de Genève et des communes vaudoises, balisage de sécurité le jour de l'intervention.",
        },
      },
    ],
  },
});

const websiteNode = () => ({
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${BASE_URL}/`,
  name: 'Location Monte-Charge, BatiMove Sàrl',
  inLanguage: 'fr-CH',
  publisher: { '@id': BUSINESS_ID },
});

const webPageNode = (type: string, url: string, title: string, description: string, image: string) => ({
  '@type': type,
  '@id': `${url}#webpage`,
  url,
  name: title,
  description,
  inLanguage: 'fr-CH',
  isPartOf: { '@id': WEBSITE_ID },
  about: { '@id': BUSINESS_ID },
  primaryImageOfPage: { '@type': 'ImageObject', url: image },
});

const faqNode = (url: string, faqs: FaqItem[]) => ({
  '@type': 'FAQPage',
  '@id': `${url}#faq`,
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
});

const breadcrumbNode = (url: string, label: string) => ({
  '@type': 'BreadcrumbList',
  '@id': `${url}#breadcrumb`,
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${BASE_URL}/` },
    { '@type': 'ListItem', position: 2, name: label, item: url },
  ],
});

const graph = (...nodes: unknown[]) => ({ '@context': 'https://schema.org', '@graph': nodes });

/** Tout ce qui décrit une page aux moteurs de recherche. Fonction pure, utilisable au build. */
export function getPageSeo(page: string): PageSeo {
  const path = pathFromPage(page);
  const url = `${BASE_URL}${path}`;
  const zone = regionalZones[page];
  const service = servicePages[page];

  if (zone) {
    const photo = zonePhoto(zone.slug);
    const image = `${BASE_URL}${photo.src}`;
    return {
      title: zone.metaTitle,
      description: zone.metaDescription,
      url,
      ogImage: OG_IMAGE,
      ogImageAlt: OG_IMAGE_ALT,
      image,
      preloads: pageHeroPreload(photo.src),
      jsonLd: graph(
        businessNode(),
        websiteNode(),
        webPageNode('WebPage', url, zone.metaTitle, zone.metaDescription, image),
        {
          '@type': 'Service',
          '@id': `${url}#service`,
          name: `Location de monte-meuble à ${zone.cityName}`,
          serviceType: 'Location de monte-meuble avec opérateur',
          description: zone.metaDescription,
          url,
          image,
          provider: { '@id': BUSINESS_ID },
          areaServed: zone.specificCommunes.map((name) => ({ '@type': 'Place', name })),
        },
        breadcrumbNode(url, zone.cityName),
        faqNode(url, zoneFaqs(zone)),
      ),
    };
  }

  if (service) {
    const image = `${BASE_URL}${service.photo}`;
    return {
      title: service.metaTitle,
      description: service.metaDescription,
      url,
      ogImage: OG_IMAGE,
      ogImageAlt: OG_IMAGE_ALT,
      image,
      preloads: pageHeroPreload(service.photo),
      jsonLd: graph(
        businessNode(),
        websiteNode(),
        webPageNode('WebPage', url, service.metaTitle, service.metaDescription, image),
        {
          '@type': 'Service',
          '@id': `${url}#service`,
          name: `${service.h1Primary} ${service.h1Secondary}`,
          serviceType: 'Location de monte-meuble avec opérateur',
          description: service.metaDescription,
          url,
          image,
          provider: { '@id': BUSINESS_ID },
          areaServed: [
            { '@type': 'AdministrativeArea', name: 'Canton de Genève' },
            { '@type': 'AdministrativeArea', name: 'Canton de Vaud' },
          ],
        },
        breadcrumbNode(url, service.navLabel),
        faqNode(url, service.faqs),
      ),
    };
  }

  if (page === 'contact') {
    return {
      title: CONTACT_TITLE,
      description: CONTACT_DESCRIPTION,
      url,
      ogImage: OG_IMAGE,
      ogImageAlt: OG_IMAGE_ALT,
      image: OG_IMAGE,
      preloads: [],
      jsonLd: graph(
        businessNode(),
        websiteNode(),
        webPageNode('ContactPage', url, CONTACT_TITLE, CONTACT_DESCRIPTION, OG_IMAGE),
        breadcrumbNode(url, 'Contact'),
      ),
    };
  }

  const homeUrl = `${BASE_URL}/`;
  return {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: homeUrl,
    ogImage: OG_IMAGE,
    ogImageAlt: OG_IMAGE_ALT,
    image: OG_IMAGE,
    preloads: HOME_PRELOADS,
    jsonLd: graph(
      businessNode(),
      websiteNode(),
      webPageNode('WebPage', homeUrl, HOME_TITLE, HOME_DESCRIPTION, OG_IMAGE),
      faqNode(homeUrl, HOME_FAQS),
    ),
  };
}

const esc = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const jsonLdText = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c');

/** Balises <head> propres à la page, écrites dans le HTML pré-rendu. */
export function renderHead(seo: PageSeo): string {
  const preloads = seo.preloads.map((p) => {
    const attrs = [
      'rel="preload"',
      'as="image"',
      p.type && `type="${esc(p.type)}"`,
      p.media && `media="${esc(p.media)}"`,
      p.href && `href="${esc(p.href)}"`,
      p.srcset && `imagesrcset="${esc(p.srcset)}"`,
      p.sizes && `imagesizes="${esc(p.sizes)}"`,
      'fetchpriority="high"',
    ].filter(Boolean);
    return `<link ${attrs.join(' ')} />`;
  });

  return [
    `<title>${esc(seo.title)}</title>`,
    `<meta name="description" content="${esc(seo.description)}" />`,
    `<link rel="canonical" href="${seo.url}" />`,
    `<link rel="alternate" hreflang="fr-CH" href="${seo.url}" />`,
    `<link rel="alternate" hreflang="x-default" href="${seo.url}" />`,
    `<meta property="og:title" content="${esc(seo.title)}" />`,
    `<meta property="og:description" content="${esc(seo.description)}" />`,
    `<meta property="og:url" content="${seo.url}" />`,
    `<meta property="og:image" content="${seo.ogImage}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(seo.ogImageAlt)}" />`,
    `<meta name="twitter:title" content="${esc(seo.title)}" />`,
    `<meta name="twitter:description" content="${esc(seo.description)}" />`,
    `<meta name="twitter:image" content="${seo.ogImage}" />`,
    ...preloads,
    `<script type="application/ld+json" id="page-jsonld">${jsonLdText(seo.jsonLd)}</script>`,
  ].join('\n    ');
}

function upsert(selector: string, tag: 'meta' | 'link', attrs: Record<string, string>, valueAttr: string, value: string) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
    document.head.appendChild(el);
  }
  el.setAttribute(valueAttr, value);
}

/** Met le <head> à jour après une navigation dans l'application. */
export function applyPageSeo(seo: PageSeo) {
  document.title = seo.title;

  const meta = (attr: 'name' | 'property', key: string, value: string) =>
    upsert(`meta[${attr}="${key}"]`, 'meta', { [attr]: key }, 'content', value);

  meta('name', 'description', seo.description);
  meta('property', 'og:title', seo.title);
  meta('property', 'og:description', seo.description);
  meta('property', 'og:url', seo.url);
  meta('property', 'og:image', seo.ogImage);
  meta('property', 'og:image:alt', seo.ogImageAlt);
  meta('name', 'twitter:title', seo.title);
  meta('name', 'twitter:description', seo.description);
  meta('name', 'twitter:image', seo.ogImage);

  upsert('link[rel="canonical"]', 'link', { rel: 'canonical' }, 'href', seo.url);
  for (const lang of ['fr-CH', 'x-default']) {
    upsert(`link[rel="alternate"][hreflang="${lang}"]`, 'link', { rel: 'alternate', hreflang: lang }, 'href', seo.url);
  }

  let script = document.getElementById('page-jsonld');
  if (!script) {
    script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.id = 'page-jsonld';
    document.head.appendChild(script);
  }
  script.textContent = jsonLdText(seo.jsonLd);
}
