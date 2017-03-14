/**
 * Created by girishthanki on 08/03/2017.
 */

import {NgModule} from '@angular/core';
import {CountryComponent} from './country.component';
import {countryRouting} from "./country.route";


@NgModule({
    imports: [countryRouting, ],
    exports: [CountryComponent],
    declarations: [CountryComponent],
    providers: [],
})
export class CountryModule {

}
