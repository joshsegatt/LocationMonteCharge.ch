export interface RegionalZone {
  slug: string;
  cityName: string;
  canton: string;
  metaTitle: string;
  metaDescription: string;
  h1Primary: string;
  h1Secondary: string;
  heroCategory: string;
  subtitle: string;
  heroHighlights: string[];
  specificCommunes: string[];
  voirieInfo: string;
  postalCodes: string[];
  eta: string;
  seoKeywords: string[];
}

export const regionalZones: Record<string, RegionalZone> = {
  lausanne: {
    slug: "lausanne",
    cityName: "Lausanne",
    canton: "Canton de Vaud",
    metaTitle: "Location Monte-Meuble Lausanne & Région Vaudoise | BatiMove Sàrl",
    metaDescription: "Location de monte-meuble à Lausanne, Pully, Renens et Lutry jusqu'au 10ᵉ étage (500 kg). Déménagement par fenêtre avec opérateur certifié SUVA. Devis 0800 825 925.",
    h1Primary: "Location Monte-Meuble",
    h1Secondary: "Lausanne & Vaud",
    heroCategory: "Logistique Verticale • Lausanne & Région Vaudoise",
    subtitle: "Passage sécurisé de canapés, pianos, vitrages et mobilier volumineux par fenêtre ou balcon sur Lausanne, Pully, Renens et tout le canton de Vaud. Démarches de voirie communale et opérateur SUVA inclus.",
    heroHighlights: [
      "Intervention en hypercentre, pentes lausannoises et cours intérieures",
      "Élévateur télescopique jusqu'au 10ᵉ étage (500 kg de charge utile)",
      "Opérateur qualifié formé aux directives de sécurité SUVA",
      "Démarches officielles de voirie Ville de Lausanne prises en charge",
    ],
    specificCommunes: [
      "Lausanne Centre", "Ouchy", "Chailly", "Pully", 
      "Renens", "Lutry", "Prilly", "Epalinges", 
      "Saint-Sulpice", "Belmont-sur-Lausanne", "Crissier", "Bussigny"
    ],
    voirieInfo: "BatiMove Sàrl prend en charge les demandes d'autorisation d'occupation du domaine public auprès du Service des parcs et voirie de la Ville de Lausanne et des polices communales vaudoises.",
    postalCodes: ["1000", "1003", "1004", "1005", "1006", "1007", "1009", "1020", "1018"],
    eta: "Intervention sous 30 à 45 min",
    seoKeywords: [
      "location monte meuble lausanne",
      "monte meuble lausanne",
      "monte charge demenagement lausanne",
      "demenager canape fenetre lausanne",
      "elevateur meuble pully",
      "monte meuble renens",
      "location monte charge lutry"
    ],
  },

  nyon: {
    slug: "nyon",
    cityName: "Nyon",
    canton: "Vaud • La Côte",
    metaTitle: "Location Monte-Meuble Nyon & La Côte | BatiMove Sàrl",
    metaDescription: "Location de monte-meuble à Nyon, Gland, Rolle et Terre-Sainte jusqu'au 10ᵉ étage (500 kg). Levage par balcon avec opérateur SUVA. Devis 0800 825 925 ou WhatsApp.",
    h1Primary: "Location Monte-Meuble",
    h1Secondary: "Nyon & La Côte",
    heroCategory: "Logistique Verticale • Nyon & District de La Côte",
    subtitle: "Levage télescopique pour villas de standing, copropriétés et appartements à Nyon, Gland, Rolle et Terre-Sainte. Passage par balcon ou terrasse jusqu'au 10ᵉ étage sans abîmer les parties communes.",
    heroHighlights: [
      "Desserte express du district de Nyon et de La Côte",
      "Levage de canapés monoblocs, marbre, pianos et mobilier design",
      "Protection intégrale des façades et pelouses par calage SUVA",
      "Autorisations de voirie communale coordonnées avec les polices locales",
    ],
    specificCommunes: [
      "Nyon Centre", "Gland", "Rolle", "Coppet", 
      "Crans-près-Céligny", "Founex", "Mies", "Prangins", 
      "Commugny", "Chavannes-de-Bogis", "Eysins", "Trélex"
    ],
    voirieInfo: "Gestion officielle des arrêtés de voirie et stationnement auprès de la Ville de Nyon et des communes du district de Nyon.",
    postalCodes: ["1260", "1196", "1180", "1296", "1297", "1295", "1299"],
    eta: "Intervention sous 25 à 35 min",
    seoKeywords: [
      "location monte meuble nyon",
      "monte meuble nyon",
      "monte charge gland",
      "monte meuble la cote vaud",
      "demenagement fenetre rolle",
      "location elevateur coppet"
    ],
  },

  morges: {
    slug: "morges",
    cityName: "Morges",
    canton: "Vaud • District de Morges",
    metaTitle: "Location Monte-Meuble Morges & District | BatiMove Sàrl",
    metaDescription: "Location de monte-meuble à Morges, Saint-Prex et Tolochenaz jusqu'au 10ᵉ étage (500 kg). Levage de canapés, pianos et cuisines avec opérateur SUVA. Devis 0800 825 925.",
    h1Primary: "Location Monte-Meuble",
    h1Secondary: "Morges & District",
    heroCategory: "Logistique Verticale • Morges & District",
    subtitle: "Prestation de monte-meuble autotracté à Morges, Saint-Prex, Tolochenaz et Préverenges. Déploiement sécurisé sur façades et cours intérieures jusqu'au 10ᵉ étage pour particuliers et régies.",
    heroHighlights: [
      "Desserte rapide du littoral morgien et de l'arrière-pays",
      "Levage direct par fenêtre sans emprunter ascenseurs ou escaliers",
      "Camion compact idéal pour ruelles pavées et quais",
      "Assurance Responsabilité Civile professionnelle jusqu'à 5M CHF",
    ],
    specificCommunes: [
      "Morges Centre", "Saint-Prex", "Tolochenaz", "Préverenges", 
      "Echichens", "Lonay", "Denges", "Saint-Sulpice", 
      "Aubonne", "Allaman", "Lully", "Vufflens-le-Château"
    ],
    voirieInfo: "Coordination des autorisations d'occupation du domaine public et balisage de sécurité auprès de la Municipalité de Morges.",
    postalCodes: ["1110", "1162", "1131", "1028", "1112", "1027", "1170"],
    eta: "Intervention sous 30 à 40 min",
    seoKeywords: [
      "location monte meuble morges",
      "monte meuble morges",
      "monte charge saint prex",
      "elevateur demenagement tolochenaz",
      "location monte meuble preverenges"
    ],
  },

  vevey: {
    slug: "vevey",
    cityName: "Vevey & Montreux",
    canton: "Vaud • Riviera",
    metaTitle: "Location Monte-Meuble Vevey & Montreux (Riviera) | BatiMove Sàrl",
    metaDescription: "Location monte-meuble à Vevey, Montreux, La Tour-de-Peilz et Riviera vaudoise (500 kg, 10ᵉ étage). Opérateur SUVA et balisage inclus. Devis direct au 0800 825 925.",
    h1Primary: "Location Monte-Meuble",
    h1Secondary: "Vevey & Montreux",
    heroCategory: "Logistique Verticale • Riviera Vaudoise",
    subtitle: "Levage de haute précision pour résidences en pente, attiques et chantiers sur la Riviera vaudoise. Intervention à Vevey, Montreux, La Tour-de-Peilz, Blonay et Clarens avec matériel certifié SUVA.",
    heroHighlights: [
      "Accès aux terrains escarpés et résidences panoramiques du lac",
      "Plateforme spacieuse 500 kg pour meubles lourds et baies vitrées",
      "Opérateur chevronné garantissant la sécurité des riverains",
      "Gestion administrative des démarches voirie avec la Police Riviera",
    ],
    specificCommunes: [
      "Vevey Centre", "Montreux", "La Tour-de-Peilz", "Clarens", 
      "Blonay", "Chardonne", "Corseaux", "St-Légier-La Chiésaz", 
      "Villeneuve", "Territet", "Veytaux", "Jongny"
    ],
    voirieInfo: "Demandes d'occupation du domaine public et signalisation réglementaire prises en charge auprès de Police Riviera (ASSR).",
    postalCodes: ["1800", "1820", "1814", "1815", "1807", "1822", "1844"],
    eta: "Intervention sous 40 à 50 min",
    seoKeywords: [
      "location monte meuble vevey",
      "monte meuble montreux",
      "monte meuble riviera vaudoise",
      "monte charge la tour de peilz",
      "elevateur demenagement blonay"
    ],
  },

  geneve: {
    slug: "geneve",
    cityName: "Genève Centre",
    canton: "Canton de Genève",
    metaTitle: "Location Monte-Meuble Genève Centre & Ville | BatiMove Sàrl",
    metaDescription: "Location de monte-meuble à Genève Centre, Vieille-Ville, Pâquis et Plainpalais. Passage par fenêtre jusqu'au 10ᵉ étage (500 kg) avec opérateur SUVA. Devis 0800 825 925.",
    h1Primary: "Location Monte-Meuble",
    h1Secondary: "Genève Centre",
    heroCategory: "Logistique Verticale • Genève Hypercentre",
    subtitle: "Spécialiste genevois du passage de meubles par fenêtre en hypercentre, ruelles pavées et immeubles classés. Autorisations voirie SEP Ville de Genève et opérateur SUVA inclus.",
    heroHighlights: [
      "Desserte immédiate de la Cité, Vieille-Ville, Pâquis et Rive",
      "Calage millimétrique sur voies pavées et passages étroits",
      "Protection intégrale des balcons et façades historiques",
      "Balisage réglementaire conforme aux exigences de la Ville de Genève",
    ],
    specificCommunes: [
      "Genève Centre", "Vieille-Ville", "Pâquis", "Grottes", 
      "Saint-Gervais", "Cité", "Champel", "Eaux-Vives", 
      "Plainpalais", "Jonction", "Servette", "Rive"
    ],
    voirieInfo: "Prise en charge intégrale des demandes d'autorisation auprès du Service de l'espace public (SEP) de la Ville de Genève.",
    postalCodes: ["1201", "1202", "1203", "1204", "1205", "1206", "1207", "1208"],
    eta: "Intervention sous 15 à 25 min",
    seoKeywords: [
      "location monte meuble geneve centre",
      "monte meuble geneve",
      "monte charge vieille ville geneve",
      "passer meuble fenetre geneve",
      "monte meuble paquis"
    ],
  },

  carouge: {
    slug: "carouge",
    cityName: "Carouge",
    canton: "Genève • Rive Gauche",
    metaTitle: "Location Monte-Meuble Carouge & Rive Gauche | BatiMove Sàrl",
    metaDescription: "Location monte-meuble à Carouge, Acacias et Lancy. Échelle télescopique pour cours sardes et balcons étroits jusqu'au 10ᵉ étage. Opérateur SUVA. Devis 0800 825 925.",
    h1Primary: "Location Monte-Meuble",
    h1Secondary: "Carouge & Rive Gauche",
    heroCategory: "Logistique Verticale • Carouge & Cité Sarde",
    subtitle: "Intervention sur-mesure dans la Cité Sarde et ses cours intérieures étroites. Hissage direct de mobilier volumineux, canapés et matériaux sans abîmer les ferronneries ou escaliers.",
    heroHighlights: [
      "Expertise unique pour les cours sardes et passages sous porche",
      "Camion autotracté compact à encombrement réduit",
      "Protection absolue des balcons ouvragés et volets anciens",
      "Gestion des permis de stationnement avec la Police municipale de Carouge",
    ],
    specificCommunes: [
      "Carouge Centre", "Acacias", "Vieux-Carouge", "Lancy", 
      "Grand-Lancy", "Petit-Lancy", "Plan-les-Ouates", "Veyrier", 
      "Troinex", "Carouge-Tours", "La Praille", "Pinchat"
    ],
    voirieInfo: "Gestion officielle des arrêtés de voirie et stationnement auprès de la Ville de Carouge et communes limitrophes.",
    postalCodes: ["1227", "1212", "1228", "1255", "1256"],
    eta: "Intervention sous 20 min",
    seoKeywords: [
      "location monte meuble carouge",
      "monte meuble carouge",
      "monte meuble acacias",
      "monte charge lancy",
      "elevateur meuble plan les ouates"
    ],
  },

  plainpalais: {
    slug: "plainpalais",
    cityName: "Plainpalais & Jonction",
    canton: "Genève",
    metaTitle: "Location Monte-Meuble Plainpalais & Jonction | BatiMove Sàrl",
    metaDescription: "Location monte-meuble à Plainpalais, Jonction et Bastions. Passage par fenêtre jusqu'au 10ᵉ étage (500 kg). Balisage voirie et opérateur SUVA. Devis 0800 825 925.",
    h1Primary: "Location Monte-Meuble",
    h1Secondary: "Plainpalais & Jonction",
    heroCategory: "Logistique Verticale • Plainpalais & Jonction",
    subtitle: "Levage vertical rapide pour les appartements anciens et immeubles de régie à Plainpalais, Jonction et Philosophes. Passage direct par fenêtre ou balcon sans bloquer les parties communes.",
    heroHighlights: [
      "Spécialiste des grands appartements aux plafonds hauts",
      "Déménagement de pianos droits et à queue, canapés d'angle",
      "Balisage réglementaire immédiat pour la sécurité des piétons",
      "Autorisations de voirie Ville de Genève incluses",
    ],
    specificCommunes: [
      "Plainpalais", "Jonction", "Cluse-Roseraie", "Bastions", 
      "Boulevard Carl-Vogt", "Rue de Carouge", "Arve", "Philosophes"
    ],
    voirieInfo: "Balisage réglementaire immédiat et démarches de voirie coordonnées auprès du Service de l'espace public (SEP).",
    postalCodes: ["1205", "1204"],
    eta: "Intervention sous 20 min",
    seoKeywords: [
      "location monte meuble plainpalais",
      "monte meuble jonction",
      "monte meuble bastions",
      "monte charge cluse roseraie"
    ],
  },

  "eaux-vives": {
    slug: "eaux-vives",
    cityName: "Eaux-Vives & Champel",
    canton: "Genève • Rive Gauche",
    metaTitle: "Location Monte-Meuble Eaux-Vives & Champel | BatiMove Sàrl",
    metaDescription: "Location monte-meuble aux Eaux-Vives, Champel, Florissant et Cologny (500 kg, 10ᵉ étage). Canapés et pianos par balcon avec opérateur SUVA. Devis 0800 825 925.",
    h1Primary: "Location Monte-Meuble",
    h1Secondary: "Eaux-Vives & Champel",
    heroCategory: "Logistique Verticale • Eaux-Vives, Champel & Cologny",
    subtitle: "Monte-meuble haut de gamme pour appartements de standing, attiques et villas sur la Rive Gauche. Déploiement sécurisé pour canapés monoblocs, marbre, vitrage et mobilier précieux.",
    heroHighlights: [
      "Intervention soignée pour résidences de standing et attiques",
      "Plateforme amortie évitant toute vibration ou rayure",
      "Élévateur jusqu'au 10ᵉ étage sans contrainte de poids (500 kg)",
      "Couverture intégrale RC professionnelle helvétique 5M CHF",
    ],
    specificCommunes: [
      "Eaux-Vives", "Champel", "Florissant", "Cologny", 
      "Malagnou", "Vandœuvres", "Chêne-Bougeries", "Chêne-Bourg", 
      "Thônex", "Vésenaz", "Collonge-Bellerive", "Cologny-Mairie"
    ],
    voirieInfo: "Autorisations de voirie coordonnées avec la Ville de Genève et les mairies de Cologny et Chêne-Bougeries.",
    postalCodes: ["1207", "1206", "1208", "1223", "1224", "1225", "1226"],
    eta: "Intervention sous 20 min",
    seoKeywords: [
      "location monte meuble eaux vives",
      "monte meuble champel",
      "monte charge cologny",
      "monte meuble florissant",
      "elevateur meuble chene bougeries"
    ],
  },

  meyrin: {
    slug: "meyrin",
    cityName: "Meyrin & Vernier",
    canton: "Genève • Rive Droite",
    metaTitle: "Location Monte-Meuble Meyrin & Vernier | BatiMove Sàrl",
    metaDescription: "Location monte-meuble à Meyrin, Vernier, Servette et Grand-Saconnex (500 kg, 10ᵉ étage). Équipement télescopique avec opérateur SUVA. Devis 0800 825 925.",
    h1Primary: "Location Monte-Meuble",
    h1Secondary: "Meyrin & Vernier",
    heroCategory: "Logistique Verticale • Meyrin, Vernier & Servette",
    subtitle: "Desserte express pour les grands ensembles résidentiels, attiques et chantiers de la Rive Droite et de la zone aéroportuaire. Opérateur certifié SUVA et formalités de voirie assurées.",
    heroHighlights: [
      "Intervention rapide sur Meyrin, Vernier, Le Lignon et Servette",
      "Levage jusqu'au 10ᵉ étage pour barres d'immeubles et attiques",
      "Idéal pour déménagements complets et chantiers de second-œuvre",
      "Disponibilité sur réservation ou créneau d'urgence selon planning",
    ],
    specificCommunes: [
      "Meyrin Centre", "Vernier", "Le Lignon", "Avanchets", 
      "Grand-Saconnex", "Servette", "Châtelaine", "Satigny", 
      "Pregny-Chambésy", "Cointrin", "Petit-Saconnex"
    ],
    voirieInfo: "Démarches administratives prises en charge auprès des mairies de Meyrin, Vernier et du Grand-Saconnex.",
    postalCodes: ["1217", "1214", "1216", "1218", "1219", "1209", "1242"],
    eta: "Intervention sous 20 min",
    seoKeywords: [
      "location monte meuble meyrin",
      "monte meuble vernier",
      "monte meuble le lignon",
      "monte charge servette",
      "location monte charge avanchets"
    ],
  },
};
