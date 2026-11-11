import { frTypo } from '../lib/typo';

export interface FaqItem {
  question: string;
  answer: string;
}

export const HOME_FAQS: FaqItem[] = frTypo([
  {
    question: 'Comment réserver un monte-meuble ?',
    answer:
      "Envoyez sur WhatsApp une photo de l'objet, l'étage et l'adresse, ou appelez le 0800 825 925 (gratuit). Nous vérifions l'accès à la façade, vous envoyons le devis et fixons la date avec vous.",
  },
  {
    question: 'Jusqu’à quelle hauteur et quel poids ?',
    answer:
      "Jusqu'au 10ᵉ étage, avec une charge utile de 500 kg par montée. Cela couvre un canapé d'angle, un piano, une armoire, des baies vitrées ou des palettes de matériaux.",
  },
  {
    question: 'Qui s’occupe de l’autorisation de voirie ?',
    answer:
      "Nous. BatiMove Sàrl prépare la demande d'occupation du domaine public auprès de la commune (Service de l'espace public à Genève, communes vaudoises) et installe le balisage de sécurité le jour de l'intervention.",
  },
  {
    question: 'Un meuble peut-il vraiment passer par la fenêtre ?',
    answer:
      "Oui, si la fenêtre, la porte-fenêtre ou le balcon est assez grand pour l'objet. Le monte-meuble le dépose directement dans la pièce ou sur le balcon, sans passer par la cage d'escalier ni l'ascenseur. Une photo de l'ouverture nous permet de le confirmer avant le devis.",
  },
  {
    question: 'L’opérateur est-il compris dans la location ?',
    answer:
      "Oui. La machine est toujours louée avec un opérateur formé aux prescriptions SUVA, qui installe, déploie et pilote l'échelle pendant toute l'intervention.",
  },
  {
    question: 'Qui est BatiMove Sàrl ?',
    answer:
      "Monte Charge est le service de levage de BatiMove Sàrl (CHE-143.091.230), Rue De-Monthoux 64 à Genève, également présente sur batimove.ch. Chaque intervention est couverte par une assurance RC professionnelle jusqu'à CHF 5'000'000.",
  },
]);
