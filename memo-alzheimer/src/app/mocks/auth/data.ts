import { Signal } from '@angular/core';
import { Aidant, Patient } from '../../core/services/auth';

// - Contrat abstrait -
// Définit QUOI faire, pas COMMENT.
// MockDataService l'implémente maintenant.
// ApiDataService l'implémentera quand le backend sera prêt.

export abstract class DataService {

  // Signaux exposés en lecture
  abstract readonly aidant$:   Signal<Aidant | null>;
  abstract readonly patients$: Signal<Patient[]>;

  // - Aidant -
  abstract creerAidant(prenom: string, mdp: string): void;
  abstract supprimerAidant(): void;

  // - Patients -
  abstract creerPatient(prenom: string, niveau: Patient['niveau']): void;
  abstract supprimerPatient(id: string): Patient | undefined;
  abstract getPatientsParAidant(aidantId: string): Patient[];
}