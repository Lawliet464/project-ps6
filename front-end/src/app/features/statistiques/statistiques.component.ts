import { Component, OnInit } from '@angular/core';
import { Accueilli } from '../../core/models/accueilli.model';
import { AccueilliService } from '../../core/services/accueilli.service';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.scss'] 
})
export class StatistiquesComponent implements OnInit {
  
  public listeAccueillis: Accueilli[] = [];
  public accueilliActuel?: Accueilli; 
  constructor(private accueilliService: AccueilliService) {}

  ngOnInit(): void {
    this.accueilliService.getListeAccueillis().subscribe({
      next: (donnees) => {
        this.listeAccueillis = donnees;
        if (this.listeAccueillis.length > 0) {
          this.accueilliActuel = this.listeAccueillis[0];
        }
      },
      error: (err) => console.error('Erreur lors du chargement des accueillis', err)
    });
  }

  changerAccueilli(idSelectionne: string): void {
    const trouve = this.listeAccueillis.find(personne => personne.id === idSelectionne);
    if (trouve) {
      this.accueilliActuel = trouve;
    }
  }
}