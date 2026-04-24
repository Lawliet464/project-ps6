import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// 1. On importe le modèle et le service
import { Accueilli } from '../models/accueilli.model';
import { AccueilliService } from '../services/accueilli.service';

// 2. On importe les enfants
import { ProfilPatientComponent } from './profil-patient/profil-patient';
import { GraphiqueCourbeComponent } from './graphique-courbe/graphique-courbe';
import { TableauHistoriqueComponent } from './tableau-historique/tableau-historique';

@Component({
  selector: 'app-statistiques',
  standalone: true,           
  // On déclare ici tout ce dont on a besoin
  imports: [
    CommonModule, 
    ProfilPatientComponent, 
    GraphiqueCourbeComponent, 
    TableauHistoriqueComponent
  ],    
  templateUrl: 'statistiques.component.html',
  styleUrls: ['statistiques.component.css']   
})
export class StatistiquesComponent implements OnInit {
  
  // Les variables sont vides au départ
  public listeAccueillis: Accueilli[] = [];
  public accueilliActuel!: Accueilli;

  // On demande notre Service à Angular
  constructor(private accueilliService: AccueilliService) {}

  ngOnInit() {
    // Le Service vient les remplir au démarrage 
    this.accueilliService.getListeAccueillis().subscribe((donnees) => {
      this.listeAccueillis = donnees;
      
      // Dès que les données arrivent, on sélectionne le premier patient
      if (this.listeAccueillis.length > 0) {
        this.accueilliActuel = this.listeAccueillis[0];
      }
    });
  }

  changerAccueilli(idSelectionne: string) {
    const trouve = this.listeAccueillis.find(personne => personne.id === idSelectionne);
    if (trouve) {
      this.accueilliActuel = trouve; // Le *ngIf se met à jour
    }
  }
}