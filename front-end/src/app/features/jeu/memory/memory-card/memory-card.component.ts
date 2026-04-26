import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Carte } from '../../../../core/models/memory.model';

@Component({
  selector: 'app-memory-card',
  templateUrl: './memory-card.component.html',
  styleUrls: ['./memory-card.component.scss']
})
export class MemoryCardComponent {
  @Input() carte!: Carte;
  @Input() bloquee: boolean = false;

  @Output() cardClick = new EventEmitter<void>();

  constructor() {}

  onClick(): void {
    if (!this.carte.retournee && !this.bloquee) {
      this.cardClick.emit();
    }
  }
}