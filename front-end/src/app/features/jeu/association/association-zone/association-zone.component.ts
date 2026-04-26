import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Cellule } from '../../../../core/models/association.model';

@Component({
  selector: 'app-association-zone',
  templateUrl: './association-zone.component.html',
  styleUrls: ['./association-zone.component.scss']
})
export class AssociationZoneComponent {
  @Input() cell!: Cellule;
  @Input() index!: number;

  @Output() dropItem = new EventEmitter<number>();
  @Output() clickCell = new EventEmitter<number>();
  @Output() dragStartCell = new EventEmitter<number>();

  survol = false;

  constructor() {}

  onDragOver(e: DragEvent): void {
    e.preventDefault();
    this.survol = true;
  }

  onDragLeave(): void {
    this.survol = false;
  }

  onDrop(e: DragEvent): void {
    e.preventDefault();
    this.survol = false;
    this.dropItem.emit(this.index);
  }

  onDragStart(e: DragEvent): void {
    this.dragStartCell.emit(this.index);
  }

  onClick(): void {
    this.clickCell.emit(this.index);
  }
}