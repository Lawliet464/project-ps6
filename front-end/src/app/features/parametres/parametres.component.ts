import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { JeuService } from '../../core/services/jeu-communication.service';
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
  settings = {
    volume: 70,
    fontSize: 16,
    tempsRetournement: 1,
    frequenceAide: 8,
    themes: ['Saisons', 'Habillement selon la météo']
  };

  constructor(private jeuService: JeuService) {}

  ngOnInit(): void {
    // On initialise avec la config actuelle du service (pour garder les réglages si on revient sur la page)
    this.configLocale = { ...this.jeuService.configActive };
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
    // On applique la config locale au service global
    this.jeuService.configActive = { ...this.configLocale };
  }
  
  updateSetting(key: string, value: any): void {
    // On met à jour configLocale pour que la sauvegarde fonctionne
    (this.configLocale as any)[key] = value;
    
    // Si c'est une valeur partagée avec settings (ex: volume), on met aussi settings à jour
    if (this.settings.hasOwnProperty(key)) {
      (this.settings as any)[key] = value;
    }
  }
}
