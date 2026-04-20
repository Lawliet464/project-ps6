import { Routes } from '@angular/router';
import { StatistiquesComponent } from './statistiques/statistiques.component';
import { Parametres } from './parametres/parametres';
import {Auth} from './features/auth/auth'

export const routes: Routes = [
  { path: 'statistiques', component: StatistiquesComponent},
  { path: 'parametres', component: Parametres},
  {path: 'auth', component: Auth},
  { path: '', redirectTo: 'statistiques', pathMatch: 'full' } 
];