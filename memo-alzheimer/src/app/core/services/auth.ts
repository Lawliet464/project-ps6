import { Injectable, signal, computed } from '@angular/core';

export type Role = 'accueilli' | 'aidant' | null;

export interface Profil {
  id: string;
  nom: string;
  prenom: string;
  niveau: 'facile' | 'moyen' | 'difficile';
}

export interface Aidant {
  id: string;
  nom: string;
  profils: Profil[];
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  readonly role = signal<Role>(null);
  readonly profilActif = signal<Profil | null>(null);
  readonly aidantActif = signal<Aidant | null>(null);
  readonly estConnecte = computed(() => this.profilActif() !== null || this.aidantActif() !== null);

  choisirRole(r: Role): void { this.role.set(r); }

  seConnecterAccueilli(profil: Profil): void {
    this.profilActif.set(profil);
    this.role.set('accueilli');
  }

  seConnecterAidant(aidant: Aidant): void {
    this.aidantActif.set(aidant);
    this.role.set('aidant');
  }

  seDeconnecter(): void {
    this.role.set(null);
    this.profilActif.set(null);
    this.aidantActif.set(null);
  }
}