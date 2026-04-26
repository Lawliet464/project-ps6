import { Component, Input, OnChanges } from '@angular/core';
import { Partie } from '../../../core/models/partie.model';

@Component({
  selector: 'app-tableau-historique',
  templateUrl: './tableau-historique.component.html',
  styleUrls: ['./tableau-historique.component.scss']
})
export class TableauHistoriqueComponent implements OnChanges {

  @Input() parties: Partie[] = [];
  public historiqueParties: Partie[] = [];

  ngOnChanges(): void {
    this.historiqueParties = this.parties;
  }
}