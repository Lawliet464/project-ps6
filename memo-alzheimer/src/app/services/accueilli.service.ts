// src/app/services/accueilli.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; 
// On a supprimé l'import de 'delay' et de 'operators' ici
import { Accueilli } from '../models/accueilli.model';
import { MOCK_ACCUEILLIS } from '../mocks/mock-accueillis';

@Injectable({
  providedIn: 'root'
})
export class AccueilliService {

  constructor() { }

  /**
   * Récupère la liste des accueillis depuis le mock.
   * On retourne un Observable pour rester compatible avec une future API.
   */
  getListeAccueillis(): Observable<Accueilli[]> {
    // On retire le .pipe(delay(500)) pour un envoi instantané
    return of(MOCK_ACCUEILLIS); 
  }
}