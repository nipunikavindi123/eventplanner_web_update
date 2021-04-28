import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { SharedService } from '../services/shared.service';

@Injectable()
export class OrderResolver implements Resolve<any> {
  constructor(private api: SharedService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    let id = route.params['id'];

    return this.api.get_customer_order_details(id).toPromise().then(data => {
      if (data) {
        return data;
      } else {
        this.router.navigate(['/Login']);
        return;
      }
    });
  }
}