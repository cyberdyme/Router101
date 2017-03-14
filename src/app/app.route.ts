import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from "@angular/core";
import {CountriesComponent} from "./countries/countries.component";

// Route Configuration
/*
export const routes: Routes = [
  {path: '', component: CountriesComponent, redirectTo:'countries', pathMatch:'full'}
  {path: 'countries', component: CountriesComponent},
  {path: 'country/:id', component: CountryComponent,
    children:[
      {path: '', component: TeamsComponent, redirectTo:'teams', pathMatch:'full'},
      {path: 'teams', component: TeamsComponent},
      {path: 'team/:id', component: CountryComponent,
        children: [
          {path: '', component: PlayersComponent, redirectTo:'players', pathMatch:'full'},
          {path: 'players', component: PlayersComponent},
          {path: 'player/:id', component: PlayerComponent},
        ]},
    ]
  },
];
*/

export const routes: Routes = [
  {path: '', redirectTo:'countries', pathMatch:'full'},

  /*
  {path: 'countries', component: CountriesComponent},
  {path: 'country/:id', loadChildren:'./country/country.module#CountryModule'}
  */
  {path : 'countries', children: [
    {path: '', component: CountriesComponent},
    {path: ':id', loadChildren:'./country/country.module#CountryModule'}
  ]}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
