import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot,
UrlTree, CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { SharedService } from '../services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  private hasAccess: boolean;

  constructor(
    public api: SharedService,
    public router: Router,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const allowedRoles = next.data.allowedRoles;
    if (allowedRoles.findIndex(rols => rols === this.api.get_logged_user_role()) >= 0) {
        return true;
    }
   // return false;
    this.router.navigate(['Login']);
  }

   

}
