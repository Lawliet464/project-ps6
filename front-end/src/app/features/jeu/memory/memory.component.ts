import { Component, OnInit } from '@angular/core';
import { JeuService } from '../../../core/services/jeu-communication.service';
import { Carte } from '../../../core/models/memory.model';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.scss']
})
export class MemoryComponent implements OnInit {

  cartes: Carte[] = [];
  premiere: Carte | null = null;
  deuxieme: Carte | null = null;
  estBloque = false;

  constructor(public game: JeuService) {}

  ngOnInit(): void {
    this.initCartes();
  }

  private initCartes(): void {
    const toutesCartes: Carte[] = [];

    for (const e of this.game.elemsJeu) {
      toutesCartes.push({ elemTheme: e, retournee: false, surbrillance: false });
    }

    for (const e of this.game.elemsJeu) {
      toutesCartes.push({ elemTheme: e, retournee: false, surbrillance: false });
    }

    this.cartes = toutesCartes.sort(() => Math.random() - 0.5);
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

    if (!this.premiere) {
      this.premiere = carte;
      return;
    }

    this.deuxieme = carte;
    this.estBloque = true;

    const p1 = this.premiere;
    const p2 = this.deuxieme;

    if (!p1 || !p2) return;

    if (this.estPaire(p1, p2)) {
      this.validerPaire();
    } else {
      this.echouerPaire(p1, p2);
    }
  }

  private estPaire(c1: Carte, c2: Carte): boolean {
    return (
      c1.elemTheme.id === c2.elemTheme.id &&
      c1.elemTheme.themeId === c2.elemTheme.themeId
    );
  }

  private validerPaire(): void {
    this.premiere = null;
    this.deuxieme = null;
    this.estBloque = false;
    this.checkFin();
  }

  private echouerPaire(p1: Carte, p2: Carte): void {
    this.estBloque = true;

    const aide = this.game.incrementErreurMemory();

    setTimeout(() => {
      p1.retournee = false;
      p2.retournee = false;

      this.premiere = null;
      this.deuxieme = null;
      this.estBloque = false;

      if (aide) this.utiliserAide();
    }, this.game.temps);
  }

  private trouverPaire(carte: Carte): Carte | null {
    for (const c of this.cartes) {
      if (
        !c.retournee &&
        c.elemTheme.id === carte.elemTheme.id &&
        c.elemTheme.themeId === carte.elemTheme.themeId &&
        c !== carte
      ) {
        return c;
      }
    }
    return null;
  }

  surbrillanceUnePaireAleatoire(): void {
    const nonRetournees = this.cartes.filter(c => !c.retournee);

    for (const c of nonRetournees) {
      const paire = this.trouverPaire(c);
      if (paire) {
        this.activerSurbrillance(c, paire);
        return;
      }
    }
  }

  surbrilliancePaireChoisie(c: Carte): void {
    const paire = this.trouverPaire(c);
    if (paire) this.activerSurbrillance(c, paire);
  }

  surbrilliancePaire(): void {
    if (this.premiere) {
      this.surbrilliancePaireChoisie(this.premiere);
    } else {
      this.surbrillanceUnePaireAleatoire();
    }
  }

  private activerSurbrillance(c1: Carte, c2: Carte): void {
    c1.surbrillance = true;
    c2.surbrillance = true;
    this.estBloque = true;

    setTimeout(() => {
      c1.surbrillance = false;
      c2.surbrillance = false;
      this.estBloque = false;
    }, 2000);
  }

  retournerToutesCartes(): void {
    const premiereConservee = this.premiere;

    const cachees: Carte[] = [];
    for (const c of this.cartes) {
      if (!c.retournee) {
        c.retournee = true;
        cachees.push(c);
      }
    }

    this.estBloque = true;
    this.premiere = null;
    this.deuxieme = null;

    setTimeout(() => {
      for (const c of cachees) {
        c.retournee = false;
      }
      this.estBloque = false;
      this.premiere = premiereConservee;
    }, this.game.temps);
  }

  retournerDefinitivementPaires(): void {
    const nonRetournees = this.cartes.filter(c => !c.retournee);

    const nbPaires = Math.max(1, Math.floor(nonRetournees.length / 6));
    let count = 0;

    for (const c of nonRetournees) {
      if (count >= nbPaires) break;

      const paire = this.trouverPaire(c);
      if (paire) {
        c.retournee = true;
        paire.retournee = true;
        count++;
      }
    }

    this.checkFin();
  }

  utiliserAide(): void {
    switch (this.game.aideMemorisation) {
      case 1:
        this.retournerDefinitivementPaires();
        break;
      case 2:
        this.retournerToutesCartes();
        break;
      case 3:
        this.surbrilliancePaire();
        break;
    }
  }

  checkFin(): void {
    if (this.cartes.some(c => !c.retournee)) return;

    setTimeout(() => this.game.terminerEtape(), this.game.temps);
  }
}
