// src/app/statistiques/statistiques.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Accueilli } from '../models/accueilli.model';

@Component({
  selector: 'app-statistiques',
  standalone: true,           
  imports: [CommonModule],    
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css']
})
export class StatistiquesComponent implements OnInit {
  
  // Base de données locale (traduction de l'ancien JS)
  public listeAccueillis: Accueilli[] = [
    { 
      id: "jean", 
      nom: "Jean Dupont", 
      age: "82 ans", 
      stade: "Modéré", 
      couleurStade: "#F4F0F2", 
      colorTexte: "#875C74", 
      objectif: "Ralentissement de l'oubli à court terme, stimulation spatiale via le Memory 4x3." 
    },
    { 
      id: "marie", 
      nom: "Marie Martin", 
      age: "76 ans", 
      stade: "Léger", 
      couleurStade: "#F8F4F2", 
      colorTexte: "#B79D94", 
      objectif: "Maintien du vocabulaire via l'association d'images (thème quotidien)." 
    },
    { 
      id: "claude", 
      nom: "Claude Dubois", 
      age: "88 ans", 
      stade: "Sévère", 
      couleurStade: "#F0EFF2", 
      colorTexte: "#453750", 
      objectif: "Thérapie par la réussite. Maintien de l'attention visuelle simple (Memory 4x2)." 
    }
  ];

  public accueilliActuel!: Accueilli;

  ngOnInit() {
    // Initialise l'affichage avec le premier patient
    this.accueilliActuel = this.listeAccueillis[0];
  }

  // La méthode appelée par le menu déroulant
  changerAccueilli(idSelectionne: string) {
    const trouve = this.listeAccueillis.find(personne => personne.id === idSelectionne);
    if (trouve) {
      this.accueilliActuel = trouve;
    }
  }

  // Des fonctions vides pour l'instant, pour éviter les erreurs avec les select du HTML
  updateChart(theme: string) {
    console.log("Thème sélectionné :", theme);
  }

  updatePlateau(taille: string) {
    console.log("Plateau sélectionné :", taille);
  }
}