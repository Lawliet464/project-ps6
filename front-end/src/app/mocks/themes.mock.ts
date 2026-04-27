import { Theme } from '../core/models/theme.model';

export const THEMES: Theme[] = [
  {
    id: 'Brossage',
    nom: 'Se brosser les dents',
    elementsAssoc: [
      { id: 1, nom: 'Mettre du dentifrice', image: 'assets/images/dentifrice_brosse.png', themeId: 'Brossage' },
      { id: 2, nom: 'Brosser les dents',    image: 'assets/images/brosser_dents.png',   themeId: 'Brossage' },
      { id: 3, nom: 'Se rincer la bouche',  image: 'assets/images/rincer_bouche.png',     themeId: 'Brossage' },
    ]
  },
  {
    id: 'habillage',
    nom: 'S\'habiller selon la météo',
    elementsAssoc: [
      { id: 1, nom: 'Regarder la météo',     image: 'assets/images/pluie.png',     themeId: 'habillage' },
      { id: 2, nom: 'Choisir ses vêtements', image: 'assets/images/vetement_pluie.png', themeId: 'habillage' },
      { id: 3, nom: 'S\'habiller',           image: 'assets/images/s_habiller.png', themeId: 'habillage' },
    ]
  },
  {
    id: 'courses',
    nom: 'Faire les courses',
    elementsAssoc: [
      { id: 1, nom: 'faire une liste', image: 'assets/images/liste.png', themeId: 'courses' },
      { id: 2, nom: 'remplir le caddie',   image: 'assets/images/caddie.png',    themeId: 'courses' },
      { id: 3, nom: 'aller à la caisse',     image: 'assets/images/caisse.png',    themeId: 'courses' },
    ]
  },
  {
    id: 'cuisiner',
    nom: 'Faire la cuisine et la vaisselle',
    elementsAssoc: [
      { id: 1, nom: 'cuisiner', image: 'assets/images/cuisiner.png', themeId: 'cuisiner' },
      { id: 2, nom: 'laver la vaisselle',   image: 'assets/images/laver_vaisselle.png',    themeId: 'cuisiner' },
      { id: 3, nom: 'essuyer la vaisselle',     image: 'assets/images/essuyer_vaisselle.png',    themeId: 'cuisiner' },
    ]
  },
  {
    id: 'thé',
    nom: 'Faire du thé',
    elementsAssoc: [
      { id: 1, nom: 'faire chauffer l\'eau', image: 'assets/images/bouilloire.png', themeId: 'thé' },
      { id: 2, nom: 'mettre le sachet',   image: 'assets/images/sachet_tasse.png',    themeId: 'thé' },
      { id: 3, nom: 'verser l\'eau',     image: 'assets/images/the.png',    themeId: 'thé' },
    ]
  }
];
