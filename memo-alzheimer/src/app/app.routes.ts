import { Routes } from '@angular/router';
import { StatistiquesComponent } from './statistiques/statistiques.component';
import { Parametres } from './parametres/parametres';
import { Jeu } from './jeu/jeu';


export const routes: Routes = [
  { path: 'statistiques', component: StatistiquesComponent},
  { path: 'parametres', component: Parametres},
  { path: 'jeu', component: Jeu },
  { path: '', redirectTo: 'statistiques', pathMatch: 'full' }
];
