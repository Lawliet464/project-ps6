import { Component, ChangeDetectorRef } from '@angular/core';
import { JeuService } from '../../../core/services/jeu-communication.service';
import { Carte } from '../../../core/models/memory.model';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.scss']
})
export class MemoryComponent {

  cartes: Carte[] = [];
  premiere: Carte | null = null;
  deuxieme: Carte | null = null;
  estBloque = false;

  constructor(public game: JeuService, private cdr: ChangeDetectorRef) {
    const toutesCartes: Carte[] = [];
    for (const e of this.game.elemsJeu) {
      toutesCartes.push({ elemTheme: e, retournee: false, surbrillance: false });
    }
    for (const e of this.game.elemsJeu) {
      toutesCartes.push({ elemTheme: e, retournee: false, surbrillance: false });
    }
    toutesCartes.sort(() => Math.random() - 0.5);
    this.cartes = toutesCartes;
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

    if (
      this.premiere.elemTheme.id === this.deuxieme.elemTheme.id &&
      this.premiere.elemTheme.themeId === this.deuxieme.elemTheme.themeId
    ) {
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
    if (aide) this.surbrilliancePaire();

    const p = this.premiere!;
    const d = this.deuxieme!;

    setTimeout(() => {
      p.retournee = false;
      d.retournee = false;
      this.premiere = null;
      this.deuxieme = null;
      this.estBloque = false;
      this.cdr.detectChanges();
    }, this.game.tempsRetournement);
  }

  private trouverPaire(carte: Carte): Carte | null {
    for (const c of this.cartes) {
      if (!c.retournee &&
        c.elemTheme.id === carte.elemTheme.id &&
        c.elemTheme.themeId === carte.elemTheme.themeId &&
        c !== carte) {
        return c;
      }
    }
    return null;
  }

  surbrillanceUnePaireAleatoire(): void {
    const nonRetournees: Carte[] = [];
    for (const c of this.cartes) {
      if (!c.retournee) nonRetournees.push(c);
    }
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
    this.estBloque=true;
    this.cdr.detectChanges();
    setTimeout(() => {
      c1.surbrillance = false;
      c2.surbrillance = false;
      this.estBloque=false;
      this.cdr.detectChanges();
    }, 2000);
  }

  retournerToutesCartes(): void {
    const cartesARecacher: Carte[] = [];
    for (const c of this.cartes) {
      if (!c.retournee) {
        c.retournee = true;
        cartesARecacher.push(c);
      }
    }
    this.estBloque = true;
    this.premiere=null;
    this.deuxieme=null;
    this.cdr.detectChanges();
    setTimeout(() => {
      for (const c of cartesARecacher) c.retournee = false;
      this.estBloque = false;
      this.cdr.detectChanges();
    }, 3000);
  }

  retournerDefinitivementPaires(): void {
    const nonRetournees: Carte[] = [];
    for (const c of this.cartes) {
      if (!c.retournee) nonRetournees.push(c);
    }
    const nbPaires = Math.max(1, Math.floor(nonRetournees.length / 6));
    let pairesRetournees = 0;

    for (const c of nonRetournees) {
      if (pairesRetournees >= nbPaires) break;
      const paire = this.trouverPaire(c);
      if (paire) {
        c.retournee = true;
        paire.retournee = true;
        pairesRetournees++;
      }
    }
    this.cdr.detectChanges();
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
    for (const c of this.cartes) {
      if (!c.retournee) return;
    }
    setTimeout(() => this.game.terminerEtape(), 1000);
  }
}
