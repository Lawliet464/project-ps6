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
  readonly auth   = inject(AuthService);   // gère la session
  readonly data   = inject(DataService);   // gère les données

  ecran  = signal<Ecran>('accueil');
  erreur = signal('');

  // Lecture directe depuis les services — le component ne stocke rien
  readonly aidant$   = this.data.aidant$;
  readonly patients$ = this.data.patients$;

  // Patients filtrés par l'aidant connecté
  readonly mesPatientsAidant$ = computed(() => {
    const aidant = this.auth.aidantConnecte();
    if (!aidant) return [];
    return this.data.getPatientsParAidant(aidant.id);
  });

  formAidant  = { prenom: '', mdp: '' };
  formPatient = { prenom: '', niveau: 'facile' as 'facile' | 'moyen' | 'difficile' };

  // - Aidant -

  ouvrirConnexionAidant(aidant: { id: string; prenom: string; mdp: string }): void {
    const mdp = prompt(`Mot de passe pour ${aidant.prenom} :`);
    if (mdp === null) return;   // l'utilisateur a annulé
    if (this.auth.verifierMotDePasse(aidant, mdp)) {
      this.auth.connecterAidant(aidant);
      this.ecran.set('dashboardAidant');
    } else {
      alert('❌ Mot de passe incorrect.');
    }
  }

  creerCompteAidant(): void {
    const { prenom, mdp } = this.formAidant;
    if (this.data.aidant$())      { this.erreur.set('⚠️ Un compte administrateur existe déjà.'); return; }
    if (!prenom)                  { this.erreur.set('⚠️ Veuillez entrer votre prénom.'); return; }
    if (!mdp || mdp.length < 4)   { this.erreur.set('⚠️ Le mot de passe doit faire au moins 4 caractères.'); return; }
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
  }

  deconnecterAidant(): void {
    this.auth.deconnecterAidant();
    this.ecran.set('accueil');
  }

  // - Patients -

  creerProfilMalade(): void {
    const { prenom, niveau } = this.formPatient;
    if (!prenom) { this.erreur.set('⚠️ Veuillez entrer le prénom du patient.'); return; }
    this.erreur.set('');
    this.data.creerPatient(prenom, niveau);
    this.formPatient = { prenom: '', niveau: 'facile' };
    this.ecran.set('dashboardAidant');
  }

  // Une seule méthode pour les deux écrans — plus de duplication
  supprimerPatient(id: string): void {
    const patient = this.data.supprimerPatient(id);
    if (!patient) return;
    if (!confirm(`Supprimer le profil de "${patient.prenom}" ?`)) {
      // l'utilisateur a annulé — on remet le patient
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
      facile:    '🌱 Niveau facile',
      moyen:     '🌿 Niveau moyen',
      difficile: '🍂 Niveau difficile'
    };
    return labels[niveau] || niveau;
  }
}