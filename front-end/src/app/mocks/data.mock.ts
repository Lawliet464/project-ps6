import { Injectable, signal } from '@angular/core';
import { Aidant, Patient } from '../core/services/auth.service';
import { DataService } from '../core/services/data.service';
import { Partie } from '../core/models/partie.model';

export const AIDANT: Aidant = {
  id: '1',
  prenom: 'Marie',
  mdp: '1234'
};

export const PATIENTS: Patient[] = [
  { id: '2', prenom: 'Jean',    niveau: 'facile',    aidantId: '1', stats: [] },
  { id: '3', prenom: 'Suzanne', niveau: 'moyen',     aidantId: '1', stats: [] },
  { id: '4', prenom: 'Robert',  niveau: 'difficile', aidantId: '1', stats: [] },
];

export const PARTIES_PAR_PATIENT: Record<string, Partie[]> = {
  // Jean — niveau facile
  '2': [
    {
      id: '#4', date: "Aujourd'hui", theme: 'Animaux',
      configuration: { formatJeu: 'Memory', plateau: '4 × 2', taillePolice: '28px', aideMemo: 'Flash intégral / 3 err.', aideAssoc: 'Surbrillance couple', tempsRetenue: 5, frequenceAide: 3 },
      resultats: { tauxReussiteMemory: 68, duree: '01:10', indicesUtilises: 3, erreurOrdre: 4, erreurIncoherence: 0 }
    },
    {
      id: '#3', date: 'Hier', theme: 'Fruits',
      configuration: { formatJeu: 'Memory', plateau: '4 × 2', taillePolice: '28px', aideMemo: 'Flash intégral / 3 err.', aideAssoc: 'Surbrillance couple', tempsRetenue: 5, frequenceAide: 3 },
      resultats: { tauxReussiteMemory: 55, duree: '01:30', indicesUtilises: 4, erreurOrdre: 6, erreurIncoherence: 0 }
    },
    {
      id: '#2', date: '20 Avr.', theme: 'Véhicules',
      configuration: { formatJeu: 'Memory', plateau: '4 × 2', taillePolice: '28px', aideMemo: 'Flash intégral / 5 err.', aideAssoc: 'Surbrillance couple', tempsRetenue: 4, frequenceAide: 3 },
      resultats: { tauxReussiteMemory: 48, duree: '01:50', indicesUtilises: 5, erreurOrdre: 8, erreurIncoherence: 0 }
    },
    {
      id: '#1', date: '18 Avr.', theme: 'Couleurs',
      configuration: { formatJeu: 'Memory', plateau: '4 × 2', taillePolice: '28px', aideMemo: 'Flash intégral / 5 err.', aideAssoc: 'Surbrillance couple', tempsRetenue: 5, frequenceAide: 3 },
      resultats: { tauxReussiteMemory: 42, duree: '02:00', indicesUtilises: 6, erreurOrdre: 10, erreurIncoherence: 0 }
    },
  ],

  // Suzanne — niveau moyen
  '3': [
    {
      id: '#6', date: "Aujourd'hui", theme: 'Objets du quotidien',
      configuration: { formatJeu: 'Mémo + Assoc.', plateau: '4 × 3', taillePolice: '20px', aideMemo: 'Surbrillance paire / 5 err.', aideAssoc: 'Surbrillance couple', tempsRetenue: 3, frequenceAide: 5 },
      resultats: { tauxReussiteMemory: 74, duree: '02:05', indicesUtilises: 2, erreurOrdre: 3, erreurIncoherence: 5 }
    },
    {
      id: '#5', date: "Aujourd'hui", theme: 'Pays',
      configuration: { formatJeu: 'Association', plateau: '4 × 3', taillePolice: '20px', aideMemo: 'Surbrillance paire / 5 err.', aideAssoc: 'Réordonner', tempsRetenue: 3, frequenceAide: 5 },
      resultats: { tauxReussiteMemory: 61, duree: '01:55', indicesUtilises: 1, erreurOrdre: 0, erreurIncoherence: 8 }
    },
    {
      id: '#4', date: 'Hier', theme: 'Saisons',
      configuration: { formatJeu: 'Mémo + Assoc.', plateau: '4 × 3', taillePolice: '20px', aideMemo: 'Surbrillance paire / 5 err.', aideAssoc: 'Surbrillance couple', tempsRetenue: 3, frequenceAide: 5 },
      resultats: { tauxReussiteMemory: 58, duree: '02:20', indicesUtilises: 2, erreurOrdre: 5, erreurIncoherence: 6 }
    },
    {
      id: '#3', date: '22 Avr.', theme: 'Animaux',
      configuration: { formatJeu: 'Association', plateau: '4 × 3', taillePolice: '20px', aideMemo: 'Partiel visible / 8 err.', aideAssoc: 'Réordonner', tempsRetenue: 2, frequenceAide: 6 },
      resultats: { tauxReussiteMemory: 52, duree: '02:10', indicesUtilises: 3, erreurOrdre: 0, erreurIncoherence: 12 }
    },
    {
      id: '#2', date: '20 Avr.', theme: 'Instruments',
      configuration: { formatJeu: 'Mémo + Assoc.', plateau: '4 × 3', taillePolice: '20px', aideMemo: 'Surbrillance paire / 8 err.', aideAssoc: 'Surbrillance couple', tempsRetenue: 2, frequenceAide: 6 },
      resultats: { tauxReussiteMemory: 47, duree: '02:35', indicesUtilises: 4, erreurOrdre: 7, erreurIncoherence: 9 }
    },
    {
      id: '#1', date: '18 Avr.', theme: 'Fruits',
      configuration: { formatJeu: 'Association', plateau: '4 × 3', taillePolice: '24px', aideMemo: 'Surbrillance paire / 8 err.', aideAssoc: 'Réordonner', tempsRetenue: 2, frequenceAide: 6 },
      resultats: { tauxReussiteMemory: 40, duree: '02:50', indicesUtilises: 5, erreurOrdre: 0, erreurIncoherence: 15 }
    },
  ],

  // Robert — niveau difficile
  '4': [
    {
      id: '#5', date: "Aujourd'hui", theme: 'Monuments du monde',
      configuration: { formatJeu: 'Mémo + Assoc.', plateau: '5 × 4', taillePolice: '16px', aideMemo: 'Partiel visible / 10 err.', aideAssoc: 'Réordonner', tempsRetenue: 1, frequenceAide: 10 },
      resultats: { tauxReussiteMemory: 88, duree: '03:20', indicesUtilises: 1, erreurOrdre: 2, erreurIncoherence: 3 }
    },
    {
      id: '#4', date: 'Hier', theme: 'Capitales',
      configuration: { formatJeu: 'Association', plateau: '5 × 4', taillePolice: '16px', aideMemo: 'Partiel visible / 10 err.', aideAssoc: 'Réordonner', tempsRetenue: 1, frequenceAide: 10 },
      resultats: { tauxReussiteMemory: 82, duree: '02:55', indicesUtilises: 0, erreurOrdre: 0, erreurIncoherence: 7 }
    },
    {
      id: '#3', date: '23 Avr.', theme: 'Instruments',
      configuration: { formatJeu: 'Mémo + Assoc.', plateau: '5 × 4', taillePolice: '16px', aideMemo: 'Partiel visible / 12 err.', aideAssoc: 'Surbrillance couple', tempsRetenue: 1, frequenceAide: 12 },
      resultats: { tauxReussiteMemory: 79, duree: '03:10', indicesUtilises: 1, erreurOrdre: 3, erreurIncoherence: 4 }
    },
    {
      id: '#2', date: '21 Avr.', theme: 'Pays',
      configuration: { formatJeu: 'Mémo + Assoc.', plateau: '5 × 4', taillePolice: '16px', aideMemo: 'Partiel visible / 10 err.', aideAssoc: 'Réordonner', tempsRetenue: 1, frequenceAide: 10 },
      resultats: { tauxReussiteMemory: 75, duree: '03:40', indicesUtilises: 2, erreurOrdre: 5, erreurIncoherence: 5 }
    },
    {
      id: '#1', date: '19 Avr.', theme: "Œuvres d'art",
      configuration: { formatJeu: 'Association', plateau: '5 × 4', taillePolice: '16px', aideMemo: 'Partiel visible / 12 err.', aideAssoc: 'Réordonner', tempsRetenue: 1, frequenceAide: 12 },
      resultats: { tauxReussiteMemory: 70, duree: '03:05', indicesUtilises: 0, erreurOrdre: 0, erreurIncoherence: 10 }
    },
  ],
};

// ── MockDataService ───────────────────────────────────────────────────────────

@Injectable()
export class MockDataService extends DataService {

  readonly aidant$   = signal<Aidant | null>(AIDANT);
  readonly patients$ = signal<Patient[]>(PATIENTS);

  creerAidant(prenom: string, mdp: string): void {
    const nouvel: Aidant = { id: Date.now().toString(), prenom, mdp };
    this.aidant$.set(nouvel);
  }

  supprimerAidant(): void {
    this.aidant$.set(null);
    this.patients$.set([]);
  }

  creerPatient(prenom: string, niveau: Patient['niveau']): void {
    const patient: Patient = {
      id: Date.now().toString(),
      prenom,
      niveau,
      aidantId: this.aidant$()!.id,
      stats: []
    };
    this.patients$.update(list => [...list, patient]);
  }

  supprimerPatient(id: string): Patient | undefined {
    const patient = this.patients$().find(p => p.id === id);
    if (patient) {
      this.patients$.update(list => list.filter(p => p.id !== id));
    }
    return patient;
  }

  getPatientsParAidant(aidantId: string): Patient[] {
    return this.patients$().filter(p => p.aidantId === aidantId);
  }
}