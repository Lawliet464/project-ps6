import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Accueilli } from '../../models/accueilli.model';

@Component({
  selector: 'app-profil-patient',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profil-patient.html',
  styleUrls: ['./profil-patient.css']
})
export class ProfilPatientComponent {
  // L'Input : la porte d'entrée pour recevoir les données du Parent
  @Input() patient!: Accueilli; 
}