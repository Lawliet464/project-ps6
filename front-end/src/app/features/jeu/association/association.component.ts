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

  messages: string[] = [];

  constructor(public game: JeuService) {}

  ngOnInit(): void {
    this.initialiserJeu();
  }

  initialiserJeu(): void {
    if (!this.game.themeChoisi) return;

    this.elementsDispo = [];
    for (const e of this.game.elemsJeu) {
      this.ajouterDansDispo({ elemTheme: e, surbrillance: false });
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

    this.messages = ["Glissez les images dans l'ordre de l'action."];
  }

  private estHorsTheme(elem: ElemAssoc): boolean {
    for (const e of this.elementsHorsTheme) {
      if (
        e.elemTheme.id === elem.elemTheme.id &&
        e.elemTheme.themeId === elem.elemTheme.themeId
      ) {
        return true;
      }
    }
    return false;
  }

  selectItem(elem: ElemAssoc): void {
    if (this.estHorsTheme(elem)) return;
    this.selection = elem;
  }

  dragStart(elem: ElemAssoc): void {
    if (this.estHorsTheme(elem)) return;
    this.selection = elem;
  }
  dragStartDepuisCellule(index: number): void {
    const elem = this.cellules[index].value;
    if (elem && !this.estHorsTheme(elem)) {
      this.selection = elem;
      this.retirer(index);
    }
  }

  drop(index: number): void {
    if (!this.selection) return;

    if (this.estHorsTheme(this.selection)) return;

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
      this.ajouterDansDispo(this.selection);
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
        this.ajouterDansDispo(elem);
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

  verifier(): void {
    const nomsTheme: string[] = [];
    const nomsOrdre: string[] = [];

    for (let i = 0; i < this.cellules.length; i++) {
      const cell = this.cellules[i];

      if (this.estCorrect(cell, i)) {
        cell.state = 'correcte';
      } else if (this.estMauvaisTheme(cell)) {
        const nom = this.gererErreurTheme(cell, i);
        nomsTheme.push(nom);
      } else {
        const nom = this.gererErreurOrdre(cell, i);
        nomsOrdre.push(nom);
      }
    }

    this.gererResultat(nomsTheme, nomsOrdre);
  }

  private gererResultat(nomsTheme: string[], nomsOrdre: string[]): void {
    this.messages = [];

    if (nomsTheme.length === 0 && nomsOrdre.length === 0) {
      this.messages.push('Parfait !');
      setTimeout(() => this.game.terminerEtape(), 2000);
    } else {
      for (const nom of nomsTheme) {
        this.messages.push(nom + ' n\'appartient pas à cette association.');
      }
      for (const nom of nomsOrdre) {
        this.messages.push(nom + ' est au bon thème, mais pas à la bonne place.');
      }
      const aide = this.game.incrementErreurAssociation();
      if (aide) this.utiliserAide();
    }
  }

  private gererErreurTheme(cell: Cellule, index: number): string {
    cell.state = 'incorrecte-theme';
    const nom = cell.value?.elemTheme.nom ?? '';
    if (cell.value) this.incrementerTentative(cell.value);
    setTimeout(() => this.retirer(index), 1500);
    return nom;
  }

  private gererErreurOrdre(cell: Cellule, index: number): string {
    cell.state = 'incorrecte-ordre';
    const nom = cell.value?.elemTheme.nom ?? '';
    setTimeout(() => this.retirer(index), 1500);
    return nom;
  }

  private incrementerTentative(elem: ElemAssoc): void {
    const key = elem.elemTheme.id + '-' + elem.elemTheme.themeId;

    let count = this.tentativesParElem.get(key);
    if (!count) count = 0;

    count++;
    this.tentativesParElem.set(key, count);

    if (count >= 3) {
      this.tentativesParElem.delete(key);

      for (let i = 0; i < this.cellules.length; i++) {
        const c = this.cellules[i];
        if (
          c.value &&
          c.value.elemTheme.id === elem.elemTheme.id &&
          c.value.elemTheme.themeId === elem.elemTheme.themeId
        ) {
          this.retirer(i);
          break;
        }
      }
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

  private reorganiserOrdre(): void {
    if (!this.game.themeChoisi) return;

    const elemsEnCellule: ElemAssoc[] = [];
    for (const cell of this.cellules) {
      if (cell.value) {
        elemsEnCellule.push(cell.value);
        cell.value = null;
        cell.state = '';
      }
    }

    for (const elem of elemsEnCellule) {
      if (elem.elemTheme.themeId === this.game.themeChoisi.id) {
        const index = elem.elemTheme.id - 1;
        if (index >= 0 && index < this.cellules.length) {
          this.cellules[index].value = elem;
        }
      } else {
        this.ajouterDansDispo(elem);
      }
    }
  }

  private ajouterDansDispo(elem: ElemAssoc): void {
    const existeDeja = this.elementsDispo.some(e =>
      e.elemTheme.id === elem.elemTheme.id &&
      e.elemTheme.themeId === elem.elemTheme.themeId
    );

    if (!existeDeja) {
      this.elementsDispo.push(elem);
    }
  }

  utiliserAide(): void {
    switch (this.game.aideAssociation) {
      case 1:
        this.surbrilliance();
        break;
      case 2:
        this.reorganiserOrdre();
        break;
    }
  }
}
