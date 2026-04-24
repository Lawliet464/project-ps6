// src/app/services/accueilli.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; 
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
    return of(MOCK_ACCUEILLIS); 
  }
}