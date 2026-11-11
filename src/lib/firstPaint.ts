// Le premier affichage d'un document arrive déjà rendu (HTML pré-généré) :
// il ne doit pas rejouer d'animation d'entrée, sinon le texte du hero
// disparaît puis réapparaît. Les entrées ne s'activent qu'après une première
// navigation dans l'application.
let entrances = false;

export const enableEntrances = () => {
  entrances = true;
};

export const entrancesEnabled = () => entrances;
