import { Component, Input, OnChanges } from '@angular/core';
import { Partie } from '../../../core/models/partie.model';

@Component({
  selector: 'app-graphique-courbe',
  templateUrl: './graphique-courbe.component.html',
  styleUrls: ['./graphique-courbe.component.scss']
})
export class GraphiqueCourbeComponent implements OnChanges {

  @Input() parties: Partie[] = [];
  public pointsGraphique: { label: string; taux: number }[] = [];

  ngOnChanges(): void {
    this.pointsGraphique = [...this.parties]
      .reverse()
      .map(p => ({ label: p.theme, taux: p.resultats.tauxReussiteMemory }));
  }
}