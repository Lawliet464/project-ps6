import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ElemAssoc } from '../../../../core/models/association.model';

@Component({
  selector: 'app-association-element',
  templateUrl: './association-element.component.html',
  styleUrls: ['./association-element.component.scss']
})
export class AssociationElementComponent {
  @Input() elem!: ElemAssoc;
  @Input() selected: boolean = false;

  @Output() dragStartItem = new EventEmitter<void>();
  @Output() clickItem = new EventEmitter<void>();

  constructor() {}

  onDragStart(): void {
    this.dragStartItem.emit();
  }

  onClick(): void {
    this.clickItem.emit();
  }
}