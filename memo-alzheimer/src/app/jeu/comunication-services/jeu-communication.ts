import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class JeuCommunication {
  compteurErreurs = 0;
  frequenceAide = 8;
  tempsRetournement = 1000; // ms
  role: 'accueilli' | 'aidant' | null = null;

  setRole(r: 'accueilli' | 'aidant') {
    this.role = r;
  }

  incrementErreur(): boolean {
    this.compteurErreurs++;
    if (this.compteurErreurs >= this.frequenceAide) {
      this.compteurErreurs = 0;
      return true;
    }
    return false;
  }

  reset() {
    this.compteurErreurs = 0;
  }
}
