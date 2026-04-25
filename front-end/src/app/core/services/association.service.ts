import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AssociationService {
  private messageSubject = new BehaviorSubject<{text: string, type: string} | null>(null);
  public message$ = this.messageSubject.asObservable();

  verifierPlacement(carte: any, emplacement: any) {
    if (carte.theme !== emplacement.theme) {
      this.envoyerMessage("Attention, ce n'est pas le bon thème !", 'theme');
    } else if (carte.ordre !== emplacement.ordre) {
      this.envoyerMessage("C'est le bon thème, mais pas la bonne place.", 'ordre');
    } else {
      this.envoyerMessage("Parfait !", 'info');
    }
  }

  private envoyerMessage(txt: string, type: any) {
    this.messageSubject.next({ text: txt, type: type });
    setTimeout(() => this.messageSubject.next(null), 3000);
  }
}