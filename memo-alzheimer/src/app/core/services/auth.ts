import { Injectable, signal, computed } from '@angular/core';

// Types partagés - importés partout dans le projet

export type Role = 'aidant' | 'patient' | null;

export interface Aidant {
  id: string;
  prenom: string;
  mdp: string;
}

export interface Patient {
  id: string;
  prenom: string;
  niveau: 'facile' | 'moyen' | 'difficile';
  aidantId: string;
  stats: any[];
}

// - Service -

const SESSION_KEY = 'memolink_aidant_session';

@Injectable({ providedIn: 'root' })
export class AuthService {

  // Initialisation depuis localStorage — la session survit au refresh
  readonly aidantConnecte = signal<Aidant | null>(this._lireSession());
  readonly patientActif   = signal<Patient | null>(null);

  readonly role = computed<Role>(() => {
    if (this.aidantConnecte() !== null) return 'aidant';
    if (this.patientActif()   !== null) return 'patient';
    return null;
  });

  readonly estConnecte = computed(() =>
    this.aidantConnecte() !== null || this.patientActif() !== null
  );

  // - Aidant -

  connecterAidant(aidant: Aidant): void {
    this.aidantConnecte.set(aidant);
    localStorage.setItem(SESSION_KEY, JSON.stringify(aidant));
  }

  deconnecterAidant(): void {
    this.aidantConnecte.set(null);
    localStorage.removeItem(SESSION_KEY);
  }

  verifierMotDePasse(aidant: Aidant, mdp: string): boolean {
    return aidant.mdp === mdp;
  }

  // - Patient -

  connecterPatient(patient: Patient): void {
    this.patientActif.set(patient);
  }

  deconnecterPatient(): void {
    this.patientActif.set(null);
  }

  // - Privé -

  private _lireSession(): Aidant | null {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) as Aidant : null;
    } catch {
      return null;
    }
  }
}