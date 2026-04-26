import { Partie } from '../core/models/partie.model';

export const MOCK_PARTIES: Partie[] = [
    {
        id: '#6',
        date: "Aujourd'hui",
        theme: 'Animaux',
        configuration: {
            formatJeu: 'Memory',
            plateau: '4 × 2',
            taillePolice: '24px',
            aideMemo: 'Surbrillance / 3 err.',
            aideAssoc: 'Surbrillance case',
            tempsRetenue: 5, 
            frequenceAide: 3
        },
        resultats: {
            tauxReussiteMemory: 52,
            duree: '01:15',
            indicesUtilises: 2,
            erreurOrdre: 10,
            erreurIncoherence: 0
        }
    },
    {
        id: '#5',
        date: "Aujourd'hui",
        theme: 'Fruits',
        configuration: {
            formatJeu: 'Assoc.',
            plateau: '4 × 3',
            taillePolice: '20px',
            aideMemo: 'Surbrillance / 5 err.',
            aideAssoc: 'Réordonner les cartes',
            tempsRetenue: 3, 
            frequenceAide: 8
        },
        resultats: {
            tauxReussiteMemory: 32,
            duree: '01:42',
            indicesUtilises: 1,
            erreurOrdre: 0,
            erreurIncoherence: 15
        }
    },
    {
        id: '#4',
        date: 'Hier',
        theme: 'Véhicules',
        configuration: {
            formatJeu: 'Mémo + Assoc.',
            plateau: '4 × 3',
            taillePolice: '16px',
            aideMemo: 'Surbrillance / 8 err.',
            aideAssoc: 'Surbrillance case',
            tempsRetenue: 1, 
            frequenceAide: 6
        },
        resultats: {
            tauxReussiteMemory: 45,
            duree: '02:30',
            indicesUtilises: 3,
            erreurOrdre: 20,
            erreurIncoherence: 0
        }
    },
    {
        id: '#3',
        date: 'Hier',
        theme: 'Couleurs',
        configuration: {
            formatJeu: 'Mémo + Assoc.',
            plateau: '4 × 3',
            taillePolice: '16px',
            aideMemo: 'Cartes visibles / 8 err.',
            aideAssoc: 'Réordonner les cartes',
            tempsRetenue: 2, 
            frequenceAide: 6 
        },
        resultats: {
            tauxReussiteMemory: 40,
            duree: '00:55',
            indicesUtilises: 0,
            erreurOrdre: 0,
            erreurIncoherence: 0
        }
    },
    {
        id: '#2',
        date: '10 Mars',
        theme: 'Objets',
        configuration: {
            formatJeu: 'Memory',
            plateau: '4 × 2',
            taillePolice: '24px',
            aideMemo: 'Surbrillance / 5 err.',
            aideAssoc: 'Surbrillance case',
            tempsRetenue: 4, 
            frequenceAide: 3
        },
        resultats: {
            tauxReussiteMemory: 36,
            duree: '02:05',
            indicesUtilises: 1,
            erreurOrdre: 10,
            erreurIncoherence: 10
        }
    },
    {
        id: '#1',
        date: '10 Mars',
        theme: 'Pays',
        configuration: {
            formatJeu: 'Assoc.',
            plateau: '4 × 3',
            taillePolice: '16px',
            aideMemo: 'Surbrillance / 5 err.',
            aideAssoc: 'Surbrillance case',
            tempsRetenue: 3, 
            frequenceAide: 4
        },
        resultats: {
            tauxReussiteMemory: 42,
            duree: '02:50',
            indicesUtilises: 2,
            erreurOrdre: 0,
            erreurIncoherence: 25
        }
    }
];