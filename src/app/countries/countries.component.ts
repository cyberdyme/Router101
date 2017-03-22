import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {ExternalDataService, CountryLookup} from "../shared/external-data.service";

@Component({
  selector: 'app-countries',
  templateUrl: 'countries.component.html',
  styles: [
    `tr:nth-child(even) {
      background-color: lightgray;
    }`,
    `table, thead, th {border: 1px solid black;}`
  ]
})
export class CountriesComponent implements OnInit {
  @ViewChild('GBGroup') GBGroup : ElementRef;

  constructor(private dataService: ExternalDataService) {

  }

  getCountries() :  Array<CountryLookup> {
    return this.dataService.getCountries();
  }

  ngOnInit() {
  }

  mouseOver()
  {
    this.GBGroup.nativeElement.style.color = 'green';
    console.log("change the colour")
  }
}
