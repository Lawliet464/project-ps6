import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, Patient } from '../../core/services/auth.service';
import { Partie } from '../../core/models/partie.model';
import { PARTIES_PAR_PATIENT } from '../../mocks/data.mock';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.scss']
})
export class StatistiquesComponent implements OnInit {

  public patientActif: Patient | null = null;
  public historiqueParties: Partie[] = [];

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.patientActif = this.auth.patientActif();
    this.historiqueParties = this.patientActif
      ? (PARTIES_PAR_PATIENT[this.patientActif.id] ?? [])
      : [];
  }

  retour(): void {
    this.router.navigate(['/accueil']);
  }

  niveauLabel(niveau: string): string {
    const labels: Record<string, string> = { facile: 'Niveau facile', moyen: 'Niveau moyen', difficile: 'Niveau difficile' };
    return labels[niveau] ?? niveau;
  }

  niveauColor(niveau: string): string {
    const colors: Record<string, string> = { facile: '#4caf86', moyen: '#e8a44a', difficile: '#c97b84' };
    return colors[niveau] ?? '#808080';
  }

  get tauxMoyen(): number {
    if (!this.historiqueParties.length) return 0;
    return Math.round(this.historiqueParties.reduce((s, p) => s + p.resultats.tauxReussiteMemory, 0) / this.historiqueParties.length);
  }

  get totalIndices(): number {
    return this.historiqueParties.reduce((s, p) => s + p.resultats.indicesUtilises, 0);
  }
}