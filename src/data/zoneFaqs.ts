import { frTypo } from '../lib/typo';
import type { FaqItem } from './homeFaqs';
import type { RegionalZone } from './regionalZones';

/** Questions propres à chaque zone, construites à partir des données vérifiées de la zone. */
export function zoneFaqs(zone: RegionalZone): FaqItem[] {
  const city = zone.cityName;
  return frTypo([
    {
      question: `Qui demande l'autorisation de voirie à ${city} ?`,
      answer: `BatiMove Sàrl s'en charge. ${zone.voirieInfo} Le jour de l'intervention, nous posons aussi le balisage de sécurité autour du camion.`,
    },
    {
      question: `Jusqu'à quel étage intervenez-vous à ${city} ?`,
      answer:
        "Jusqu'au 10ᵉ étage, avec une charge utile de 500 kg par montée. Le monte-meuble passe par une fenêtre, une porte-fenêtre ou un balcon, sans utiliser la cage d'escalier ni l'ascenseur.",
    },
    {
      question: `Quels secteurs desservez-vous autour de ${city} ?`,
      answer: `Nous intervenons notamment à ${zone.specificCommunes.join(', ')}. Pour une adresse voisine, envoyez-la sur WhatsApp et nous vous confirmons si l'accès est possible.`,
    },
    {
      question: `Comment obtenir un devis pour un monte-meuble à ${city} ?`,
      answer:
        "Envoyez sur WhatsApp une photo de l'objet, l'étage et l'adresse, ou appelez le 0800 825 925 (appel gratuit). Le devis est gratuit et sans engagement.",
    },
    {
      question: "L'opérateur est-il compris dans la location ?",
      answer:
        "Oui. Le monte-meuble est toujours loué avec un opérateur formé aux prescriptions SUVA, qui installe, déploie et pilote la machine pendant toute l'intervention.",
    },
    {
      question: 'Les objets sont-ils assurés pendant le levage ?',
      answer: "Chaque intervention est couverte par une assurance RC professionnelle jusqu'à CHF 5'000'000.",
    },
  ]);
}
