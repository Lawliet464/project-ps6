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

    this.message = "Glissez les images dans l'ordre de l'action.";
    this.messageType = 'info';
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
      const aide = this.game.incrementErreurAssociation();
      if (aide) this.utiliserAide();
    }
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

    const temp: (ElemAssoc | null)[] = new Array(this.cellules.length).fill(null);

    for (const cell of this.cellules) {
      if (!cell.value) continue;

      const id = cell.value.elemTheme.id - 1;

      if (id >= 0 && id < temp.length) {
        temp[id] = cell.value;
      }
    }

    for (let i = 0; i < this.cellules.length; i++) {
      const current = this.cellules[i].value;
      const correct = temp[i];

      if (correct) {
        this.cellules[i].value = correct;

        if (current && current !== correct) {
          let exists = false;

          for (const e of this.elementsDispo) {
            if (
              e.elemTheme.id === current.elemTheme.id &&
              e.elemTheme.themeId === current.elemTheme.themeId
            ) {
              exists = true;
              break;
            }
          }

          if (!exists) {
            this.ajouterDansDispo(current);
          }
        }
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
