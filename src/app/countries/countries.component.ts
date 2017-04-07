import {
  Component, OnInit, ViewChildren, Renderer2, RendererStyleFlags2
} from '@angular/core';

import {ExternalDataService, CountryLookup} from "../shared/external-data.service";
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/filter';
import {IIsoMapItem} from "../shared/IIsoMapItem";


@Component({
  selector: 'app-countries',
  templateUrl: 'countries.component.html',
  styleUrls: ['countries.component.css']
})
export class CountriesComponent implements OnInit {
  selectedCountry: string = "gb";
  circleColour : string = 'yellow';

  @ViewChildren('table1')  allPaths;

  constructor(private dataService: ExternalDataService, private render:Renderer2) {

  }

  getCountries() :  Array<CountryLookup> {
    return this.dataService.getCountries();
  }

  ngOnInit() {
  }

  mouseOver(event) {
    //console.log(this.allPaths.toArray().map(x => x.nativeElement.children));
    //this.render.setStyle(event.target, "{'fill': 'blue'}", RendererStyleFlags2.Important);
  }

  mouseOut(event) {
    //this.render.setStyle(event.target, "{'fill': 'red'}", RendererStyleFlags2.Important);
    //console.log(event.target.id)
  }

  mouseClick(event) {
    let countryCode: string = event.target.id;
    this.dataService.getIso3166Mapping(countryCode.toUpperCase())
      .subscribe( (x: IIsoMapItem) =>{
      console.log(x.Name);
    });
    //console.log(event.target.id)
  }
}
