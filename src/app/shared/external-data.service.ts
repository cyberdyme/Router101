import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {IIsoMapItem} from "./IIsoMapItem";

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import {Observable} from "rxjs";


export interface CountryLookup {
  key: string,
  value: string
}

export interface  TeamLookup
{
  team: string;
}

export interface TeamsLookup {
  country: string,
  teams: Array<TeamLookup>
}

@Injectable()
export class ExternalDataService {

  constructor(private http:Http){

  }

  getIso3166Mapping(countryCode: string): Observable<IIsoMapItem> {
    return this.getIso3166MappingAll()
      .flatMap(x => x)
      .filter((x:IIsoMapItem) => x.Code === countryCode);
  }

  getIso3166MappingAll(): Observable<IIsoMapItem[]> {
    return this.http.request('./assets/iso3166-2Mapping.json')
      .map(res => res.json());
  }

  getCountries() :  Array<CountryLookup> {
    return [
      {key:'ENG', value:'England'},
      {key:'ESP', value:'Spain'},
      {key:'ITA', value:'Italy'},
      {key:'DEU', value:'Germany'},
      {key:'TEST1', value:'No Country'}];
  }

  getTeams() : Array<TeamsLookup>{
    return [
      {
        country: 'ENG',
        teams: [
          {team: 'Arsenal'},
          {team: 'Liverpool'},
          {team: 'Manchester United'},
          {team: 'Chelsea'}
        ]
      },
      {
        country: 'ESP',
        teams: [
          {team: 'FC Barcelona'},
          {team: 'Real Madrid C.F.'},
          {team: 'Atletico Madrid'},
          {team: 'Sevilla'}
        ]
      },
      {
        country: 'ITA',
        teams: [
          {team: 'Juventus'},
          {team: 'Milan'}
        ]
      },
      {
        country: 'ITA',
        teams: [
          {team: 'Juventus'},
          {team: 'Milan'}
        ]
      },
      {
        country: 'DEU',
        teams: [
          {team: 'FC Bayern Munich'},
          {team: 'Borussia Dortmund'}
        ]
      }];
  }
}
