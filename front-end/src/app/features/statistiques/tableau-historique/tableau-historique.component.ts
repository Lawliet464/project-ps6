import { Component, OnInit } from '@angular/core';
import { Partie } from '../../../core/models/partie.model'; 
import { MOCK_PARTIES } from '../../../mocks/partie.mock';

@Component({
  selector: 'app-tableau-historique',
  templateUrl: './tableau-historique.component.html',
  styleUrls: ['./tableau-historique.component.scss']
})
export class TableauHistoriqueComponent implements OnInit {

  public historiqueParties: Partie[] = MOCK_PARTIES;

  constructor() { }

  ngOnInit(): void {
  }

}