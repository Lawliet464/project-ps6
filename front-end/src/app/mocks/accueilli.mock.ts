import { Accueilli } from '../core/models/accueilli.model';

export const MOCK_ACCUEILLIS: Accueilli[] = [
  { 
    id: "jean", 
    nom: "Jean Dupont", 
    age: "82 ans", 
    level: "Intermédiaire", 
    couleurStade: "#F4F0F2", 
    colorTexte: "#875C74", 
    passions: "Timbres, Voyages" 
  },
  { 
    id: "marie", 
    nom: "Marie Martin", 
    age: "76 ans", 
    level: "Elevé", 
    couleurStade: "#F8F4F2", 
    colorTexte: "#B79D94", 
    passions: "Jardinage, Herbier" 
  },
  { 
    id: "claude", 
    nom: "Claude Dubois", 
    age: "88 ans", 
    level: "Facile", 
    couleurStade: "#F0EFF2", 
    colorTexte: "#453750", 
    passions: "Pêche, Voitures" 
  }
];