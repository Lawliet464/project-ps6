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

@Injectable({ providedIn: 'root' })
export class AuthService {

  // Qui est connecté et avec quel rôle
  readonly role           = signal<Role>(null);
  readonly aidantConnecte = signal<Aidant | null>(null);
  readonly patientActif   = signal<Patient | null>(null);

  // true dès qu'un aidant ou un patient est connecté
  readonly estConnecte = computed(() =>
    this.aidantConnecte() !== null || this.patientActif() !== null
  );

  // - Aidant -

  connecterAidant(aidant: Aidant): void {
    this.aidantConnecte.set(aidant);
    this.role.set('aidant');
  }

  deconnecterAidant(): void {
    this.aidantConnecte.set(null);
    this.role.set(null);
  }

  verifierMotDePasse(aidant: Aidant, mdp: string): boolean {
    return aidant.mdp === mdp;
  }

  // - Patient -

  connecterPatient(patient: Patient): void {
    this.patientActif.set(patient);
    this.role.set('patient');
  }

  deconnecterPatient(): void {
    this.patientActif.set(null);
    this.role.set(null);
  }
}