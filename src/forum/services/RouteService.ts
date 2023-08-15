import {Injectable} from "@angular/core";
import {ActivationStart} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  public dynamicUrlMapping = {}

  constructor() {
  }

  public updatePathParam(route: ActivationStart) {
    if ((route.snapshot.routeConfig.path).length <= 0)
      return
    this.dynamicUrlMapping[route.snapshot.routeConfig.path] = route.snapshot.url.join("/")
  }
}

