import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import '@fontsource-variable/inter/wght.css';
import '@fontsource-variable/plus-jakarta-sans/wght.css';
import App from './App.tsx';
import { pageFromPath } from './lib/routes';
import './index.css';

const root = document.getElementById('root')!;
const page = pageFromPath(window.location.pathname);
const app = (
  <StrictMode>
    <App initialPage={page} />
  </StrictMode>
);

// Le build écrit un HTML complet par page (data-page) : on l'hydrate tel quel.
// Sans HTML pré-rendu pour cette adresse (dev, URL inconnue), rendu client classique.
if (root.dataset.page === page) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
