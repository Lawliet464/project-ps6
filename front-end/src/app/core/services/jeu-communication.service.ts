import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Theme, ElemTheme } from '../models/theme.model';
import { THEMES } from '../../mocks/themes.mock';

@Injectable({
  providedIn: 'root'
})
export class JeuService {

  themeChoisi: Theme | null = null;
  elemsJeu: ElemTheme[] = [];
  aideMemorisation: number | null = null;
  aideAssociation: number | null = null;

  compteurErreursMemory: number = 0;
  compteurErreursAssociation: number = 0;

  frequenceAide: number = 0;
  temps: number = 0;
  role: 'accueilli' | 'aidant' | null = null;

  private finEtapeSource = new Subject<void>();
  finEtape$ = this.finEtapeSource.asObservable();

  constructor() {}

  setRole(r: 'accueilli' | 'aidant'): void {
    this.role = r;
  }

  terminerEtape(): void {
    this.finEtapeSource.next();
  }

  incrementErreurMemory(): boolean {
    this.compteurErreursMemory++;
    if (this.compteurErreursMemory >= this.frequenceAide) {
      this.compteurErreursMemory = 0;
      return true;
    }
    return false;
  }

  incrementErreurAssociation(): boolean {
    this.compteurErreursAssociation++;
    if (this.compteurErreursAssociation >= this.frequenceAide) {
      this.compteurErreursAssociation = 0;
      return true;
    }
    return false;
  }

  reset(): void {
    this.compteurErreursMemory = 0;
    this.compteurErreursAssociation = 0;
  }

  configurerJeu(
    frequence: number,
    temps: number,
    paires: number,
    themeChoisi: Theme,
    aideMemorisation: number,
    aideAssociation: number
  ): void {
    this.frequenceAide = frequence;
    this.temps = temps * 1000;
    this.themeChoisi = themeChoisi;
    this.aideMemorisation = aideMemorisation;
    this.aideAssociation = aideAssociation;
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
