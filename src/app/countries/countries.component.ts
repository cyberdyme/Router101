import {Component, OnInit, ViewChild, ElementRef, Renderer, ViewChildren} from '@angular/core';
import {ExternalDataService, CountryLookup} from "../shared/external-data.service";

@Component({
  selector: 'app-countries',
  templateUrl: 'countries.component.html',
  styleUrls: ['countries.component.css']
})
export class CountriesComponent implements OnInit {
  selectedCountry: string = "gb";
  circleColour : string = 'yellow';

  @ViewChildren('table1')  allPaths;

  constructor(private dataService: ExternalDataService, private render:Renderer) {

  }

  getCountries() :  Array<CountryLookup> {
    return this.dataService.getCountries();
  }

  ngOnInit() {
  }

  mouseOver(event)
  {
    console.log(this.allPaths.toArray().map(x => x.nativeElement.children));
    this.render.setElementStyle(event.target,"fill","blue");
  }

  mouseOut(event)
  {
    this.render.setElementStyle(event.target,"fill","red");
    console.log(event.target.id)
  }
}
