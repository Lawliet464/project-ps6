import { Routes } from '@angular/router';
import { StatistiquesComponent } from './statistiques/statistiques.component';
import { Parametres } from './parametres/parametres';

export const routes: Routes = [
  { path: 'statistiques', component: StatistiquesComponent},
  { path: 'parametres', component: Parametres},
  { path: '', redirectTo: 'statistiques', pathMatch: 'full' } 
];