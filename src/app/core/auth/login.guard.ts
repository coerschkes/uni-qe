// noinspection JSIgnoredPromiseFromCall

import {AuthStateService} from "./auth-state.service";
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";


export class LoginGuard {

  static canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) => {
    if (inject(AuthStateService).isLoggedIn()) {
      return true
    }
    inject(Router).navigate(['/auth'])
    return true
  };

}
