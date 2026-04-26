import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { ElemTheme } from '../../../core/models/theme.model';
import { JeuService } from '../../../core/services/jeu-communication.service';

@Component({
  selector: 'app-fin-jeu',
  templateUrl: './fin-jeu.component.html',
  styleUrls: ['./fin-jeu.component.scss']
})
export class FinJeuComponent implements OnInit {
  @Output() rejouer = new EventEmitter<void>();

  sequenceTriee: ElemTheme[] = [];

  constructor(public game: JeuService) { }

  ngOnInit(): void {
    this.sequenceTriee = [];
    if (this.game.themeChoisi) {
      for (const e of this.game.themeChoisi!.elementsAssoc) {
        this.sequenceTriee.push(e);
      }
      this.sequenceTriee.sort((a, b) => a.id - b.id);
    }
  }

  onRejouer(): void {
    this.rejouer.emit();
  }
}
