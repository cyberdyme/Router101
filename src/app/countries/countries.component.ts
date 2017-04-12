import {
  Component, OnInit, ViewChildren, Renderer2, RendererStyleFlags2
} from '@angular/core';

import {ExternalDataService, CountryLookup, CountryStore} from "../shared/external-data.service";
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

  constructor(private dataService: ExternalDataService, private countriesStore : CountryStore) {

  }

  getCountries() :  Array<CountryLookup> {
    return this.dataService.getCountries();
  }

  ngOnInit() {
    this.countriesStore.allCountries$.subscribe( x =>
    {
      console.log('subject ='+x.length);
    });

    this.countriesStore.getCountries('./assets/iso3166-2Mapping.json').subscribe(x =>
    {
      console.log("store ="+x.length);
    });

    this.countriesStore.currentCountry$.subscribe( (x:IIsoMapItem) =>
    {
      x!=null ? console.log("current count =" + x.Code): null;
    },
    err => {
      console.log("current count error =" + err);
    },
      () =>{
      console.log("done");
    });
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
    this.countriesStore.getCountry(countryCode.toUpperCase());

    /*
    this.dataService.getIso3166Mapping(countryCode.toUpperCase())
      .subscribe( (x: IIsoMapItem) =>{
      console.log(x.Name);
    });
    */

    //console.log(event.target.id)

    /*
    this.allPaths.toArray().map(x =>
    {
      let allChildren: HTMLAllCollection=x.nativeElement.children as HTMLAllCollection;
      let allChildItems =[].slice.call(allChildren);

      allChildItems.forEach(y => {
        if(y as HTMLElement) {
          const pathItem= y as HTMLElement;

          const parser = new DOMParser()
          const doc = parser.parseFromString(pathItem.outerHTML, "text/xml");
          console.log(pathItem.id + " - "+ doc);

        }
      });
    })
    */
  }
}
