import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'jeu-association-zone',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './association-zone.html',
  styleUrl: './association-zone.css'
})
export class AssociationZone {
  @Input() cell!: any;
  @Input() index!: number;

  @Output() dropItem = new EventEmitter<number>();
  @Output() clickCell = new EventEmitter<number>();
  @Output() dragStartCell = new EventEmitter<number>();

  survol = false;

  onDragOver(e: DragEvent) {
    e.preventDefault();
    this.survol = true;
  }

  onDragLeave() {
    this.survol = false;
  }

  onDrop(e: DragEvent) {
    e.preventDefault();
    this.survol = false;
    this.dropItem.emit(this.index);
  }
}
