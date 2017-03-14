import { Component, OnInit } from '@angular/core';
import {ExternalDataService, CountryLookup} from "../shared/external-data.service";

@Component({
  selector: 'app-countries',
  template: `
    <table>
        <thead>
            <th>Country</th>
        </thead>
        <tbody>
            <tr *ngFor="let item of getCountries(); let i = index">
                <td><a [routerLink]="item.key">({{i}}).{{item.value}}</a></td>
            </tr>
        </tbody>
    </table>
  `,
  styles: [
    `tr:nth-child(even) {
      background-color: lightgray;
    }`,
    `table, thead, th {border: 1px solid black;}`
  ]
})
export class CountriesComponent implements OnInit {

  constructor(private dataService: ExternalDataService) {

  }

  getCountries() :  Array<CountryLookup> {
    return this.dataService.getCountries();
  }

  ngOnInit() {
  }

}
