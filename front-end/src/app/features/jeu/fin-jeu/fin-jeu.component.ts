import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ElemAssoc } from '../../../core/models/association.model'; 

@Component({
  selector: 'app-fin-jeu',
  templateUrl: './fin-jeu.component.html',
  styleUrls: ['./fin-jeu.component.scss']
})
export class FinJeuComponent implements OnInit {
  @Input() sequence: ElemAssoc[] = [];
  @Output() rejouer = new EventEmitter<void>();

  sequenceTriee: ElemAssoc[] = [];

  constructor() { }

  ngOnInit(): void {
    this.sequenceTriee = [...this.sequence]
      .filter(e => e.id !== null)
      .sort((a, b) => (a.id as number) - (b.id as number));
  }

  onRejouer(): void {
    this.rejouer.emit();
  }
}