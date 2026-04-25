import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; // Pour les directives de base (*ngIf, *ngFor)
import { FormsModule } from '@angular/forms'; // Pour utiliser [(ngModel)]

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Paramètres
import { ParametresComponent } from './features/parametres/parametres.component';
import { ParamSliderComponent } from './features/parametres/param-slider/param-slider.component';
import { ParamQcmComponent } from './features/parametres/param-qcm/param-qcm.component';
import { ParamPlateauComponent } from './features/parametres/param-plateau/param-plateau.component';
import { ParamCounterComponent } from './features/parametres/param-counter/param-counter.component';
import { ParamLevelSelectorComponent } from './features/parametres/param-level-selector/param-level-selector.component';

// Jeu
import { JeuComponent } from './features/jeu/jeu.component';
// Association
import { AssociationComponent } from './features/jeu/association/association.component';
import { AssociationElementComponent } from './features/jeu/association/association-element/association-element.component';
import { AssociationMessageComponent } from './features/jeu/association/association-message/association-message.component';
import { AssociationZoneComponent } from './features/jeu/association/association-zone/association-zone.component';
// Memory
import { MemoryComponent } from './features/jeu/memory/memory.component';
import { MemoryCardComponent } from './features/jeu/memory/memory-card/memory-card.component';
// Fin
import { FinJeuComponent } from './features/jeu/fin-jeu/fin-jeu.component';

//Statistiques
import { StatistiquesComponent } from './features/statistiques/statistiques.component';
import { ProfilAccueilliComponent } from './features/statistiques/profil-accueilli/profil-accueilli.component';
import { GraphiqueCourbeComponent } from './features/statistiques/graphique-courbe/graphique-courbe.component';
import { TableauHistoriqueComponent } from './features/statistiques/tableau-historique/tableau-historique.component';

import { AuthComponent } from './features/auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    // Statistiques
    StatistiquesComponent,
    ProfilAccueilliComponent,      
    GraphiqueCourbeComponent,   
    TableauHistoriqueComponent,
    // Paramètres
    ParametresComponent,
    ParamCounterComponent,
    ParamLevelSelectorComponent,
    ParamPlateauComponent,
    ParamQcmComponent,
    ParamSliderComponent,
    // Jeu
    JeuComponent,
          // Association
    AssociationComponent,
    AssociationElementComponent,
    AssociationMessageComponent,
    AssociationZoneComponent,
          // Memory
    MemoryComponent,
    MemoryCardComponent,
          // Fin
    FinJeuComponent,
    // Auth
    AuthComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,      // Gestion des templates
    FormsModule,       // Gestion des formulaires/sliders
    AppRoutingModule   // Gestion des routes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }