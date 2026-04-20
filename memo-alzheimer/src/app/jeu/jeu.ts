import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Memory } from './memory/memory';
import { Association } from './association/association';
import { FinJeu } from './fin-jeu/fin-jeu';
import { JeuCommunication } from './comunication-services/jeu-communication';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, Memory, Association, FinJeu],
  templateUrl: './jeu.html',
  styleUrl: './jeu.css'
})
export class Jeu {
  phase: 'role' | 'accueil' | 'memory' | 'assoc' | 'fin' = 'role';

  readonly sequenceFinale = [
    { id: 1, label: 'Brosse à dents', image: "Banque_Images/Brossage_de_dents/clker-free-vector-images-toothbrush-311373_1920.png" },
    { id: 2, label: 'Dentifrice',     image: "Banque_Images/Brossage_de_dents/clker-free-vector-images-toothpaste-29774_1920.png" },
  ];

  constructor(private game: JeuCommunication) {}

  choisirRole(r: 'accueilli' | 'aidant') {
    this.game.setRole(r);
    this.phase = 'accueil';
  }

  commencer() { this.phase = 'memory'; }
  passerAssoc() { this.phase = 'assoc'; }
  terminer() { this.phase = 'fin'; }

  rejouer() {
    this.game.reset();
    this.phase = 'accueil';
  }
}
