import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ProfileComponent } from '../profile/profile.component';
import { RequestDetailsComponent } from '../request-details/request-details.component';

import { SupplierResolver } from '../../utl/supplier.resolver';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'request-details/:id',
    component: RequestDetailsComponent,
    resolve: { order: SupplierResolver }
  },
  {
    path: '',
    redirectTo : 'profile',
    pathMatch : 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    SupplierResolver
  ]
})

export class DashboardRoutingModule {}
