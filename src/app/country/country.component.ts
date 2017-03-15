import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import {ExternalDataService, TeamsLookup, TeamLookup} from '../shared/external-data.service';

@Component({
  selector: 'app-country',
  template: `
    <table>
        <thead>
            <th>Country</th>
        </thead>
        <tbody>
            <tr *ngFor="let item of currentTeam?.teams; let i = index">
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
      .map(x  => dataService
        .getTeams()
        .filter(y => y.country === x['id']))
      .subscribe(p => this.currentTeam = p[0]);
  }

  ngOnDestroy() {
    this.routeStream.unsubscribe();
  }

  getTeams(): Array<TeamLookup> {
    return this.currentTeam.teams;
  }

}
