import { Component,ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParamLevelComponent } from './level-selector/level-selector';
import { ParamQcmComponent } from './qcm/qcm';
import { ParamSliderComponent } from './slider/slider';
import { ParamPlateauComponent } from './plateau/plateau';
import { ParamCounterComponent } from './counter/counter';

@Component({
  selector: 'app-parametres',
  standalone: true,
  imports: [
    CommonModule,
    ParamLevelComponent,
    ParamQcmComponent,
    ParamSliderComponent,
    ParamPlateauComponent,
    ParamCounterComponent
  ],
  templateUrl: './parametres.html',
  styleUrl: './parametres.css',
  encapsulation: ViewEncapsulation.None
})
export class Parametres {
  
  settings = {
    niveau: 'leger',
    volume: 70,
    fontSize: 16,
    plateau: '4x4',
    tempsRetournement: 1,
    frequenceAide: 8,
    themes: ['Saisons', 'Habillement selon la météo']
  };

  sauvegarder() {
    console.log('Paramètres sauvegardés :', this.settings);
    const toast = document.getElementById('toast');
    toast?.classList.add('visible');
    setTimeout(() => toast?.classList.remove('visible'), 2500);
  }

  updateSetting(key: string, value: any) {
    (this.settings as any)[key] = value;
  }
}
