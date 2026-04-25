import { Accueilli } from '../../core/models/accueilli.model';

export const MOCK_ACCUEILLIS: Accueilli[] = [
  { 
    id: "jean", 
    nom: "Jean Dupont", 
    age: "82 ans", 
    level: "Intermédiaire", 
    couleurStade: "#F4F0F2", 
    colorTexte: "#875C74", 
    objectif: "Ralentissement de l'oubli à court terme, stimulation spatiale via le Memory 4x3." 
  },
  { 
    id: "marie", 
    nom: "Marie Martin", 
    age: "76 ans", 
    level: "Elevé", 
    couleurStade: "#F8F4F2", 
    colorTexte: "#B79D94", 
    objectif: "Stimulation de la mémoire lexicale et association d'idées." 
  },
  { 
    id: "claude", 
    nom: "Claude Dubois", 
    age: "88 ans", 
    level: "Facile", 
    couleurStade: "#F0EFF2", 
    colorTexte: "#453750", 
    objectif: "Maintien de l'attention visuelle, jeux de paires simples." 
  }
];