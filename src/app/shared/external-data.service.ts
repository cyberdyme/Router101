import { Injectable } from '@angular/core';

export interface CountryLookup {
  key: string,
  value: string
}

export interface TeamsLookup {
  country: string,
  team: string,
}

@Injectable()
export class ExternalDataService {

  constructor() { }

  getCountries() :  Array<CountryLookup> {
    return [
      {key:'ENG', value:'England'},
      {key:'ESP', value:'Spain'},
      {key:'ITA', value:'Italy'},
      {key:'DEU', value:'Germany'}];
  }

  getTeams() : Array<TeamsLookup>{
    return [
      {country:'ENG', team:''},
    ];
  }
}
