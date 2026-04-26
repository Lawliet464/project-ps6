import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'; 
import { ConfigurationPartie } from '../models/partie.model';
import { CONFIG_PAR_DEFAUT } from '../constants/game-config.constants';

@Injectable({
  providedIn: 'root'
})
export class JeuService {
  configActive: ConfigurationPartie = CONFIG_PAR_DEFAUT['difficile'];
  
  // État de la partie en cours
  compteurErreurs: number = 0;
  role: 'accueilli' | 'aidant' | null = null;

  // Communication entre composants
  private finEtapeSource = new Subject<void>();
  finEtape$ = this.finEtapeSource.asObservable();

  constructor() { }

  // --- MÉTHODES DE CONFIGURATION ---

  // Pour changer toute la config d'un coup (ex: clic sur bouton "Moyen")
  setNiveau(niveau: 'facile' | 'moyen' | 'difficile'): void {
    this.configActive = { ...CONFIG_PAR_DEFAUT[niveau] };
    this.reset();
  }

  // Pour modifier un seul paramètre 
  setTempsRetenue(secondes: number): void {
    this.configActive.tempsRetenue = secondes;
  }

  // --- LOGIQUE DE JEU ---

  setRole(r: 'accueilli' | 'aidant'): void {
    this.role = r;
  }

  terminerEtape(): void {
    this.finEtapeSource.next();
  }

  incrementErreur(): boolean {
    this.compteurErreurs++;
    // On compare avec la valeur stockée dans la config active
    if (this.compteurErreurs >= this.configActive.frequenceAide) {
      this.compteurErreurs = 0; 
      return true; // Déclenche l'aide
    }
    return false;
  }

  reset(): void {
    this.compteurErreurs = 0;
  }
}