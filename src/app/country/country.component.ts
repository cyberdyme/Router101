///<reference path="../../../node_modules/@angular/core/src/metadata/lifecycle_hooks.d.ts"/>
import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-country',
  template: `
    <p>
      country Works! {{countryId}}
    </p>
  `,
  styles: []
})
export class CountryComponent implements OnInit, OnDestroy {
  routeStream: Subscription;
  countryId: number;

  constructor(router: Router, route: ActivatedRoute) {
    this.routeStream = route.params.subscribe(p => this.countryId = p['id']);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
   this.routeStream.unsubscribe();
  }
}
