import { Component, OnInit } from '@angular/core';
import { JeuService } from '../../core/services/jeu-communication.service';

@Component({
  selector: 'app-jeu',
  templateUrl: './jeu.component.html',
  styleUrls: ['./jeu.component.scss'] 
})
export class JeuComponent implements OnInit {
  phase: 'role' | 'accueil' | 'memory' | 'association' | 'fin' = 'role';

  readonly sequenceFinale = [
    { id: 1, label: 'Brosse à dents', image: "assets/Banque_Images/Brossage_de_dents/toothbrush.png", ordreCible: 1 },
    { id: 2, label: 'Dentifrice', image: "assets/Banque_Images/Brossage_de_dents/toothpaste.png", ordreCible: 2 },
  ];

  constructor(public game: JeuService) {}

  ngOnInit(): void {
  }

  choisirRole(r: 'accueilli' | 'aidant'): void {
    this.game.setRole(r);
    this.phase = 'accueil';
  }

  commencer(): void { this.phase = 'memory'; }
  passerAssoc(): void { this.phase = 'association'; }
  terminer(): void { this.phase = 'fin'; }

  rejouer(): void {
    this.game.reset();
    this.phase = 'accueil';
  }
}