import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {TeamComponent} from './team/team.component';
import {PlayersComponent} from './players/players.component';
import {PlayerComponent} from './player/player.component';
import {routing} from './app.route';
import {CountriesComponent} from './countries/countries.component';
import {TeamsComponent} from './teams/teams.component';
import {ExternalDataService} from "./shared/external-data.service";
import {SharedModule} from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    TeamComponent,
    PlayersComponent,
    PlayerComponent,
    CountriesComponent,
    TeamsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    SharedModule.forRoot()
  ],
  providers: [ExternalDataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
