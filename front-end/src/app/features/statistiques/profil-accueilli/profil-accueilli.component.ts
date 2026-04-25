import { Component, Input, OnInit } from '@angular/core';
import { Accueilli } from '../../../core/models/accueilli.model';

@Component({
  selector: 'app-profil-accueilli',
  templateUrl: './profil-accueilli.component.html',
  styleUrls: ['./profil-accueilli.component.scss'] 
})
export class ProfilAccueilliComponent implements OnInit {
  @Input() accueilli!: Accueilli; 

  constructor() { }

  ngOnInit(): void {
    if (!this.accueilli) {
      console.warn("ProfilaccueilliComponent: Aucune donnée accueilli reçue.");
    }
  }
}