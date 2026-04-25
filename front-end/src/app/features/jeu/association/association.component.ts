import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { JeuService } from '../../../core/services/jeu-communication.service';
import { ElemAssoc, Cellule } from '../../../core/models/association.model';

@Component({
  selector: 'app-association',
  templateUrl: './association.component.html',
  styleUrls: ['./association.component.scss']
})
export class AssociationComponent implements OnInit {
  
  // Données du jeu
  elementsDispo: ElemAssoc[] = [];
  cellules: Cellule[] = [];
  selection: ElemAssoc | null = null;

  // État de l'interface - Corrigé pour correspondre au composant message
  message: string = '';
  messageType: 'info' | 'erreur' | 'ordre' | 'theme' | 'mixte' = 'info';

  readonly baseElements: ElemAssoc[] = [
    { id: 1, label: 'Mettre du dentifrice', image: 'assets/Banque_Images/Brossage_de_dents/clker-free-vector-images-toothpaste-29774_1920.png', ordreCible: 1 },
    { id: 2, label: 'Brosser les dents', image: 'assets/Banque_Images/Brossage_de_dents/clker-free-vector-images-toothbrush-311373_1920.png', ordreCible: 2 },
    { id: 3, label: 'Se rincer la bouche', image: 'assets/Banque_Images/Brossage_de_dents/rinse.png', ordreCible: 3 }
  ];

  constructor(
    public game: JeuService, 
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initialiserJeu();
  }

  initialiserJeu(): void {
    this.elementsDispo = [...this.baseElements].sort(() => Math.random() - 0.5);
    
    this.cellules = Array(3).fill(null).map(() => ({
      value: null,
      state: '',
      highlight: false
    }));
    
    this.message = "Glissez les images dans l'ordre de l'action.";
    this.messageType = 'info';
  }

  // --- GESTION DES ÉVÉNEMENTS ---

  selectItem(elem: ElemAssoc): void {
    this.selection = elem;
  }

  dragStart(elem: ElemAssoc): void {
    this.selection = elem;
  }

  dragStartDepuisCellule(event: any, index: number): void {
    const elem = this.cellules[index].value;
    if (elem) {
      this.selection = elem;
      this.retirer(index);
    }
  }

  drop(index: number): void {
    if (!this.selection) return;

    if (this.cellules[index].value) {
      this.retirer(index);
    }

    this.cellules[index].value = this.selection;
    this.elementsDispo = this.elementsDispo.filter(e => e.id !== this.selection?.id);
    this.selection = null;
    this.cdr.detectChanges();
  }

  dropDansZoneDispo(): void {
    if (this.selection && !this.elementsDispo.find(e => e.id === this.selection?.id)) {
      this.elementsDispo.push(this.selection);
      this.selection = null;
      this.cdr.detectChanges();
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
      this.elementsDispo.push(elem);
      this.cellules[index] = { value: null, state: '', highlight: false };
      this.cdr.detectChanges();
    }
  }

  // --- LOGIQUE MÉTIER ---

  get toutesRemplies(): boolean {
    return this.cellules.every(c => c.value !== null);
  }

  verifier(): void {
    let erreurs = 0;
    this.cellules.forEach((cell, index) => {
      const ordreAttendu = index + 1;
      if (cell.value && cell.value.ordreCible === ordreAttendu) {
        cell.state = 'correcte';
      } else {
        cell.state = 'incorrecte-ordre';
        erreurs++;
        setTimeout(() => this.retirer(index), 1500);
      }
    });

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

  donnerIndice(): void {
    const indexVide = this.cellules.findIndex(c => c.value === null);
    if (indexVide !== -1) {
      this.cellules[indexVide].highlight = true;
      this.cdr.detectChanges();
      setTimeout(() => {
        this.cellules[indexVide].highlight = false;
        this.cdr.detectChanges();
      }, 2000);
    }
  }
}