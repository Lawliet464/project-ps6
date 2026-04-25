import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graphique-courbe',
  templateUrl: './graphique-courbe.component.html',
  styleUrls: ['./graphique-courbe.component.scss'] 
})
export class GraphiqueCourbeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}

  updateChart(theme: string): void {
    console.log("Thème sélectionné :", theme);
  }

  updatePlateau(taille: string): void {
    console.log("Plateau sélectionné :", taille);
  }
}