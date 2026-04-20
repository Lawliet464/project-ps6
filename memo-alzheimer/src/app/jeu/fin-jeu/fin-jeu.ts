import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ElemAssoc {
  id: number | null;
  label: string;
  image: string;
}

@Component({
  selector: 'app-recap-fin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fin-jeu.html',
  styleUrl: './fin-jeu.css'
})
export class FinJeu implements OnInit {
  @Input() sequence: ElemAssoc[] = [];
  @Output() rejouer = new EventEmitter<void>();

  sequenceTriee: ElemAssoc[] = [];

  ngOnInit() {
    this.sequenceTriee = [...this.sequence]
      .filter(e => e.id !== null)
      .sort((a, b) => (a.id as number) - (b.id as number));
  }
}
