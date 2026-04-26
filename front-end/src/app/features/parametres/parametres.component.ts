import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JeuService } from '../../core/services/jeu-communication.service';
import { AuthService, Patient } from '../../core/services/auth.service';
import { ConfigurationPartie } from '../../core/models/partie.model';
import { CONFIG_PAR_DEFAUT } from '../../core/constants/game-config.constants';

@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.component.html',
  styleUrls: ['./parametres.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ParametresComponent implements OnInit {

  configLocale!: ConfigurationPartie;
  patientActif: Patient | null = null;

  settings = {
    volume: 70,
    fontSize: 16,
    tempsRetournement: 1,
    frequenceAide: 8,
    themes: ['Saisons', 'Habillement selon la météo']
  };

  constructor(
    private jeuService: JeuService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.patientActif = this.auth.patientActif();
    if (this.patientActif) {
      const configNiveau = CONFIG_PAR_DEFAUT[this.patientActif.niveau];
      this.configLocale = configNiveau ? { ...configNiveau } : { ...this.jeuService.configActive };
    } else {
      this.configLocale = { ...this.jeuService.configActive };
    }
  }

  retour(): void {
    this.router.navigate(['/accueil']);
  }

  onNiveauChange(niveau: string): void {
    const nouvelleConfig = CONFIG_PAR_DEFAUT[niveau];
    if (nouvelleConfig) {
      this.configLocale = { ...nouvelleConfig };
      this.settings.volume = 70;
      this.settings.fontSize = 16;
    }
  }

  sauvegarder(): void {
    this.jeuService.configActive = { ...this.configLocale };
  }

  updateSetting(key: string, value: any): void {
    (this.configLocale as any)[key] = value;
    if (this.settings.hasOwnProperty(key)) {
      (this.settings as any)[key] = value;
    }
  }

  niveauLabel(niveau: string): string {
    const labels: Record<string, string> = { facile: 'Niveau facile', moyen: 'Niveau moyen', difficile: 'Niveau difficile' };
    return labels[niveau] ?? niveau;
  }

  niveauColor(niveau: string): string {
    const colors: Record<string, string> = { facile: '#4caf86', moyen: '#e8a44a', difficile: '#c97b84' };
    return colors[niveau] ?? '#808080';
  }
}