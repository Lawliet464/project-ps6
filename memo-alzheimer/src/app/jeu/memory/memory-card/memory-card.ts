import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-memory-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './memory-card.html',
  styleUrl: './memory-card.css'
})
export class MemoryCard {
  @Input() image!: string;
  @Input() label!: string;
  @Input() type!: string;
  @Input() retournee = false;
  @Input() surbrillance = false;
  @Input() bloquee = false;

  @Output() cardClick = new EventEmitter<void>();

  onClick() {
    if (!this.retournee && !this.bloquee) {
      this.cardClick.emit();
    }
  }
}
