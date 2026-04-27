import { Component } from '@angular/core';
import { JeuService } from '../../core/services/jeu-communication.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-jeu',
  templateUrl: './jeu.component.html',
  styleUrls: ['./jeu.component.scss']
})
export class JeuComponent {
  phase: 'role' | 'accueil' | 'memory' | 'association' | 'fin' = 'role';

  constructor(public game: JeuService, private router: Router) {
    this.game.configurerDepuisConfig();

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
