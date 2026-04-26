import { ConfigurationPartie } from '../models/partie.model';

export const CONFIG_PAR_DEFAUT: Record<string, ConfigurationPartie> = {
    'facile': {
        formatJeu: 'Images uniquement',
        formatPartie: 'Court',
        plateau: '2x2',
        taillePolice: 'Grande',
        aideMemo: 'Surbrillance paire',
        aideAssoc: 'Surbrillance couple',
        tempsRetenue: 4, 
        frequenceAide: 3
    },
    'moyen': {
        formatJeu: 'Images + Texte',
        formatPartie: 'Standard',
        plateau: '3x2', 
        taillePolice: 'Moyenne',
        aideMemo: 'Partiel visible',
        aideAssoc: 'Réordonner',
        tempsRetenue: 2,
        frequenceAide: 6
    },
    'difficile': {
        formatJeu: 'Texte uniquement',
        formatPartie: 'Long',
        plateau: '4x3', 
        taillePolice: 'Petite',
        aideMemo: 'Flash intégral',
        aideAssoc: 'Réordonner',
        tempsRetenue: 1, 
        frequenceAide: 10
    }
};