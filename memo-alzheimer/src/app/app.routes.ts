import { Routes } from '@angular/router';
import { StatistiquesComponent } from './statistiques/statistiques.component';

export const routes: Routes = [
  { path: 'statistiques', component: StatistiquesComponent },
  { path: '', redirectTo: '/statistiques', pathMatch: 'full' } // Redirection auto au démarrage
];