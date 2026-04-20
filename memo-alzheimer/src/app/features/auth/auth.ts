import { Component, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

type Ecran = 'accueil' | 'connexionAidant' | 'creerAidant' | 'dashboardAidant' | 'creerMalade' | 'connexionMalade';

interface Aidant {
  id: string;
  prenom: string;
  mdp: string;
}

interface Patient {
  id: string;
  prenom: string;
  niveau: 'facile' | 'moyen' | 'difficile';
  aidantId: string;
  stats: any[];
}

@Component({
  selector: 'app-auth',
  imports: [FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class Auth {

  readonly router = inject(Router);

  ecran = signal<Ecran>('accueil');
  erreur = signal('');

  aidants = signal<Aidant[]>(JSON.parse(localStorage.getItem('ml_aidants') || '[]'));
  patients = signal<Patient[]>(JSON.parse(localStorage.getItem('ml_patients') || '[]'));
  aidantConnecte = signal<Aidant | null>(null);

  formAidant = { prenom: '', mdp: '' };
  formPatient = { prenom: '', niveau: 'facile' as Patient['niveau'] };

  mesPatientsAidant = computed(() =>
    this.patients().filter(p => p.aidantId === this.aidantConnecte()?.id)
  );

  private sauvegarder(): void {
    localStorage.setItem('ml_aidants', JSON.stringify(this.aidants()));
    localStorage.setItem('ml_patients', JSON.stringify(this.patients()));
  }

  ouvrirConnexionAidant(aidant: Aidant): void {
    const mdp = prompt(`Mot de passe pour ${aidant.prenom} :`);
    if (mdp === null) return;
    if (mdp === aidant.mdp) {
      this.aidantConnecte.set(aidant);
      this.ecran.set('dashboardAidant');
    } else {
      alert('❌ Mot de passe incorrect.');
    }
  }

  supprimerAidant(id: string): void {
    const a = this.aidants().find(x => x.id === id)!;
    if (!confirm(`Supprimer le compte de "${a.prenom}" ?\nSes patients associés seront aussi supprimés.`)) return;
    this.aidants.update(list => list.filter(x => x.id !== id));
    this.patients.update(list => list.filter(p => p.aidantId !== id));
    this.sauvegarder();
  }

  creerCompteAidant(): void {
    const { prenom, mdp } = this.formAidant;
    if (!prenom) { this.erreur.set('⚠️ Veuillez entrer votre prénom.'); return; }
    if (!mdp || mdp.length < 4) { this.erreur.set('⚠️ Le mot de passe doit faire au moins 4 caractères.'); return; }
    if (this.aidants().find(a => a.prenom.toLowerCase() === prenom.toLowerCase())) {
      this.erreur.set('⚠️ Un compte avec ce prénom existe déjà.'); return;
    }
    this.erreur.set('');
    const nouvelAidant: Aidant = { id: Date.now().toString(), prenom, mdp };
    this.aidants.update(list => [...list, nouvelAidant]);
    this.sauvegarder();
    this.aidantConnecte.set(nouvelAidant);
    this.formAidant = { prenom: '', mdp: '' };
    this.ecran.set('dashboardAidant');
  }

  creerProfilMalade(): void {
    const { prenom, niveau } = this.formPatient;
    if (!prenom) { this.erreur.set('⚠️ Veuillez entrer le prénom du patient.'); return; }
    this.erreur.set('');
    const patient: Patient = {
      id: Date.now().toString(),
      prenom,
      niveau,
      aidantId: this.aidantConnecte()!.id,
      stats: []
    };
    this.patients.update(list => [...list, patient]);
    this.sauvegarder();
    this.formPatient = { prenom: '', niveau: 'facile' };
    this.ecran.set('dashboardAidant');
  }

  supprimerPatient(id: string): void {
    const p = this.patients().find(x => x.id === id)!;
    if (!confirm(`Supprimer le profil de "${p.prenom}" ?`)) return;
    this.patients.update(list => list.filter(x => x.id !== id));
    this.sauvegarder();
  }

  voirStats(patientId: string): void {
    localStorage.setItem('ml_patientActif', patientId);
    this.router.navigate(['/statistiques']);
  }

  deconnecterAidant(): void {
    this.aidantConnecte.set(null);
    this.ecran.set('accueil');
  }

  lancerJeu(patientId: string): void {
    localStorage.setItem('ml_patientActif', patientId);
    this.router.navigate(['/jeu']);
  }

  supprimerProfilMalade(id: string): void {
    const p = this.patients().find(x => x.id === id)!;
    if (!confirm(`Supprimer le profil de "${p.prenom}" ?`)) return;
    this.patients.update(list => list.filter(x => x.id !== id));
    this.sauvegarder();
  }

  niveauLabel(niveau: string): string {
    const labels: Record<string, string> = {
      facile: '🌱 Niveau facile',
      moyen: '🌿 Niveau moyen',
      difficile: '🍂 Niveau difficile'
    };
    return labels[niveau] || niveau;
  }
}