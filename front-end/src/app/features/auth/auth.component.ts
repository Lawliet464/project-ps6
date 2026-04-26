import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { DataService } from '../../core/services/data.service'; 

type Ecran =
  | 'accueil'
  | 'connexionAidant'
  | 'creerAidant'
  | 'dashboardAidant'
  | 'creerMalade'
  | 'connexionMalade';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {
  private readonly auth = inject(AuthService); 
  private readonly data = inject(DataService);
  private readonly router = inject(Router);
  readonly actuelAidant = computed(() => this.auth.aidantConnecte());
  
  // États de l'interface
  ecran  = signal<Ecran>('accueil');
  erreur = signal('');

  // Signaux issus du DataService
  readonly aidant$   = this.data.aidant$;
  readonly patients$ = this.data.patients$;

  // Liste réactive des patients de l'aidant actuel
  readonly mesPatientsAidant$ = computed(() => {
    const aidant = this.auth.aidantConnecte();
    return aidant ? this.data.getPatientsParAidant(aidant.id) : [];
  });

  // Modèles pour les formulaires
  formAidant  = { prenom: '', mdp: '' };
  formPatient = { prenom: '', niveau: 'facile' as 'facile' | 'moyen' | 'difficile' };

  constructor() {}

  ngOnInit(): void {
    if (this.auth.aidantConnecte()) {
      this.ecran.set('dashboardAidant');
    }
  }

  // --- ACTIONS AIDANT ---

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
    if (this.data.aidant$()) { 
      this.erreur.set('Un compte administrateur existe déjà.'); 
      return; 
    }
    if (!prenom) { this.erreur.set('Veuillez entrer votre prénom.'); return; }
    if (!mdp || mdp.length < 4) { this.erreur.set('Le mot de passe doit faire au moins 4 caractères.'); return; }

    this.erreur.set('');
    this.data.creerAidant(prenom, mdp);
    
    const nouvelAidant = this.data.aidant$();
    if (nouvelAidant) {
      this.auth.connecterAidant(nouvelAidant);
      this.formAidant = { prenom: '', mdp: '' };
      this.ecran.set('dashboardAidant');
    }
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
    this.ecran.set('accueil');
  }

  // --- ACTIONS PATIENTS (ACCUEILLIS) ---

  creerProfilMalade(): void {
    const { prenom, niveau } = this.formPatient;
    if (!prenom) { 
      this.erreur.set('Veuillez entrer le prénom de l\'accueilli.'); 
      return; 
    }
    this.erreur.set('');
    this.data.creerPatient(prenom, niveau);
    this.formPatient = { prenom: '', niveau: 'facile' };
    this.ecran.set('dashboardAidant');
  }

  supprimerPatient(id: string): void {
    const patient = this.patients$().find(p => p.id === id);
    if (!patient) return;
    
    if (confirm(`Supprimer le profil de "${patient.prenom}" ?`)) {
      this.data.supprimerPatient(id);
    }
  }

  // --- NAVIGATION ---

  voirStats(patientId: string): void {
    this.identifierPatient(patientId);
    this.router.navigate(['/statistiques']);
  }

  voirParams(patientId: string): void {
    this.identifierPatient(patientId);
    this.router.navigate(['/parameters']);
  }

  lancerJeu(patientId: string): void {
    this.identifierPatient(patientId);
    this.router.navigate(['/jeu']);
  }

  private identifierPatient(patientId: string): void {
    const patient = this.patients$().find(p => p.id === patientId);
    if (patient) this.auth.connecterPatient(patient);
  }

  // --- UTILITAIRES ET STATS DASHBOARD ---

  niveauLabel(niveau: string): string {
    const labels: Record<string, string> = {
      facile:    'Niveau facile',
      moyen:     'Niveau moyen',
      difficile: 'Niveau difficile'
    };
    return labels[niveau] || niveau;
  }

  niveauColor(niveau: string): string {
    const colors: Record<string, string> = {
      facile:    '#4caf86',
      moyen:     '#e8a44a',
      difficile: '#c97b84'
    };
    return colors[niveau] || '#808080';
  }

  get totalPatients(): number {
    return this.mesPatientsAidant$().length;
  }

  get repartitionNiveaux() {
    const list = this.mesPatientsAidant$();
    return {
      facile:    list.filter(p => p.niveau === 'facile').length,
      moyen:     list.filter(p => p.niveau === 'moyen').length,
      difficile: list.filter(p => p.niveau === 'difficile').length,
    };
  }
}