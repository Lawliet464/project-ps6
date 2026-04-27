import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { THEMES } from '../../mocks/themes.mock';
import { Theme, ElemTheme } from '../../core/models/theme.model';

interface ElemLocal {
  id: number;
  mot: string;
  image: string;
  audio: string;
  ordre: number | null;
  valide: boolean;
  messageErreur?: string;
}

@Component({
  selector: 'app-creation-theme',
  templateUrl: './creation-theme.component.html',
  styleUrls: ['./creation-theme.component.scss']
})
export class CreationThemeComponent {

  nomTheme: string = '';
  elements: ElemLocal[] = [];
  message: string = '';
  messageType: 'erreur' | 'success' = 'erreur';

  constructor(private router: Router) {}

  ajouterElement(): void {
    this.elements.push({
      id: Date.now(),
      mot: '',
      image: '',
      audio: '',
      ordre: null,
      valide: false
    });
  }

  supprimerElement(id: number): void {
    this.elements = this.elements.filter(e => e.id !== id);
  }

  onImageChange(id: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      const el = this.elements.find(e => e.id === id);
      if (el) el.image = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  onAudioChange(id: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      const el = this.elements.find(e => e.id === id);
      if (el) el.audio = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  validerElement(id: number): void {
    const el = this.elements.find(e => e.id === id);
    if (!el) return;

    el.messageErreur = '';

    if (!el.mot) { el.messageErreur = 'Ajoutez une description'; return; }
    if (!el.image) { el.messageErreur = 'Ajoutez une image'; return; }
    if (!el.ordre || el.ordre < 1) { el.messageErreur = "L'ordre doit être ≥ 1"; return; }

    const dejaPris = this.elements.find(e => e.id !== id && e.ordre === el.ordre);
    if (dejaPris) { el.messageErreur = 'Cet ordre est déjà utilisé'; return; }

    el.valide = true;
  }

  modifierElement(id: number): void {
    const el = this.elements.find(e => e.id === id);
    if (el) el.valide = false;
  }

  sauvegarderTheme(): void {
    this.message = '';

    if (!this.nomTheme.trim()) {
      this.message = 'Veuillez saisir un nom pour le thème';
      this.messageType = 'erreur';
      return;
    }

    const valides = this.elements.filter(e => e.valide);

    if (valides.length < 2) {
      this.message = 'Ajoutez au moins 2 éléments valides';
      this.messageType = 'erreur';
      return;
    }

    const ordres = valides.map(e => e.ordre as number).sort((a, b) => a - b);
    for (let i = 0; i < ordres.length; i++) {
      if (ordres[i] !== i + 1) {
        this.message = 'Les ordres doivent être consécutifs à partir de 1';
        this.messageType = 'erreur';
        return;
      }
    }

    const themeId = 'theme_' + Date.now();
    const elementsAssoc: ElemTheme[] = valides.map(e => ({
      id: e.ordre as number,
      nom: e.mot,
      image: e.image,
      audio: e.audio || undefined,
      themeId: themeId
    }));

    const nouveauTheme: Theme = {
      id: themeId,
      nom: this.nomTheme.trim(),
      elementsAssoc
    };

    THEMES.push(nouveauTheme);

    this.message = 'Thème enregistré !';
    this.messageType = 'success';
  }

  retour(): void {
    this.router.navigate(['/accueil']);
  }
}
