import { Routes } from '@angular/router';
import { StatistiquesComponent } from './statistiques/statistiques.component';
import { Parametres } from './parametres/parametres';
import { Jeu } from './jeu/jeu';
import { Auth } from './features/auth/auth'

export const routes: Routes = [
  { path: 'statistiques', component: StatistiquesComponent },
  { path: 'parametres',   component: Parametres },
  { path: 'jeu',          component: Jeu },
  { path: 'accueil',      component: Auth },
  { path: '',             redirectTo: 'accueil', pathMatch: 'full' }
];