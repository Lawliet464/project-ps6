import { Component, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemoryCard } from './memory-card/memory-card';
import { JeuCommunication } from '../comunication-services/jeu-communication';

interface Carte {
  type: string;
  label: string;
  image: string;
  retournee: boolean;
  surbrillance: boolean;
}

@Component({
  selector: 'app-memory-board',
  standalone: true,
  imports: [CommonModule, MemoryCard],
  templateUrl: './memory.html',
  styleUrl: './memory.css'
})
export class Memory {

  @Output() finished = new EventEmitter<void>();

  cartes: Carte[] = [];
  premiere: Carte | null = null;
  deuxieme: Carte | null = null;
  estBloque = false;

  readonly baseCartes = [
    { type: 't-shirt',    label: 'T-shirt',       image: "Banque_Images/Habillement/clker-free-vector-images-t-shirt-294078_1920.png" },
    { type: 'brosse',     label: 'Brosse à dents', image: "Banque_Images/Brossage_de_dents/clker-free-vector-images-toothbrush-311373_1920.png" },
    { type: 'dentifrice', label: 'Dentifrice',     image: "Banque_Images/Brossage_de_dents/clker-free-vector-images-toothpaste-29774_1920.png" },
    { type: 'soleil',     label: 'Ensoleillé',     image: "Banque_Images/Saisons/openclipart-vectors-sun-2026715_1920.png" },
    { type: 'bonnet',     label: 'Bonnet',         image: "Banque_Images/Habillement/ideativas-tlm-wool-hat-6232250_1920.png" },
    { type: 'parapluie',  label: 'Parapluie',      image: "Banque_Images/Habillement/openclipart-vectors-rain-1295189_1920.png" },
  ];

  constructor(private game: JeuCommunication, private cdr: ChangeDetectorRef) {
    this.init();
  }

  init() {
    this.cartes = [...this.baseCartes, ...this.baseCartes]
      .sort(() => Math.random() - 0.5)
      .map(c => ({ ...c, retournee: false, surbrillance: false }));
    this.premiere = null;
    this.deuxieme = null;
    this.estBloque = false;
  }

  clickCarte(carte: Carte) {
    if (this.estBloque || carte.retournee) return;

    carte.retournee = true;
    this.cdr.detectChanges();

    if (!this.premiere) {
      this.premiere = carte;
      return;
    }

    this.deuxieme = carte;
    this.estBloque = true;

    if (this.premiere.type === this.deuxieme.type) {
      this.premiere = null;
      this.deuxieme = null;
      this.estBloque = false;
      this.checkFin();
    } else {
      const aide = this.game.incrementErreur();
      if (aide) this.surbrillanceUnePaire();

      const p = this.premiere;
      const d = this.deuxieme;
      setTimeout(() => {
        p.retournee = false;
        d.retournee = false;
        this.premiere = null;
        this.deuxieme = null;
        this.estBloque = false;
        this.cdr.detectChanges();
      }, this.game.tempsRetournement);
    }
  }

  surbrillanceUnePaire() {
    const nonRetournees = this.cartes.filter(c => !c.retournee);
    for (let i = 0; i < nonRetournees.length; i++) {
      for (let j = i + 1; j < nonRetournees.length; j++) {
        if (nonRetournees[i].type === nonRetournees[j].type) {
          nonRetournees[i].surbrillance = true;
          nonRetournees[j].surbrillance = true;
          this.cdr.detectChanges();
          setTimeout(() => {
            nonRetournees[i].surbrillance = false;
            nonRetournees[j].surbrillance = false;
            this.cdr.detectChanges();
          }, 2000);
          return;
        }
      }
    }
  }

  checkFin() {
    if (this.cartes.every(c => c.retournee)) {
      this.finished.emit();
    }
  }
}
