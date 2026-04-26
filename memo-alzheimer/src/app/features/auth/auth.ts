import { Component, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth';
import { DataService } from '../../mocks/auth/data';

type Ecran =
  | 'accueil'
  | 'connexionAidant'
  | 'creerAidant'
  | 'dashboardAidant'
  | 'creerMalade'
  | 'connexionMalade';

@Component({
  selector: 'app-auth',
  imports: [FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class Auth {

  readonly router = inject(Router);
  readonly auth   = inject(AuthService);
  readonly data   = inject(DataService);

  ecran  = signal<Ecran>('accueil');
  erreur = signal('');

  readonly aidant$   = this.data.aidant$;
  readonly patients$ = this.data.patients$;

  readonly mesPatientsAidant$ = computed(() => {
    const aidant = this.auth.aidantConnecte();
    if (!aidant) return [];
    return this.data.getPatientsParAidant(aidant.id);
  });

  // Si une session est active (localStorage), on atterrit directement sur le dashboard
  constructor() {
    if (this.auth.aidantConnecte()) {
      this.ecran.set('dashboardAidant');
    }
  }

  formAidant  = { prenom: '', mdp: '' };
  formPatient = { prenom: '', niveau: 'facile' as 'facile' | 'moyen' | 'difficile' };

  // - Aidant -

  ouvrirConnexionAidant(aidant: { id: string; prenom: string; mdp: string }): void {
    const mdp = prompt(`Mot de passe pour ${aidant.prenom} :`);
    if (mdp === null) return;
    if (this.auth.verifierMotDePasse(aidant, mdp)) {
      this.auth.connecterAidant(aidant);
      this.ecran.set('dashboardAidant');
    } else {
      alert('Mot de passe incorrect.');
    }
  }

  creerCompteAidant(): void {
    const { prenom, mdp } = this.formAidant;
    if (this.data.aidant$())     { this.erreur.set(' Un compte administrateur existe déjà.'); return; }
    if (!prenom)                 { this.erreur.set(' Veuillez entrer votre prénom.'); return; }
    if (!mdp || mdp.length < 4)  { this.erreur.set(' Le mot de passe doit faire au moins 4 caractères.'); return; }
    this.erreur.set('');
    this.data.creerAidant(prenom, mdp);
    this.auth.connecterAidant(this.data.aidant$()!);
    this.formAidant = { prenom: '', mdp: '' };
    this.ecran.set('dashboardAidant');
  }

  supprimerAidant(): void {
    const aidant = this.data.aidant$();
    if (!aidant) return;
    if (!confirm(`Supprimer le compte de "${aidant.prenom}" ?\nSes patients associés seront aussi supprimés.`)) return;
    this.data.supprimerAidant();
    this.auth.deconnecterAidant();
    this.ecran.set('accueil');
  }

  deconnecterAidant(): void {
    this.auth.deconnecterAidant();
    this.ecran.set('accueil');   // retour à la landing
  }

  // - Patients -

  creerProfilMalade(): void {
    const { prenom, niveau } = this.formPatient;
    if (!prenom) { this.erreur.set(' Veuillez entrer le prénom du patient.'); return; }
    this.erreur.set('');
    this.data.creerPatient(prenom, niveau);
    this.formPatient = { prenom: '', niveau: 'facile' };
    this.ecran.set('dashboardAidant');
  }

  supprimerPatient(id: string): void {
    const patient = this.data.supprimerPatient(id);
    if (!patient) return;
    if (!confirm(`Supprimer le profil de "${patient.prenom}" ?`)) {
      this.data.creerPatient(patient.prenom, patient.niveau);
    }
  }

  // - Navigation -

  voirStats(patientId: string): void {
    const patient = this.patients$().find(p => p.id === patientId);
    if (patient) this.auth.connecterPatient(patient);
    this.router.navigate(['/statistiques']);
  }

  lancerJeu(patientId: string): void {
    const patient = this.patients$().find(p => p.id === patientId);
    if (patient) this.auth.connecterPatient(patient);
    this.router.navigate(['/jeu']);
  }

  // - Utilitaire -

  niveauLabel(niveau: string): string {
    const labels: Record<string, string> = {
      facile:    ' Niveau facile',
      moyen:     ' Niveau moyen',
      difficile: ' Niveau difficile'
    };
    return labels[niveau] || niveau;
  }

  niveauColor(niveau: string): string {
    const colors: Record<string, string> = {
      facile:    '#4caf86',
      moyen:     '#e8a44a',
      difficile: '#c97b84'
    };
    return colors[niveau] || 'var(--gris)';
  }

  get totalPatients(): number {
    return this.mesPatientsAidant$().length;
  }

  get repartitionNiveaux(): { facile: number; moyen: number; difficile: number } {
    const list = this.mesPatientsAidant$();
    return {
      facile:    list.filter(p => p.niveau === 'facile').length,
      moyen:     list.filter(p => p.niveau === 'moyen').length,
      difficile: list.filter(p => p.niveau === 'difficile').length,
    };
  }
}