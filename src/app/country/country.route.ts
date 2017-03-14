import {Routes, RouterModule} from "@angular/router";
import {CountryComponent} from "./country.component";
/**
 * Created by girishthanki on 08/03/2017.
 */

export const countryRoutes: Routes = [
  {path: '', component: CountryComponent}
];

export const countryRouting = RouterModule.forChild(countryRoutes);
