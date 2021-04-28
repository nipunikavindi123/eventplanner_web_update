import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot,
UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from '../services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationGuard implements CanActivate {

  constructor(
    public api: SharedService,
    public router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.api.is_logged_in()) {
       this.router.navigate([this.api.get_logged_user_role()+'/profile']);
      //this.router.navigate(['Login']);
    }
    return true;
  }
}
