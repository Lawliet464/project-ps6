import { Component, OnInit } from '@angular/core';
import { JeuService } from '../../../core/services/jeu-communication.service';
import { ElemAssoc, Cellule } from '../../../core/models/association.model';

@Component({
  selector: 'app-association',
  templateUrl: './association.component.html',
  styleUrls: ['./association.component.scss']
})
export class AssociationComponent implements OnInit {

  elementsDispo: ElemAssoc[] = [];
  elementsHorsTheme: ElemAssoc[] = [];
  cellules: Cellule[] = [];
  selection: ElemAssoc | null = null;
  tentativesParElem: Map<string, number> = new Map();

  message: string = '';
  messageType: 'info' | 'erreur' | 'ordre' | 'theme' | 'mixte' = 'info';

  constructor(public game: JeuService) {}

  ngOnInit(): void {
    this.initialiserJeu();
  }

  initialiserJeu(): void {
    if (!this.game.themeChoisi) return;

    this.elementsDispo = [];
    for (const e of this.game.elemsJeu) {
      this.elementsDispo.push({ elemTheme: e, surbrillance: false });
    }

    this.cellules = [];
    for (const e of this.game.themeChoisi.elementsAssoc) {
      this.cellules.push({
        value: null,
        state: '',
        highlight: false,
        themeIdAttendu: e.themeId
      });
    }

    this.message = "Glissez les images dans l'ordre de l'action.";
    this.messageType = 'info';
  }

  selectItem(elem: ElemAssoc): void { this.selection = elem; }
  dragStart(elem: ElemAssoc): void { this.selection = elem; }

  dragStartDepuisCellule(index: number): void {
    const elem = this.cellules[index].value;
    if (elem) {
      this.selection = elem;
      this.retirer(index);
    }
  }

  drop(index: number): void {
    if (!this.selection) return;

    if (this.cellules[index].value) this.retirer(index);

    this.cellules[index].value = this.selection;

    const nouvellesDispo: ElemAssoc[] = [];
    for (const e of this.elementsDispo) {
      if (
        e.elemTheme.id !== this.selection.elemTheme.id ||
        e.elemTheme.themeId !== this.selection.elemTheme.themeId
      ) {
        nouvellesDispo.push(e);
      }
    }
    this.elementsDispo = nouvellesDispo;

    this.selection = null;
  }

  dropDansZoneDispo(): void {
    if (!this.selection) return;

    let dejaPresent = false;
    for (const e of this.elementsDispo) {
      if (
        e.elemTheme.id === this.selection.elemTheme.id &&
        e.elemTheme.themeId === this.selection.elemTheme.themeId
      ) {
        dejaPresent = true;
        break;
      }
    }

    if (!dejaPresent) {
      this.elementsDispo.push(this.selection);
      this.selection = null;
    }
  }

  clickCell(index: number): void {
    if (this.selection) {
      this.drop(index);
    } else if (this.cellules[index].value) {
      this.retirer(index);
    }
  }

  retirer(index: number): void {
    const elem = this.cellules[index].value;
    if (elem) {
      let estHorsTheme = false;

      for (const e of this.elementsHorsTheme) {
        if (
          e.elemTheme.id === elem.elemTheme.id &&
          e.elemTheme.themeId === elem.elemTheme.themeId
        ) {
          estHorsTheme = true;
          break;
        }
      }

      if (!estHorsTheme) {
        this.elementsDispo.push(elem);
      }

      this.cellules[index].value = null;
      this.cellules[index].state = '';
    }
  }

  get toutesRemplies(): boolean {
    for (const c of this.cellules) {
      if (c.value === null) return false;
    }
    return true;
  }

  verifier(): void {
    let erreurs = 0;

    for (let i = 0; i < this.cellules.length; i++) {
      const cell = this.cellules[i];

      if (this.estCorrect(cell, i)) {
        cell.state = 'correcte';
      } else if (this.estMauvaisTheme(cell)) {
        erreurs += this.gererErreurTheme(cell, i);
      } else {
        erreurs += this.gererErreurOrdre(i);
      }
    }

    this.gererResultat(erreurs);
  }

  private estCorrect(cell: Cellule, index: number): boolean {
    const ordreCible = index + 1;

    return !!(
      cell.value &&
      cell.value.elemTheme.themeId === cell.themeIdAttendu &&
      cell.value.elemTheme.id === ordreCible
    );
  }

  private estMauvaisTheme(cell: Cellule): boolean {
    return !!(
      cell.value &&
      cell.value.elemTheme.themeId !== cell.themeIdAttendu
    );
  }

  private gererErreurTheme(cell: Cellule, index: number): number {
    cell.state = 'incorrecte-theme';

    if (cell.value) {
      this.incrementerTentative(cell.value);
    }

    setTimeout(() => this.retirer(index), 1500);
    return 1;
  }

  private gererErreurOrdre(index: number): number {
    this.cellules[index].state = 'incorrecte-ordre';
    setTimeout(() => this.retirer(index), 1500);
    return 1;
  }

  private gererResultat(erreurs: number): void {
    if (erreurs === 0) {
      this.message = "Bravo ! C'est le bon ordre.";
      this.messageType = 'info';
      setTimeout(() => this.game.terminerEtape(), 2000);
    } else {
      this.message = "Ce n'est pas tout à fait ça, réessayez !";
      this.messageType = 'erreur';
      this.game.incrementErreur();
    }
  }

  private incrementerTentative(elem: ElemAssoc): void {
    const key = elem.elemTheme.id + '-' + elem.elemTheme.themeId;

    let count = this.tentativesParElem.get(key);
    if (!count) count = 0;

    count++;
    this.tentativesParElem.set(key, count);

    if (count >= 4) {
      this.tentativesParElem.delete(key);
      this.deplacerVersHorsTheme(elem);
    }
  }

  private deplacerVersHorsTheme(elem: ElemAssoc): void {
    const nouvellesDispo: ElemAssoc[] = [];

    for (const e of this.elementsDispo) {
      if (
        e.elemTheme.id !== elem.elemTheme.id ||
        e.elemTheme.themeId !== elem.elemTheme.themeId
      ) {
        nouvellesDispo.push(e);
      }
    }

    this.elementsDispo = nouvellesDispo;
    this.elementsHorsTheme.push(elem);
  }

  surbrilliance(): void {
    if (!this.game.themeChoisi) return;

    let prochain: ElemAssoc | null = null;

    for (const e of this.elementsDispo) {
      if (e.elemTheme.themeId === this.game.themeChoisi.id) {
        prochain = e;
        break;
      }
    }

    if (!prochain) return;

    const index = prochain.elemTheme.id - 1;

    if (index < 0 || index >= this.cellules.length) return;

    this.cellules[index].highlight = true;
    prochain.surbrillance = true;

    setTimeout(() => {
      this.cellules[index].highlight = false;
      prochain!.surbrillance = false;
    }, 2000);
  }

  enleverUnElementHorsTheme(): void {
    const resultatCellule = this.trouverPireElementDansCellules();

    if (resultatCellule) {
      this.retirer(resultatCellule.index);
      this.supprimerTentative(resultatCellule.elem);
      this.deplacerVersHorsTheme(resultatCellule.elem);
      return;
    }

    const elemDispo = this.trouverPireElementDansDispo();

    if (elemDispo) {
      this.supprimerTentative(elemDispo);
      this.deplacerVersHorsTheme(elemDispo);
      return;
    }

    this.surbrilliance();
  }

  private trouverPireElementDansCellules(): { elem: ElemAssoc, index: number } | null {
    let maxCount = 0;
    let elemMax: ElemAssoc | null = null;
    let indexMax = -1;

    for (let i = 0; i < this.cellules.length; i++) {
      const cell = this.cellules[i];

      if (
        cell.value &&
        this.game.themeChoisi &&
        cell.value.elemTheme.themeId !== this.game.themeChoisi.id
      ) {
        const count = this.getTentative(cell.value);

        if (!elemMax || count > maxCount) {
          maxCount = count;
          elemMax = cell.value;
          indexMax = i;
        }
      }
    }

    return elemMax ? { elem: elemMax, index: indexMax } : null;
  }

  private trouverPireElementDansDispo(): ElemAssoc | null {
    let maxCount = 0;
    let elemMax: ElemAssoc | null = null;

    for (const e of this.elementsDispo) {
      if (
        this.game.themeChoisi &&
        e.elemTheme.themeId !== this.game.themeChoisi.id
      ) {
        const count = this.getTentative(e);

        if (!elemMax || count > maxCount) {
          maxCount = count;
          elemMax = e;
        }
      }
    }

    return elemMax;
  }

  private getTentative(elem: ElemAssoc): number {
    const key = elem.elemTheme.id + '-' + elem.elemTheme.themeId;
    return this.tentativesParElem.get(key) || 0;
  }

  private supprimerTentative(elem: ElemAssoc): void {
    const key = elem.elemTheme.id + '-' + elem.elemTheme.themeId;
    this.tentativesParElem.delete(key);
  }

  utiliserAide(): void {
    switch (this.game.aideAssociation) {
      case 1:
        this.surbrilliance();
        break;
      case 2:
        this.enleverUnElementHorsTheme();
        break;
    }
  }
}
