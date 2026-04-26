import { Theme } from '../core/models/theme.model';

export const THEMES: Theme[] = [
  {
    id: 'Brossage',
    nom: 'Se brosser les dents',
    type: 'texte+image',
    elementsAssoc: [
      { id: 1, nom: 'Mettre du dentifrice', image: 'assets/images/toothbrush-toothpaste.png', themeId: 'Brossage' },
      { id: 2, nom: 'Brosser les dents',    image: 'assets/images/action.png',   themeId: 'Brossage' },
      { id: 3, nom: 'Se rincer la bouche',  image: 'assets/images/rincer_bouche.png',     themeId: 'Brossage' },
    ]
  },
  {
    id: 'habillage',
    nom: 's\'habiller selon la météo',
    type: 'texte+image',
    elementsAssoc: [
      { id: 1, nom: 'Regarder la météo',     image: 'assets/images/rain.png',     themeId: 'habillage' },
      { id: 2, nom: 'Choisir ses vêtements', image: 'assets/images/raincoat.png', themeId: 'habillage' },
      { id: 3, nom: 'S\'habiller',           image: 'assets/images/rainshoes.png', themeId: 'habillage' },
    ]
  },
  {
    id: 'hiver',
    nom: 'jsp',
    type: 'texte+image',
    elementsAssoc: [
      { id: 1, nom: 'bonnet', image: 'assets/images/bonnet.png', themeId: 'hiver' },
      { id: 2, nom: 'hat',   image: 'assets/images/hat.png',    themeId: 'hiver' },
      { id: 3, nom: 'jacket',     image: 'assets/images/jacket.png',    themeId: 'hiver' },
    ]
  }
];
