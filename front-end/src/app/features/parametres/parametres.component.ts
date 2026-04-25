import { Component, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.component.html',
  styleUrls: ['./parametres.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ParametresComponent implements OnInit {
  
  settings = {
    niveau: 'leger',
    volume: 70,
    fontSize: 16,
    plateau: '4x4',
    tempsRetournement: 1,
    frequenceAide: 8,
    themes: ['Saisons', 'Habillement selon la météo']
  };

  constructor() { }

  ngOnInit(): void {
    // Initialisation globale des paramètres si nécessaire
  }

  sauvegarder(): void {
    console.log('Paramètres sauvegardés :', this.settings);
    const toast = document.getElementById('toast');
    toast?.classList.add('visible');
    setTimeout(() => toast?.classList.remove('visible'), 2500);
  }

  updateSetting(key: string, value: any): void {
    (this.settings as any)[key] = value;
  }
}