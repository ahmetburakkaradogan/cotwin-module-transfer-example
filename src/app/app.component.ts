import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import {
  ActivationStart,
  Router
} from "@angular/router";
import { LanguageService } from 'src/forum/services/language.service';
import { RouteService } from 'src/forum/services/RouteService';
import { LoaderService } from 'src/forum/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  layoutMode = 'static';

  theme = 'blue';

  inputStyle = 'outlined';

  ripple: boolean;

  constructor(languageService: LanguageService, router: Router, routeService: RouteService, private primengConfig: PrimeNGConfig, public loaderService: LoaderService) {
    languageService.initLocalization();
    let routeData = {};
    let routeUrl = '';
    let params = {};
    let queryParams = {};
    router.events.subscribe(event => {
      // console.log(event)
      if (event instanceof ActivationStart) {
        routeService.updatePathParam(event);
        params = event.snapshot.params;
        queryParams = event.snapshot.queryParams;
        routeData = event.snapshot.data;
        routeUrl = event.snapshot.url.join('/');
      }
    })
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.ripple = true;
  }
}
