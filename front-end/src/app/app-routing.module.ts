import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StatistiquesComponent } from './features/statistiques/statistiques.component';
import { ParametresComponent } from './features/parametres/parametres.component';
import { JeuComponent } from './features/jeu/jeu.component';
import { AuthComponent } from './features/auth/auth.component';

const routes: Routes = [
  { path: 'statistiques', component: StatistiquesComponent },
  { path: 'parametres', component: ParametresComponent },
  { path: 'jeu', component: JeuComponent },
  { path: 'auth', component: AuthComponent },
  { path: '', redirectTo: 'auth', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }