import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-graphique-courbe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './graphique-courbe.html',
  styleUrls: ['./graphique-courbe.css']
})
export class GraphiqueCourbeComponent {

  // On a rapatrié les fonctions de l'ancien fichier parent ici !
  updateChart(theme: string) {
    console.log("Thème sélectionné :", theme);
  }

  updatePlateau(taille: string) {
    console.log("Plateau sélectionné :", taille);
  }
}