import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; 
import { Accueilli } from '../models/accueilli.model';
import { MOCK_ACCUEILLIS } from '../../mocks/accueilli.mock';

@Injectable({
  providedIn: 'root' 
})
export class AccueilliService {

  constructor() { }

  getListeAccueillis(): Observable<Accueilli[]> {
    return of(MOCK_ACCUEILLIS); 
  }

  getAccueilliById(id: number): Observable<Accueilli | undefined> {
    const accueilli = MOCK_ACCUEILLIS.find(a => Number(a.id) === id);
    return of(accueilli);
  }
}