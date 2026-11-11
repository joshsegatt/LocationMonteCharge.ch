// Pages dédiées par service (ce qui monte par la fenêtre avec le monte-meuble).
// Uniquement des informations déjà validées sur le site : 10ᵉ étage, 500 kg,
// opérateur SUVA, voirie incluse, Genève & Vaud. Pas de prix ni de délais.

import { frTypo } from '../lib/typo';

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServicePage {
  slug: string;
  navLabel: string;
  metaTitle: string;
  metaDescription: string;
  heroCategory: string;
  h1Primary: string;
  h1Secondary: string;
  subtitle: string;
  photo: string;
  photoAlt: string;
  photoPlace: string;
  photoDetail: string;
  objects: string[];
  steps: { title: string; text: string; points?: { label: string; value: string }[] }[];
  advantagesTitle: string;
  advantages: { title: string; text: string }[];
  faqs: ServiceFaq[];
  ctaLabel: string;
  whatsappText: string;
}

const STEPS_STANDARD = [
  {
    title: "Devis gratuit sur WhatsApp",
    text: "Envoyez une photo de l'objet, l'étage et l'adresse. Nous vérifions l'accès (rue, cour, balcon ou fenêtre) et vous répondons avec un devis.",
    points: [
      { label: "À envoyer", value: "Photo de l'objet, étage et adresse" },
      { label: "Accès vérifié", value: "Rue, cour, balcon ou fenêtre" },
      { label: "Par téléphone", value: "0800 825 925, appel gratuit" },
    ],
  },
  {
    title: "Voirie prise en charge",
    text: "Nous préparons la demande d'autorisation d'occupation du domaine public auprès de la commune et posons le balisage de sécurité.",
    points: [
      { label: "Démarche", value: "Demande d'occupation du domaine public" },
      { label: "Auprès de", value: "Votre commune, à Genève ou dans le canton de Vaud" },
      { label: "Sur place", value: "Balisage de sécurité posé par BatiMove" },
    ],
  },
  {
    title: "Levage par la fenêtre",
    text: "Le camion monte-meuble se stabilise, l'échelle télescopique se déploie jusqu'à votre fenêtre ou balcon, jusqu'au 10ᵉ étage.",
    points: [
      { label: "Passage", value: "Fenêtre, porte-fenêtre ou balcon" },
      { label: "Hauteur", value: "Jusqu'au 10ᵉ étage" },
      { label: "Dépose", value: "Directement dans la pièce ou sur le balcon" },
    ],
  },
  {
    title: "Opérateur SUVA du début à la fin",
    text: "Un opérateur formé aux prescriptions SUVA pilote la machine pendant toute l'intervention. Charge utile jusqu'à 500 kg par montée.",
    points: [
      { label: "Opérateur", value: "Formé aux prescriptions SUVA, compris dans la location" },
      { label: "Charge utile", value: "500 kg par montée" },
      { label: "Assurance", value: "RC professionnelle jusqu'à CHF 5'000'000" },
    ],
  },
];

export const servicePages: Record<string, ServicePage> = frTypo({
  'monte-meuble-piano': {
    slug: 'monte-meuble-piano',
    navLabel: 'Piano',
    metaTitle: 'Monte-Meuble Piano par la Fenêtre, Genève & Vaud | BatiMove',
    metaDescription:
      "Piano droit ou à queue monté par la fenêtre à Genève et Vaud. Monte-meuble jusqu'au 10ᵉ étage (500 kg), opérateur formé SUVA, voirie incluse. Devis gratuit.",
    heroCategory: 'Piano, Genève & Vaud',
    h1Primary: 'Monter un piano',
    h1Secondary: 'par la fenêtre',
    subtitle:
      "Piano droit, piano à queue ou coffre-fort : quand l'escalier est trop étroit, nous passons par la fenêtre ou le balcon avec un monte-meuble et son opérateur formé aux prescriptions SUVA. Genève et canton de Vaud.",
    photo: '/assets/work/11.webp',
    photoAlt: 'Levage d\'un piano à queue au 8ᵉ étage par monte-meuble BatiMove à Genève Florissant',
    photoPlace: 'Genève, Florissant',
    photoDetail: 'Piano à queue au 8ᵉ étage',
    objects: ['Piano droit', 'Piano à queue', 'Piano numérique', 'Orgue et harmonium', 'Coffre-fort', 'Objets lourds jusqu\'à 500 kg'],
    steps: STEPS_STANDARD,
    advantagesTitle: 'Pourquoi passer un piano par la fenêtre ?',
    advantages: [
      {
        title: "Pas de risque dans l'escalier",
        text: "Plus besoin de porter un piano marche par marche dans une cage d'escalier étroite : les murs, la rampe et l'instrument sont préservés.",
      },
      {
        title: "Jusqu'au 10ᵉ étage",
        text: "L'élévateur télescopique atteint le 10ᵉ étage avec une charge utile de 500 kg par montée.",
      },
      {
        title: 'Une seule équipe',
        text: "Opérateur SUVA, balisage et démarches de voirie inclus : vous n'avez qu'un seul interlocuteur, BatiMove Sàrl.",
      },
    ],
    faqs: [
      {
        question: "Peut-on monter un piano à queue par la fenêtre ?",
        answer:
          "Oui, si le poids reste dans la charge utile de 500 kg et que l'ouverture (fenêtre, porte-fenêtre ou balcon) le permet. Envoyez-nous le modèle et une photo de l'accès sur WhatsApp : nous vérifions avant de confirmer le devis.",
      },
      {
        question: "Jusqu'à quel étage pouvez-vous monter un piano ?",
        answer:
          "Nos monte-meubles télescopiques interviennent jusqu'au 10ᵉ étage, à Genève et dans tout le canton de Vaud.",
      },
      {
        question: "Faut-il une autorisation pour stationner le camion ?",
        answer:
          "Oui, sur la voie publique une autorisation est nécessaire. BatiMove Sàrl prépare la demande auprès de la commune et pose le balisage de sécurité.",
      },
    ],
    ctaLabel: 'Devis piano gratuit',
    whatsappText: "Bonjour, je souhaite un devis pour monter un piano par la fenêtre. Type de piano : \nÉtage : \nCommune : ",
  },

  'monte-meuble-canape-armoire': {
    slug: 'monte-meuble-canape-armoire',
    navLabel: 'Canapé & armoire',
    metaTitle: 'Monte-Meuble Canapé & Armoire, Genève & Vaud | BatiMove',
    metaDescription:
      "Canapé d'angle, armoire ou frigo américain trop grand pour l'escalier ? Monte-meuble par la fenêtre jusqu'au 10ᵉ étage à Genève et Vaud. Devis gratuit.",
    heroCategory: 'Mobilier volumineux, Genève & Vaud',
    h1Primary: "Trop grand pour l’escalier ?",
    h1Secondary: 'On passe par la fenêtre',
    subtitle:
      "Canapé d'angle, armoire, sommier, frigo américain : quand le meuble ne passe ni par l'ascenseur ni par la cage d'escalier, notre monte-meuble le dépose directement sur votre balcon ou dans la pièce par la fenêtre.",
    photo: '/assets/work/4.webp',
    photoAlt: 'Canapé monobloc monté par la fenêtre au 3ᵉ étage avec un monte-meuble à Nyon',
    photoPlace: 'Nyon',
    photoDetail: 'Canapé monobloc au 3ᵉ étage',
    objects: ["Canapé d'angle", 'Canapé monobloc', 'Armoire et dressing', 'Sommier et lit', 'Frigo américain', 'Table en marbre'],
    steps: STEPS_STANDARD,
    advantagesTitle: 'Le meuble arrive, les murs restent intacts',
    advantages: [
      {
        title: 'Aucun démontage forcé',
        text: "Le meuble passe entier par la fenêtre ou le balcon, sans le démonter ni le forcer dans les virages de l'escalier.",
      },
      {
        title: 'Copropriété préservée',
        text: "Pas de rayures dans la cage d'escalier ni dans l'ascenseur de l'immeuble.",
      },
      {
        title: 'Livraison ou déménagement',
        text: "Idéal à la livraison d'un nouveau canapé comme lors d'un déménagement, à Genève et dans le canton de Vaud.",
      },
    ],
    faqs: [
      {
        question: "Mon canapé ne passe pas dans l'escalier, que faire ?",
        answer:
          "C'est la mission principale du monte-meuble : le canapé est monté par l'extérieur et entre par la fenêtre ou le balcon. Envoyez une photo de la fenêtre et l'étage sur WhatsApp pour un devis gratuit.",
      },
      {
        question: "Quelle taille de fenêtre faut-il ?",
        answer:
          "Cela dépend des dimensions du meuble. Une fenêtre, une porte-fenêtre ou un balcon suffisent dans la plupart des cas : nous vérifions avec vos photos avant l'intervention.",
      },
      {
        question: "L'opérateur est-il inclus ?",
        answer:
          "Oui, un opérateur formé aux prescriptions de sécurité SUVA accompagne toujours la machine.",
      },
    ],
    ctaLabel: 'Devis meuble gratuit',
    whatsappText: "Bonjour, j'ai un meuble trop grand pour l'escalier. Meuble : \nÉtage : \nCommune : ",
  },

  'monte-meuble-vitrage': {
    slug: 'monte-meuble-vitrage',
    navLabel: 'Vitrage & cuisine',
    metaTitle: 'Monte-Charge Vitrage & Cuisine, Genève & Vaud | BatiMove',
    metaDescription:
      "Baies vitrées, vitrages et plans de cuisine livrés par l'extérieur jusqu'au 10ᵉ étage à Genève et Vaud. Monte-charge avec opérateur, voirie incluse.",
    heroCategory: 'Vitrage & agencement, Genève & Vaud',
    h1Primary: 'Baies vitrées et cuisines',
    h1Secondary: "livrées par l'extérieur",
    subtitle:
      "Baies vitrées, vitrages, fenêtres, plans de travail en quartz ou en pierre : les éléments grands et fragiles montent par la façade avec un monte-charge piloté par un opérateur SUVA, sans passer par l'escalier.",
    photo: '/assets/work/5.webp',
    photoAlt: 'Levage de baies vitrées au 7ᵉ étage par monte-charge à Genève Servette',
    photoPlace: 'Genève, Servette',
    photoDetail: 'Baies vitrées au 7ᵉ étage',
    objects: ['Baies vitrées', 'Vitrages et fenêtres', 'Plans de cuisine en quartz', 'Plans en pierre et marbre', 'Éléments de cuisine équipée', 'Portes et panneaux'],
    steps: STEPS_STANDARD,
    advantagesTitle: 'Pour les professionnels et les particuliers',
    advantages: [
      {
        title: 'Grands formats',
        text: "Les éléments longs ou larges qui ne tournent pas dans l'escalier montent à plat par l'extérieur.",
      },
      {
        title: 'Fragiles et lourds',
        text: "Charge utile de 500 kg par montée, pilotage précis par un opérateur formé SUVA.",
      },
      {
        title: 'Artisans et régies',
        text: "Vitriers, cuisinistes, menuisiers et régies : un seul interlocuteur pour la machine, l'opérateur et la voirie.",
      },
    ],
    faqs: [
      {
        question: "Pouvez-vous monter une baie vitrée par la façade ?",
        answer:
          "Oui, si le poids reste dans la charge utile de 500 kg. Envoyez les dimensions, le poids et l'étage sur WhatsApp : nous confirmons la faisabilité avec le devis.",
      },
      {
        question: "Travaillez-vous avec les entreprises ?",
        answer:
          "Oui, nous intervenons pour les particuliers comme pour les vitriers, cuisinistes, menuisiers et régies à Genève et dans le canton de Vaud.",
      },
      {
        question: "Qui s'occupe de l'autorisation de voirie ?",
        answer:
          "BatiMove Sàrl prépare la demande d'occupation du domaine public auprès de la commune et met en place le balisage.",
      },
    ],
    ctaLabel: 'Devis vitrage gratuit',
    whatsappText: "Bonjour, je souhaite un devis pour monter des vitrages / une cuisine. Dimensions et poids : \nÉtage : \nCommune : ",
  },

  'demenagement-par-la-fenetre': {
    slug: 'demenagement-par-la-fenetre',
    navLabel: 'Déménagement en étage',
    metaTitle: 'Déménagement par la Fenêtre, Genève & Vaud | BatiMove',
    metaDescription:
      "Déménagement par la fenêtre ou le balcon à Genève et Vaud. Monte-meuble jusqu'au 10ᵉ étage, 500 kg par montée, opérateur inclus. Devis gratuit 0800 825 925.",
    heroCategory: 'Déménagement en étage, Genève & Vaud',
    h1Primary: 'Déménagement',
    h1Secondary: 'par la fenêtre',
    subtitle:
      "Immeuble sans ascenseur, ascenseur trop petit ou étage élevé : le monte-meuble fait passer cartons et meubles par la fenêtre ou le balcon, jusqu'au 10ᵉ étage, avec un opérateur formé aux prescriptions SUVA.",
    photo: '/assets/work/2.webp',
    photoAlt: 'Déménagement intégral au 4ᵉ étage par monte-meuble aux Eaux-Vives à Genève',
    photoPlace: 'Genève, Eaux-Vives',
    photoDetail: 'Déménagement au 4ᵉ étage',
    objects: ['Cartons', 'Meubles volumineux', 'Électroménager', 'Literie', 'Mobilier de bureau', 'Objets lourds jusqu\'à 500 kg'],
    steps: STEPS_STANDARD,
    advantagesTitle: "Plus rapide que l'escalier",
    advantages: [
      {
        title: 'Moins de portage',
        text: "Les meubles et cartons montent et descendent par l'extérieur au lieu de passer par la cage d'escalier.",
      },
      {
        title: 'Immeubles sans ascenseur',
        text: "Solution adaptée aux immeubles anciens, aux ascenseurs étroits et aux étages élevés.",
      },
      {
        title: 'Avec votre déménageur',
        text: "Le monte-meuble et son opérateur s'intègrent à votre déménagement, que vous le fassiez vous-même ou avec une entreprise.",
      },
    ],
    faqs: [
      {
        question: "Le monte-meuble remplace-t-il l'équipe de déménagement ?",
        answer:
          "Non, nous fournissons la machine et son opérateur SUVA pour le levage. Le chargement et le transport restent assurés par vous ou votre déménageur. Pour un déménagement complet, BatiMove Sàrl propose aussi ses services sur batimove.ch.",
      },
      {
        question: "Jusqu'à quel étage ?",
        answer:
          "Jusqu'au 10ᵉ étage, avec une charge utile de 500 kg par montée.",
      },
      {
        question: "Dans quelles communes intervenez-vous ?",
        answer:
          "Dans tout le canton de Genève et le canton de Vaud : Genève, Carouge, Meyrin, Lausanne, Nyon, Morges, Vevey, Montreux et les communes voisines.",
      },
    ],
    ctaLabel: 'Devis déménagement gratuit',
    whatsappText: "Bonjour, je souhaite un monte-meuble pour un déménagement. Date : \nÉtage : \nCommune : ",
  },

  'monte-charge-chantier': {
    slug: 'monte-charge-chantier',
    navLabel: 'Chantier & rénovation',
    metaTitle: 'Location Monte-Charge Chantier, Genève & Vaud | BatiMove',
    metaDescription:
      "Monte-charge avec opérateur pour chantier et rénovation à Genève et Vaud : carrelage, plâtre, toiture, gravats. Jusqu'au 10ᵉ étage, 500 kg. Devis gratuit.",
    heroCategory: 'Chantier & rénovation, Genève & Vaud',
    h1Primary: 'Monte-charge',
    h1Secondary: 'pour vos chantiers',
    subtitle:
      "Palettes de carrelage, plaques de plâtre, matériaux de toiture, évacuation de gravats : le monte-charge monte et descend les matériaux par la façade, avec un opérateur formé SUVA. Genève et canton de Vaud.",
    photo: '/assets/work/3.webp',
    photoAlt: 'Monte-charge pour matériaux lourds de rénovation au 6ᵉ étage à Plainpalais Genève',
    photoPlace: 'Genève, Plainpalais',
    photoDetail: 'Matériaux de rénovation au 6ᵉ étage',
    objects: ['Palettes de carrelage', 'Plaques de plâtre', 'Matériaux de toiture', 'Évacuation de gravats', 'Matériel de second-œuvre', 'Charges jusqu\'à 500 kg'],
    steps: [
      {
        title: 'Devis gratuit',
        text: "Indiquez l'adresse du chantier, l'étage et le type de matériaux sur WhatsApp ou au 0800 825 925.",
        points: [
          { label: "À indiquer", value: "Adresse du chantier, étage et type de matériaux" },
          { label: "Accès vérifié", value: "Rue, cour, balcon ou fenêtre" },
          { label: "Par téléphone", value: "0800 825 925, appel gratuit" },
        ],
      },
      {
        title: 'Voirie et balisage',
        text: "Nous préparons l'autorisation d'occupation du domaine public et sécurisons le périmètre avec un balisage homologué.",
        points: [
          { label: "Démarche", value: "Autorisation d'occupation du domaine public" },
          { label: "Auprès de", value: "La commune du chantier" },
          { label: "Sur place", value: "Périmètre balisé par BatiMove" },
        ],
      },
      {
        title: 'Levage des matériaux',
        text: "Le monte-charge déploie son échelle télescopique jusqu'à l'étage du chantier, jusqu'au 10ᵉ étage.",
        points: [
          { label: "Hauteur", value: "Jusqu'au 10ᵉ étage" },
          { label: "Charge utile", value: "500 kg par montée" },
          { label: "Matériaux", value: "Carrelage, plaques de plâtre, toiture, gravats" },
        ],
      },
      {
        title: 'Opérateur SUVA',
        text: "Un opérateur formé aux prescriptions SUVA pilote chaque montée, charge utile jusqu'à 500 kg.",
        points: [
          { label: "Opérateur", value: "Formé aux prescriptions SUVA, compris dans la location" },
          { label: "Pilotage", value: "Chaque montée, du début à la fin" },
          { label: "Assurance", value: "RC professionnelle jusqu'à CHF 5'000'000" },
        ],
      },
    ],
    advantagesTitle: 'Pour artisans, entreprises et régies',
    advantages: [
      {
        title: 'Gain de temps',
        text: "Les matériaux montent par l'extérieur au lieu d'être portés dans l'escalier ou l'ascenseur de l'immeuble.",
      },
      {
        title: 'Parties communes protégées',
        text: "Moins de passages dans les couloirs et la cage d'escalier pendant les travaux.",
      },
      {
        title: 'Machine et opérateur',
        text: "Location avec opérateur qualifié : vous vous concentrez sur le chantier.",
      },
    ],
    faqs: [
      {
        question: "Louez-vous le monte-charge sans opérateur ?",
        answer:
          "Non, la location se fait toujours avec un opérateur formé aux prescriptions SUVA, pour la sécurité du chantier et des tiers.",
      },
      {
        question: "Quels matériaux pouvez-vous monter ?",
        answer:
          "Carrelage, plaques de plâtre, matériaux de toiture, éléments de cuisine, et descente de gravats, dans la limite de 500 kg par montée.",
      },
      {
        question: "Intervenez-vous pour les régies et entreprises ?",
        answer:
          "Oui, à Genève et dans le canton de Vaud, pour les particuliers, les artisans, les entreprises du bâtiment et les régies.",
      },
    ],
    ctaLabel: 'Devis chantier gratuit',
    whatsappText: "Bonjour, je souhaite un monte-charge pour un chantier. Matériaux : \nÉtage : \nCommune : ",
  },
});

export const serviceSlugs = Object.keys(servicePages);
