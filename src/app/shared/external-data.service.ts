import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {IIsoMapItem} from "./IIsoMapItem";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {BehaviorSubject, Observable} from "rxjs";
import * as _ from "lodash";

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
export class CountryStore
{
  private subject = new BehaviorSubject<IIsoMapItem[]>(null);
  private subject1 = new BehaviorSubject<IIsoMapItem>(null);

  public currentCountry$ = this.subject1.asObservable();
  public allCountries$ = this.subject.asObservable();

  constructor(private http:Http){
  }

  getCountry(currentCountry: string) {
    var allCountries=this.subject.getValue();
    var match = _.find(allCountries, (x:IIsoMapItem) => x.Code == currentCountry);
    this.subject1.next(match);
  }

  getCountries(requestUrl: string): Observable<IIsoMapItem[]> {
    return this.http.request(requestUrl)
    .map(res => res.json())
    .do(x => this.subject.next(x))
    .first()
    .publishLast().refCount();
  }
}


@Injectable()
export class ExternalDataService {

  constructor(private http:Http){

  }

  getIso3166Mapping(countryCode: string): Observable<IIsoMapItem> {
    return this.getIso3166MappingAll()
      .flatMap(x => x)
      .do((x:IIsoMapItem) => this.Populate(x))
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

  private Populate(x: IIsoMapItem) {
    if(x.PathFiles.length > 0){
      for(const file of x.PathFiles)
      {
        this.http.request('./assets/iso3166-2Mapping.json')
      }
    }
  }
}
