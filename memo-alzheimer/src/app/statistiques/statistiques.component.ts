import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// 1. On importe le modèle et le SERVICE
import { Accueilli } from '../models/accueilli.model';
import { AccueilliService } from '../services/accueilli.service';

// 2. On importe tes nouveaux ENFANTS
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
  templateUrl: 'statistiques.component.html', // <-- Vérifie si c'est .html ou .component.html chez toi
  styleUrls: ['statistiques.component.css']   // <-- Vérifie si c'est .css ou .component.css chez toi
})
export class StatistiquesComponent implements OnInit {
  
  // Les variables sont vides au départ...
  public listeAccueillis: Accueilli[] = [];
  public accueilliActuel!: Accueilli;

  // On demande notre Service à Angular
  constructor(private accueilliService: AccueilliService) {}

  ngOnInit() {
    // ... et le Service vient les remplir au démarrage !
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
      this.accueilliActuel = trouve; // Le *ngIf se met à jour, et la magie opère !
    }
  }
}