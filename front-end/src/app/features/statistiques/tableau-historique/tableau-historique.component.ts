import { Component, Input, OnInit } from '@angular/core';
import { Accueilli } from '../../../core/models/accueilli.model';

@Component({
  selector: 'app-tableau-historique',
  templateUrl: './tableau-historique.component.html',
  styleUrls: ['./tableau-historique.component.scss']
})
export class TableauHistoriqueComponent implements OnInit {
  @Input() patient?: Accueilli;

  constructor() { }

  ngOnInit(): void {
  }
}