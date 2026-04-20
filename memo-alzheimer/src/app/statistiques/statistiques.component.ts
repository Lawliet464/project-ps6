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
  public listeAccueillis: Accueilli[] = [
    { 
      id: "jean", 
      nom: "Jean Dupont", 
      age: "82 ans", 
      level: "Intermédiare", 
      couleurStade: "#F4F0F2", 
      colorTexte: "#875C74", 
      passions: "Jardinage, pêche" 
    },
    { 
      id: "marie", 
      nom: "Marie Martin", 
      age: "76 ans", 
      level: "Elevé", 
      couleurStade: "#F8F4F2", 
      colorTexte: "#B79D94", 
      passions: "Herbier, couture" 
    },
    { 
      id: "claude", 
      nom: "Claude Dubois", 
      age: "88 ans", 
      level: "Facile", 
      couleurStade: "#F0EFF2", 
      colorTexte: "#453750", 
      passions: "Timbre, voyage" 
    }
  ];

  public accueilliActuel!: Accueilli;

  ngOnInit() {
    this.accueilliActuel = this.listeAccueillis[0];
  }

  changerAccueilli(idSelectionne: string) {
    const trouve = this.listeAccueillis.find(personne => personne.id === idSelectionne);
    if (trouve) {
      this.accueilliActuel = trouve;
    }
  }

  updateChart(theme: string) {
    console.log("Thème sélectionné :", theme);
  }

  updatePlateau(taille: string) {
    console.log("Plateau sélectionné :", taille);
  }
}