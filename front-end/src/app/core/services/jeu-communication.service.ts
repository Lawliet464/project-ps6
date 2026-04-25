import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class JeuService {
  compteurErreurs: number = 0;
  frequenceAide: number = 8;
  tempsRetournement: number = 1000; // ms
  role: 'accueilli' | 'aidant' | null = null;

  private finEtapeSource = new Subject<void>();
  finEtape$ = this.finEtapeSource.asObservable();

  constructor() { }

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

  configurerJeu(frequence: number, temps: number): void {
    this.frequenceAide = frequence;
    this.tempsRetournement = temps * 1000; 
  }
}