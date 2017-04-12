import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {BehaviorSubject, Observable} from "rxjs";
import * as _ from "lodash";


export interface IPathInfo
{
  id: string;
  data: string
}

export interface  IIsoMapItem {
  Name : string;
  Code : string;
  PathIds : string[];
  Paths : IPathInfo[]
}

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
  private allCountriesSubject = new BehaviorSubject<IIsoMapItem[]>(null);
  private currentCountrySubject = new BehaviorSubject<IIsoMapItem>(null);

  public currentCountry$ = this.currentCountrySubject.asObservable();
  public allCountries$ = this.allCountriesSubject.asObservable();

  constructor(private http:Http){
  }

  getCountry(currentCountry: string) {
    var allCountries=this.allCountriesSubject.getValue();
    var match = _.find(allCountries, (x:IIsoMapItem) => x.Code == currentCountry);
    this.currentCountrySubject.next(match);
  }


  getPaths(requestUrl: string, countries: IIsoMapItem[]): Observable<IIsoMapItem[]> {
    return this.http.request(requestUrl)
      .map(res => res.json())
      .map((x:IPathInfo[]) => this.combineCountryAndPath(countries, x))
  }

  private combineCountryAndPath(countries: IIsoMapItem[], paths: IPathInfo[]): IIsoMapItem[] {
    const pathsDictionary: _.Dictionary<IPathInfo> = _.keyBy(paths, 'id');

    console.log(`Finding path`);

    _.forEach(countries, (x:IIsoMapItem) =>{
      if(!(_.isNil(x.PathIds)))
      {
        console.log(`Finding path for ${x.Code}`);

        x.Paths = [];
        _.forEach(x.PathIds, (y:string) => {
            var matchingPath = pathsDictionary[y];
            x.Paths.push(matchingPath);
          console.log(`Finding path for ${matchingPath.id}`);
        });
      }
      else
      {
        if(!_.isNil(pathsDictionary[x.Code.toLowerCase()]))
        {
          x.PathIds = [x.Code.toLowerCase()];
          x.Paths = [pathsDictionary[x.Code.toLowerCase()]];
        }
      }
    });

    return countries;
  }

  getCountries(): Observable<IIsoMapItem[]> {
    return this.http.request('./assets/iso3166-2Mapping.json')
    .map(res => res.json())
    .switchMap(x => this.getPaths('./assets/allPathsForEurope.json',x))
    .do((x:IIsoMapItem[]) => this.allCountriesSubject.next(x))
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
