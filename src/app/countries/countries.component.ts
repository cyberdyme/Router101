import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {ExternalDataService, CountryLookup} from "../shared/external-data.service";

@Component({
  selector: 'app-countries',
  templateUrl: 'countries.component.html',
  styleUrls: ['countries.component.css']
})
export class CountriesComponent implements OnInit {
  circleColour : string = 'yellow';

  constructor(private dataService: ExternalDataService) {

  }

  getCountries() :  Array<CountryLookup> {
    return this.dataService.getCountries();
  }

  ngOnInit() {
  }

  mouseOver(event)
  {
    console.log(event.target)
  }
}
