import { Injectable, signal } from '@angular/core';
import { Aidant, Patient } from '../../core/services/auth';
import { DataService } from './data';

// ── Fausses données ───────────────────────────────────────────────────────────
// Modifie ces objets pour changer les données de démo

const AIDANT: Aidant = {
  id: '1',
  prenom: 'Marie',
  mdp: '1234'
};

const PATIENTS: Patient[] = [
  { id: '2', prenom: 'Jean',    niveau: 'facile',    aidantId: '1', stats: [] },
  { id: '3', prenom: 'Suzanne', niveau: 'moyen',     aidantId: '1', stats: [] },
  { id: '4', prenom: 'Robert',  niveau: 'difficile', aidantId: '1', stats: [] },
];

// ── Implémentation mock ───────────────────────────────────────────────────────
// Tout est en mémoire — les données reviennent à l'état initial à chaque rechargement.
// Quand le backend sera prêt, on créera ApiDataService qui étend aussi DataService,
// et on changera une ligne dans app.config.ts.

@Injectable()
export class MockDataService extends DataService {

  readonly aidant$   = signal<Aidant | null>(AIDANT);
  readonly patients$ = signal<Patient[]>(PATIENTS);

  // ── Aidant ──────────────────────────────────────────────────────────────────

  creerAidant(prenom: string, mdp: string): void {
    const nouvel: Aidant = { id: Date.now().toString(), prenom, mdp };
    this.aidant$.set(nouvel);
  }

  supprimerAidant(): void {
    this.aidant$.set(null);
    this.patients$.set([]);   // suppression en cascade
  }

  // ── Patients ─────────────────────────────────────────────────────────────────

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

  // Retourne le patient supprimé pour que le component affiche son prénom
  // dans la confirmation — une seule méthode pour les deux écrans
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