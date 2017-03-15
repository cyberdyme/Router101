///<reference path="../../../node_modules/@angular/core/src/metadata/lifecycle_hooks.d.ts"/>
///<reference path="../../../node_modules/rxjs/add/operator/take.d.ts"/>

import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import {ExternalDataService, TeamsLookup, TeamLookup} from '../shared/external-data.service';

@Component({
  selector: 'app-country',
  template: `
    <table>
        <thead>
            <th>Country</th>
        </thead>
        <tbody>
            <tr *ngFor="let item of getTeams(); let i = index">
                <td>({{i}}).{{item.team}}</td>
            </tr>
        </tbody>
    </table>
  `,
  styles: []
})
export class CountryComponent implements OnDestroy {
  routeStream: Subscription;
  currentTeam: TeamsLookup;

  constructor(private route: ActivatedRoute,
              private dataService: ExternalDataService) {
    this.routeStream = route
      .params
      .subscribe(p => this.currentTeam = dataService
        .getTeams()
        .filter(y => y.country === p['id'])[0]);
  }

  ngOnDestroy() {
    this.routeStream.unsubscribe();
  }

  getTeams(): Array<TeamLookup> {
    return this.currentTeam.teams;
  }

}
