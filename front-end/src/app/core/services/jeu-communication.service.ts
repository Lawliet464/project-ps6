import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ConfigurationPartie } from '../models/partie.model';
import { CONFIG_PAR_DEFAUT } from '../constants/game-config.constants';
import { Theme, ElemTheme } from '../models/theme.model';
import { THEMES } from '../../mocks/themes.mock';


@Injectable({
  providedIn: 'root'
})
export class JeuService {
  configActive: ConfigurationPartie = CONFIG_PAR_DEFAUT['difficile'];

  // État de la partie en cours

  themeChoisi: Theme | null = null;
  elemsJeu: ElemTheme[]=[];
  aideMemorisation: number | null = null;
  aideAssociation: number | null = null;

  compteurErreurs: number = 0;
  frequenceAide: number = 0;
  tempsRetournement: number = 0;
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
    if (this.compteurErreurs >= this.frequenceAide) {
      this.compteurErreurs = 0;
      return true;
    }
    return false;
  }

  reset(): void {
    this.compteurErreurs = 0;
  }

  configurerJeu(frequence: number, temps: number, paires: number, themeChoisi: Theme, aideMemorisation: number, aideAssociation: number): void {
    this.frequenceAide = frequence;
    this.tempsRetournement = temps * 1000;
    this.themeChoisi=themeChoisi;
    this.aideMemorisation= aideMemorisation;
    this.aideAssociation= aideAssociation;
    this.setElemsJeu(paires, themeChoisi);
  }

  private setElemsJeu(paires: number, theme: Theme): void {
    this.elemsJeu = [];

    for (const e of theme.elementsAssoc) {
      this.elemsJeu.push(e);
    }

    if (this.elemsJeu.length < paires) {
      const autresElems: ElemTheme[] = [];
      const autresThemes = THEMES.filter(t => t.id !== theme.id);
      for (const autreTheme of autresThemes) {
        for (const e of autreTheme.elementsAssoc) {
          autresElems.push(e);
        }
      }

      autresElems.sort(() => Math.random() - 0.5);

      for (const e of autresElems) {
        if (this.elemsJeu.length === paires) return;
        this.elemsJeu.push(e);
      }
    }
  }

}
