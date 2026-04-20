import { Component, EventEmitter, Output, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssociationElement } from './association-element/association-element';
import { AssociationZone } from './association-zone/association-zone';
import { AssociationMessage } from './association-message/association-message';
import { JeuCommunication } from '../comunication-services/jeu-communication';

interface ElemAssoc {
  id: number | null;
  label: string;
  image: string;
  surbrillance?: boolean;
}

interface Cellule {
  value: ElemAssoc | null;
  state: '' | 'correcte' | 'incorrecte-ordre' | 'incorrecte-theme';
  highlight?: boolean;
}

@Component({
  selector: 'app-assoc-board',
  standalone: true,
  imports: [CommonModule, AssociationElement, AssociationZone, AssociationMessage],
  templateUrl: './association.html',
  styleUrl: './association.css'
})
export class Association implements OnInit {

  @Output() finished = new EventEmitter<void>();

  // ─── DATA (les éléments avec id sont du bon thème, les autres sont des intrus)
  elementsDispo: ElemAssoc[] = [
    { id: 1, label: 'Brosse à dents', image: "Banque_Images/Brossage_de_dents/clker-free-vector-images-toothbrush-311373_1920.png" },
    { id: 2, label: 'Dentifrice',     image: "Banque_Images/Brossage_de_dents/clker-free-vector-images-toothpaste-29774_1920.png" },
    { id: null, label: 'T-shirt',     image: "Banque_Images/Habillement/clker-free-vector-images-t-shirt-294078_1920.png" },
    { id: null, label: 'Bonnet',      image: "Banque_Images/Habillement/ideativas-tlm-wool-hat-6232250_1920.png" },
    { id: null, label: 'Parapluie',   image: "Banque_Images/Habillement/openclipart-vectors-rain-1295189_1920.png" },
    { id: null, label: 'Ensoleillé',  image: "Banque_Images/Saisons/openclipart-vectors-sun-2026715_1920.png" },
  ];

  cellules: Cellule[] = [];
  selection: ElemAssoc | null = null;
  objetGlisse: ElemAssoc | null = null;

  message = '';
  messageType: 'info' | 'erreur' | 'ordre' | 'theme' | 'mixte' = 'info';
  private messageTimer: any = null;

  // Nombre de cases = nombre d'éléments avec id
  get nbCases(): number {
    return this.elementsDispo.filter(e => e.id !== null).length +
      this.cellules.filter(c => c.value?.id !== null && c.value !== null).length;
  }

  get toutesRemplies(): boolean {
    return this.cellules.length > 0 && this.cellules.every(c => c.value !== null);
  }

  constructor(private game: JeuCommunication, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    const nbAvecId = this.elementsDispo.filter(e => e.id !== null).length;
    this.cellules = Array(nbAvecId).fill(null).map(() => ({
      value: null,
      state: '' as const,
      highlight: false
    }));
  }

  // ─── CLIC FALLBACK ───────────────────────────────────────────────────────────
  selectItem(elem: ElemAssoc) {
    if (this.selection === elem) {
      this.selection = null;
    } else {
      this.selection = elem;
    }
  }

  clickCell(index: number) {
    // Si on clique sur une case déjà remplie → retirer l'élément
    if (this.cellules[index].value && !this.selection) {
      this.retirer(index);
      return;
    }


    if (!this.selection) return;

    // Si la case est occupée, on remet l'ancien élément dans dispo avant de déposer
    if (this.cellules[index].value) {
      this.retirer(index);
    }

    this.deposer(index, this.selection);
    this.selection = null;
    this.cellules = [...this.cellules];
  }

  // ─── DRAG & DROP ─────────────────────────────────────────────────────────────
  dragStart(elem: ElemAssoc) {
    this.objetGlisse = elem;
  }

  indexSource: number | null = null;

  dragStartDepuisCellule(event: any, index: number) {
    this.indexSource = index;
    this.objetGlisse = this.cellules[index].value;
  }

  drop(index: number) {
    if (!this.objetGlisse) return;

    // Vient d'une cellule → échanger ou déplacer
    if (this.indexSource !== null) {
      const ancienneValeur = this.cellules[index].value;
      this.cellules[index] = { value: this.objetGlisse, state: '', highlight: false };

      if (ancienneValeur) {
        // Échanger avec l'ancienne cellule
        this.cellules[this.indexSource] = { value: ancienneValeur, state: '', highlight: false };
      } else {
        // Vider la cellule source
        this.cellules[this.indexSource] = { value: null, state: '', highlight: false };
      }
      this.indexSource = null;
    } else {
      // Vient de la zone dispo
      if (this.cellules[index].value) {
        const ancien = this.cellules[index].value!;
        this.cellules[index] = { value: this.objetGlisse, state: '', highlight: false };
        this.elementsDispo = this.elementsDispo.filter(e => e !== this.objetGlisse);
        this.elementsDispo = [...this.elementsDispo, ancien];
      } else {
        this.deposer(index, this.objetGlisse);
      }
    }

    this.objetGlisse = null;
    this.cellules = [...this.cellules];
    this.cdr.detectChanges();
  }

  deposer(index: number, elem: ElemAssoc) {
    this.cellules[index] = { value: elem, state: '', highlight: false };
    this.elementsDispo = this.elementsDispo.filter(e => e !== elem);
    this.cdr.detectChanges();
  }

  retirer(index: number) {
    const elem = this.cellules[index].value;
    if (!elem) return;
    this.elementsDispo = [...this.elementsDispo, elem];
    this.cellules[index] = { value: null, state: '', highlight: false };
    this.cdr.detectChanges();
  }

  dropDansZoneDispo() {
    if (!this.objetGlisse) return;

    // Si vient d'une cellule → retirer
    if (this.indexSource !== null) {
      this.retirer(this.indexSource);
      this.indexSource = null;
    }

    this.objetGlisse = null;
    this.cdr.detectChanges();
  }


// ─── VÉRIFICATION ─────────────────────────────────────────────────────────────
  verifier() {
    let toutCorrect = true;
    const messages: string[] = [];

    this.cellules.forEach((cell, i) => {
      const elem = cell.value!;
      const attendu = i + 1;

      if (elem.id === attendu) {
        cell.state = 'correcte';
      } else {
        toutCorrect = false;

        if (elem.id === null) {
          cell.state = 'incorrecte-theme';
          messages.push(`🚫 "${elem.label}" n'appartient pas à ce thème`);
        } else {
          cell.state = 'incorrecte-ordre';
          messages.push(`🔀 "${elem.label}" est dans le bon thème mais pas au bon endroit`);
        }

        const aide = this.game.incrementErreur();
        if (aide) this.donnerIndice();

        setTimeout(() => {
          this.retirer(i);
        }, 1200);
      }
    });

    if (toutCorrect) {
      this.finished.emit();
    } else {
      const hasTheme = messages.some(m => m.includes("n'appartient pas"));
      const hasOrdre = messages.some(m => m.includes("bon endroit"));
      const type = hasTheme && hasOrdre ? 'mixte' : hasTheme ? 'theme' : 'ordre';

      if (this.game.role === 'aidant') {
        this.showMessage(messages.join('<br>'), type);
      } else {
        this.showMessage("Pas tout à fait... Essaie encore !", type);
      }
    }
    this.cdr.detectChanges();
  }

  // ─── MESSAGE ──────────────────────────────────────────────────────────────────
  showMessage(text: string, type: any) {
    if (this.messageTimer) {
      clearTimeout(this.messageTimer);
    }
    this.message = text;
    this.messageType = type;
    this.cdr.detectChanges();
    this.messageTimer = setTimeout(() => {
      this.message = '';
      this.messageTimer = null;
    }, 4000);
  }

  // ─── AIDE INTELLIGENTE ────────────────────────────────────────────────────────
  donnerIndice() {
    const prochain = this.elementsDispo.find(e => e.id !== null);
    if (!prochain) return;

    const index = (prochain.id as number) - 1;
    if (index < 0 || index >= this.cellules.length) return;

    this.cellules[index].highlight = true;
    prochain.surbrillance = true;

    this.cdr.detectChanges();

    setTimeout(() => {
      this.cellules[index].highlight = false;
      prochain.surbrillance = false;
      this.cdr.detectChanges();
    }, 2500);
  }
}
