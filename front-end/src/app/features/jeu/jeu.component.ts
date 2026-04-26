import { Component } from '@angular/core';
import { JeuService } from '../../core/services/jeu-communication.service';
import { THEMES } from '../../mocks/themes.mock';
import { Router } from '@angular/router';



@Component({
  selector: 'app-jeu',
  templateUrl: './jeu.component.html',
  styleUrls: ['./jeu.component.scss']
})
export class JeuComponent {
  phase: 'role' | 'accueil' | 'memory' | 'association' | 'fin' = 'role';

  constructor(public game: JeuService, private router: Router) {
    // A faire : à remplacer par le service parametres quand il sera créé
    this.game.configurerJeu(8, 1, 6, THEMES[0], 1 , 2);

    this.game.finEtape$.subscribe(() => {
      if (this.phase === 'memory') this.phase = 'association';
      else if (this.phase === 'association') this.phase = 'fin';
    });
  }

  choisirRole(r: 'accueilli' | 'aidant'): void { this.game.setRole(r); this.phase = 'accueil'; }
  commencer(): void { this.phase = 'memory'; }
  rejouer(): void { this.game.reset(); this.phase = 'accueil'; }
  
retour(): void {
  this.router.navigate(['/accueil']);
}
}
