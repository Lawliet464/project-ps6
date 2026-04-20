import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'jeu-association-element',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './association-element.html',
  styleUrl: './association-element.css'
})
export class AssociationElement {
  @Input() elem!: any;
  @Input() selected = false;

  @Output() dragStartItem = new EventEmitter<void>();
  @Output() clickItem = new EventEmitter<void>();
}
