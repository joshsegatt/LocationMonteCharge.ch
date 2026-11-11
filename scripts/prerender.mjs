// Écrit un HTML complet par page et le sitemap dans dist/ à partir du build client et du build SSR.
// Vercel sert dist/<route>/index.html avant le rewrite SPA : Google, WhatsApp et les
// visiteurs reçoivent le contenu, le titre et les données structurées de chaque page.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const manifest = JSON.parse(fs.readFileSync(path.join(dist, '.vite', 'manifest.json'), 'utf8'));
const { render, pageKind, ALL_PAGES, pathFromPage } = await import(
  pathToFileURL(path.join(ssrDir, 'entry-server.js')).href
);

const SEO_BLOCK = /<!--seo:start-->[\s\S]*?<!--seo:end-->/;
const ROOT_SLOT = '<div id="root"><!--app--></div>';
if (!SEO_BLOCK.test(template) || !template.includes(ROOT_SLOT)) {
  throw new Error('index.html : repères seo ou racine introuvables');
}

// Chunks chargés à la demande par type de page, préchargés pour raccourcir l'hydratation
const component = (name) => `src/components/${name}.tsx`;
const LAZY = {
  home: ['NavV2', 'HeroV2', 'HowItWorks', 'WorkShowcase', 'AboutOverviewV2', 'LocalSeoZones', 'FaqSection', 'CtaBand'],
  contact: ['NavV2', 'ContactPage'],
  zone: ['NavV2', 'RegionalLandingPage'],
  service: ['NavV2', 'ServiceLandingPage'],
};

const collect = (key, into) => {
  const chunk = manifest[key];
  if (!chunk || into.has(chunk.file)) return;
  into.add(chunk.file);
  for (const dep of chunk.imports ?? []) collect(dep, into);
};

const entryKey = Object.keys(manifest).find((key) => manifest[key].isEntry);
if (!entryKey) throw new Error('manifest : entrée introuvable');
const entryFiles = new Set();
collect(entryKey, entryFiles);

function lazyChunks(kind) {
  const files = new Set();
  for (const name of LAZY[kind]) {
    if (!manifest[component(name)]) throw new Error(`manifest : ${component(name)} introuvable`);
    collect(component(name), files);
  }
  return [...files].filter((file) => !entryFiles.has(file));
}

// Polices du premier écran (sous-ensemble latin), auto-hébergées
const assets = fs.readdirSync(path.join(dist, 'assets'));
const fonts = ['inter-latin-wght-normal', 'plus-jakarta-sans-latin-wght-normal'].map((name) => {
  const file = assets.find((f) => f.startsWith(name) && f.endsWith('.woff2'));
  if (!file) throw new Error(`police ${name} introuvable dans dist/assets`);
  return `<link rel="preload" as="font" type="font/woff2" href="/assets/${file}" crossorigin />`;
});

const sitemap = [];
for (const page of ALL_PAGES) {
  const { html, head, url, image } = await render(page);
  sitemap.push({ url, image });

  // React peut émettre des <link rel="preload"> en tête du flux : ils vont dans le <head>
  let body = html;
  const hoisted = [];
  for (;;) {
    const m = /^<link\b[^>]*>/.exec(body);
    if (!m) break;
    hoisted.push(m[0]);
    body = body.slice(m[0].length);
  }
  if (!body.startsWith('<div')) throw new Error(`${page} : HTML inattendu (${body.slice(0, 80)})`);

  const preloads = lazyChunks(pageKind(page)).map((file) => `<link rel="modulepreload" crossorigin href="/${file}" />`);
  const headBlock = [head, ...fonts, ...hoisted, ...preloads].join('\n    ');

  const out = template
    .replace(SEO_BLOCK, () => headBlock)
    .replace(ROOT_SLOT, () => `<div id="root" data-page="${page}">${body}</div>`);

  const route = pathFromPage(page);
  const file = route === '/' ? path.join(dist, 'index.html') : path.join(dist, route.slice(1), 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, out);
}

// Sitemap : les mêmes pages, leur adresse canonique et leur image principale
const today = new Date().toISOString().slice(0, 10);
const xml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    ...sitemap.map(
      ({ url, image }) =>
        `  <url>\n    <loc>${xml(url)}</loc>\n    <lastmod>${today}</lastmod>\n    <image:image>\n      <image:loc>${xml(image)}</image:loc>\n    </image:image>\n  </url>`,
    ),
    '</urlset>',
    '',
  ].join('\n'),
);

fs.rmSync(path.join(dist, '.vite'), { recursive: true, force: true });
fs.rmSync(ssrDir, { recursive: true, force: true });
console.log(`prerender : ${sitemap.length} pages et sitemap.xml écrits dans dist/`);
