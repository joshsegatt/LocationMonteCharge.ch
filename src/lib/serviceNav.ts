import { Piano, Sofa, Grid2x2, Building2, HardHat, type LucideIcon } from 'lucide-react';

// Les cinq cas les plus fréquents, chacun avec sa page dédiée. Même ordre et mêmes
// icônes dans le sélecteur du hero et dans le menu « Services ». `hint` reprend des objets
// listés sur la page du service (src/data/servicePages.ts).
export const SERVICE_NAV: { slug: string; Icon: LucideIcon; hint: string }[] = [
  { slug: 'monte-meuble-piano', Icon: Piano, hint: 'Piano droit, piano à queue, coffre-fort' },
  { slug: 'monte-meuble-canape-armoire', Icon: Sofa, hint: 'Canapé d’angle, armoire, frigo américain' },
  { slug: 'monte-meuble-vitrage', Icon: Grid2x2, hint: 'Baies vitrées, plans de cuisine en pierre' },
  { slug: 'demenagement-par-la-fenetre', Icon: Building2, hint: 'Cartons, meubles volumineux, literie' },
  { slug: 'monte-charge-chantier', Icon: HardHat, hint: 'Carrelage, plaques de plâtre, gravats' },
];
