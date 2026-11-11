// Photo réelle par zone (mêmes légendes que la galerie)
export interface ZonePhoto {
  src: string;
  caption: string;
  detail: string;
}

export const ZONE_PHOTOS: Record<string, ZonePhoto> = {
  lausanne: { src: '/assets/work/20.webp', caption: 'Lausanne', detail: 'Levage au 6ᵉ étage' },
  nyon: { src: '/assets/work/4.webp', caption: 'Nyon', detail: 'Canapé monobloc au 3ᵉ étage' },
  morges: { src: '/assets/work/8.webp', caption: 'Morges', detail: 'Cuisine en quartz au 4ᵉ étage' },
  vevey: { src: '/assets/work/16.webp', caption: 'Bord du Léman', detail: 'Levage au 5ᵉ étage' },
  geneve: { src: '/assets/work/real-geneva-1.webp', caption: 'Genève, Cité et Servette', detail: 'Levage au 4ᵉ étage' },
  carouge: { src: '/assets/work/6.webp', caption: 'Carouge', detail: 'Cour intérieure étroite' },
  plainpalais: { src: '/assets/work/3.webp', caption: 'Genève, Plainpalais', detail: 'Matériaux de rénovation au 6ᵉ étage' },
  'eaux-vives': { src: '/assets/work/2.webp', caption: 'Genève, Eaux-Vives', detail: 'Déménagement au 4ᵉ étage' },
  meyrin: { src: '/assets/work/21.webp', caption: 'Genève, Petit-Saconnex', detail: 'Levage au 9ᵉ étage' },
};

export const zonePhoto = (slug: string): ZonePhoto => ZONE_PHOTOS[slug] ?? ZONE_PHOTOS.geneve;
