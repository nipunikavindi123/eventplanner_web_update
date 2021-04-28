import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ProfileComponent } from '../profile/profile.component';
import { UsersComponent } from '../users/users.component';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { RequestDetailsComponent } from '../request-details/request-details.component';
import { InquiriesComponent } from '../inquiries/inquiries.component';


import { UserResolver } from '../../utl/user.resolver';
import { OrderResolver } from '../../utl/order.resolver';

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
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'request-details/:id',
    component: RequestDetailsComponent,
    resolve: { order : OrderResolver }
  },
  {
    path: 'update-user/:id',
    component: UpdateUserComponent,
    resolve: { user: UserResolver }
  },
  {
    path: 'inquiries',
    component: InquiriesComponent,
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
    UserResolver,
    OrderResolver
  ]
})

export class DashboardRoutingModule {}
