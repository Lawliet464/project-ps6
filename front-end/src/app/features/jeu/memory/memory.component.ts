import { Component, EventEmitter, Output, OnInit, ChangeDetectorRef } from '@angular/core';
import { JeuService } from '../../../core/services/jeu-communication.service';
import { Carte } from '../../../core/models/memory.model';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.scss']
})
export class MemoryComponent implements OnInit {

  @Output() finished = new EventEmitter<void>();

  cartes: Carte[] = [];
  premiere: Carte | null = null;
  deuxieme: Carte | null = null;
  estBloque = false;

  readonly baseCartes = [
    { type: 't-shirt',    label: 'T-shirt',        image: "assets/images/t-shirt.png" },
    { type: 'brosse',     label: 'Brosse à dents', image: "assets/images/toothbrush.png" },
    { type: 'dentifrice', label: 'Dentifrice',     image: "assets/images/toothpaste.png" },
    { type: 'soleil',     label: 'Ensoleillé',     image: "assets/images/sun.png" },
    { type: 'bonnet',     label: 'Bonnet',         image: "assets/images/hat.png" },
    { type: 'parapluie',  label: 'Parapluie',      image: "assets/images/umbrella.png" },
  ];

  constructor(public game: JeuService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    // 1. On détermine combien de paires on doit prendre selon le plateau (ex: 2x2 = 2 paires)
    const nbPaires = this.nbPairesAMontrer; 

    // 2. On mélange la base de données et on ne garde que le nombre de paires requis
    const selection = [...this.baseCartes]
      .sort(() => Math.random() - 0.5)
      .slice(0, nbPaires);

    // 3. On double la sélection pour créer les paires et on mélange le tout
    this.cartes = [...selection, ...selection]
      .sort(() => Math.random() - 0.5)
      .map(c => ({ ...c, retournee: false, surbrillance: false }));
    
    this.premiere = null;
    this.deuxieme = null;
    this.estBloque = false;
  }

  // 1. Calcul du nombre de paires nécessaire
  get nbPairesAMontrer(): number {
    const [cols, rows] = this.game.configActive.plateau.split('x').map(Number);
    return (cols * rows) / 2;
  }

  // 2. Style dynamique pour la grille de cartes
  get gridMemory() {
    const [cols, rows] = this.game.configActive.plateau.split('x');
    return {
      'display': 'grid',
      'grid-template-columns': `repeat(${cols}, 1fr)`, 
      'gap': '15px',
      'margin': '20px auto',
      'max-width': '600px'
    };
  }

  clickCarte(carte: Carte): void {
    if (this.estBloque || carte.retournee) return;

    carte.retournee = true;
    this.cdr.detectChanges();

    if (!this.premiere) {
      this.premiere = carte;
      return;
    }

    this.deuxieme = carte;
    this.estBloque = true;

    // Vérification de la paire
    if (this.premiere.type === this.deuxieme.type) {
      this.validerPaire();
    } else {
      this.echouerPaire();
    }
  }

  private validerPaire(): void {
    this.premiere = null;
    this.deuxieme = null;
    this.estBloque = false;
    this.checkFin();
  }

  private echouerPaire(): void {
    const aide = this.game.incrementErreur();
    if (aide) this.surbrillanceUnePaire();

    const p = this.premiere!;
    const d = this.deuxieme!;

    setTimeout(() => {
      p.retournee = false;
      d.retournee = false;
      this.premiere = null;
      this.deuxieme = null;
      this.estBloque = false;
      this.cdr.detectChanges();
    }, this.game.configActive.tempsRetenue * 1000); 
  }

  surbrillanceUnePaire(): void {
    const nonRetournees = this.cartes.filter(c => !c.retournee);
    for (let i = 0; i < nonRetournees.length; i++) {
      for (let j = i + 1; j < nonRetournees.length; j++) {
        if (nonRetournees[i].type === nonRetournees[j].type) {
          this.activerSurbrillance(nonRetournees[i], nonRetournees[j]);
          return;
        }
      }
    }
  }

  private activerSurbrillance(c1: Carte, c2: Carte): void {
    c1.surbrillance = true;
    c2.surbrillance = true;
    this.cdr.detectChanges();
    setTimeout(() => {
      c1.surbrillance = false;
      c2.surbrillance = false;
      this.cdr.detectChanges();
    }, 2000);
  }

  checkFin(): void {
    if (this.cartes.every(c => c.retournee)) {
      setTimeout(() => this.finished.emit(), 1000);
    }
  }
}